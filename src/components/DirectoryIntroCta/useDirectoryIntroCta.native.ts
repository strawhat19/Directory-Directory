import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, AppState, AccessibilityInfo } from 'react-native';

const radius = 35;
const nodeCount = 41;
const steps = Array.from({ length: 65 }, (_, index) => index / 64);
const nodes = Array.from({ length: nodeCount }, (_, index) => ({
  id: index,
  y: index / (nodeCount - 1) - 0.5,
  phase: index / (nodeCount - 1) * Math.PI * 6,
}));
const strandPositions = [1, -1].map((direction) => nodes.map((node) => steps.map((step) => {
  const angle = step * Math.PI * 2 + node.phase;
  return { x: radius * Math.sin(angle) * direction, depth: Math.cos(angle) * direction };
})));
const rungNodes = nodes.filter((node) => node.id % 3 === 0).map((node) => ({
  ...node,
  scale: steps.map((step) => Math.sin(step * Math.PI * 2 + node.phase)),
}));

export const useDirectoryIntroCta = (height: number) => {
  const rotation = useRef(new Animated.Value(0)).current;
  const pausedRotation = useRef(0);
  const [reduceMotion, setReduceMotion] = useState(true);
  const [appActive, setAppActive] = useState(AppState.currentState !== `background` && AppState.currentState !== `inactive`);

  useEffect(() => {
    let mounted = true;
    const updateMotion = (enabled: boolean) => {
      if (mounted) setReduceMotion(enabled);
    };

    AccessibilityInfo.isReduceMotionEnabled().then(updateMotion).catch(() => updateMotion(false));
    const motionSubscription = AccessibilityInfo.addEventListener(`reduceMotionChanged`, updateMotion);
    const appSubscription = AppState.addEventListener(`change`, (state) => setAppActive(state === `active`));

    return () => {
      mounted = false;
      appSubscription.remove();
      motionSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      pausedRotation.current = 0;
      rotation.setValue(0);
      return;
    }
    if (!appActive) return;

    let active = true;
    let resumeAnimation: Animated.CompositeAnimation | undefined;
    const timing = {
      toValue: 1,
      duration: 12000,
      isInteraction: false,
      easing: Easing.linear,
      useNativeDriver: true,
    };
    const animation = Animated.loop(Animated.timing(rotation, timing));
    const phase = pausedRotation.current;

    rotation.setValue(phase);
    if (phase > 0 && phase < 1) {
      resumeAnimation = Animated.timing(rotation, { ...timing, duration: Math.max(1, timing.duration * (1 - phase)) });
      resumeAnimation.start(({ finished }) => {
        if (!active || !finished) return;
        rotation.setValue(0);
        animation.start();
      });
    } else {
      animation.start();
    }

    return () => {
      active = false;
      resumeAnimation?.stop();
      animation.stop();
      rotation.stopAnimation((value) => { pausedRotation.current = value >= 1 ? 0 : value; });
    };
  }, [rotation, reduceMotion, appActive]);

  const helix = useMemo(() => {
    const strands = strandPositions.map((positions, strandIndex) => {
      const nodeStyles = nodes.map((node, index) => ({
        id: node.id,
        style: {
          transform: [
            { translateY: node.y * height },
            { translateX: rotation.interpolate({ inputRange: steps, outputRange: positions[index].map((position) => position.x) }) },
            { scale: rotation.interpolate({ inputRange: steps, outputRange: positions[index].map((position) => 1 + position.depth * 0.18) }) },
          ],
        },
      }));
      const segmentStyles = nodes.slice(0, -1).map((node, index) => {
        const nextNode = nodes[index + 1];
        const deltaY = (nextNode.y - node.y) * height;
        const segments = steps.map((_, stepIndex) => {
          const first = positions[index][stepIndex];
          const second = positions[index + 1][stepIndex];
          const deltaX = second.x - first.x;
          return {
            x: (first.x + second.x) / 2,
            depth: (first.depth + second.depth) / 2,
            length: Math.hypot(deltaX, deltaY),
            angle: `${Math.atan2(deltaY, deltaX) * 180 / Math.PI}deg`,
          };
        });
        return {
          id: node.id,
          style: {
            opacity: rotation.interpolate({ inputRange: steps, outputRange: segments.map((segment) => 0.7 + segment.depth * 0.25) }),
            transform: [
              { translateY: (node.y + nextNode.y) * height / 2 },
              { translateX: rotation.interpolate({ inputRange: steps, outputRange: segments.map((segment) => segment.x) }) },
              { rotateZ: rotation.interpolate({ inputRange: steps, outputRange: segments.map((segment) => segment.angle) }) },
              { scaleX: rotation.interpolate({ inputRange: steps, outputRange: segments.map((segment) => segment.length) }) },
            ],
          },
        };
      });
      return { id: strandIndex, nodes: nodeStyles, segments: segmentStyles };
    });
    const rungs = rungNodes.map((node) => ({
      id: node.id,
      style: {
        transform: [
          { translateY: node.y * height },
          { scaleX: rotation.interpolate({ inputRange: steps, outputRange: node.scale }) },
        ],
      },
    }));
    return { rungs, strands };
  }, [height, rotation]);

  return helix;
};
