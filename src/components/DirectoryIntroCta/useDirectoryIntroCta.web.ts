import { useRef, useEffect } from 'react';
import { drawHelix, createHelixSphere, getHelixGeometry, helixCanvasWidth } from './DirectoryIntroCta.helix';

export const useDirectoryIntroCta = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const context = canvas?.getContext(`2d`);
    if (!canvas || !section || !context) return;
    const sphere = createHelixSphere();
    const motion = window.matchMedia(`(prefers-reduced-motion: reduce)`);
    let geometry = getHelixGeometry(0);
    let rotation = 20 * Math.PI / 180;
    let pixelRatio = 0;
    let visible = true;
    let frame: number | undefined;
    let previousTime: number | undefined;
    const draw = () => drawHelix(context, geometry, rotation, sphere);
    const resize = () => {
      const height = Math.ceil(section.getBoundingClientRect().height);
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      if (geometry.height === height && pixelRatio === ratio) return;
      geometry = getHelixGeometry(height);
      pixelRatio = ratio;
      canvas.width = Math.round(helixCanvasWidth * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    };
    const animate = (time: number) => {
      if (previousTime !== undefined) rotation = (rotation + Math.min(time - previousTime, 64) / 12000 * Math.PI * 2) % (Math.PI * 2);
      previousTime = time;
      draw();
      frame = window.requestAnimationFrame(animate);
    };
    const updateAnimation = () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      frame = undefined;
      previousTime = undefined;
      draw();
      if (!motion.matches && visible && !document.hidden) frame = window.requestAnimationFrame(animate);
    };

    resize();
    updateAnimation();
    const resizeObserver = typeof ResizeObserver === `undefined` ? undefined : new ResizeObserver(resize);
    const visibilityObserver = typeof IntersectionObserver === `undefined` ? undefined : new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
      updateAnimation();
    });
    resizeObserver?.observe(section);
    visibilityObserver?.observe(section);
    window.addEventListener(`resize`, resize);
    motion.addEventListener(`change`, updateAnimation);
    document.addEventListener(`visibilitychange`, updateAnimation);

    return () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      window.removeEventListener(`resize`, resize);
      motion.removeEventListener(`change`, updateAnimation);
      document.removeEventListener(`visibilitychange`, updateAnimation);
    };
  }, []);

  return { canvasRef, sectionRef };
};
