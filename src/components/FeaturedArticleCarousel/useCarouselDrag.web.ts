import { useCallback, useEffect, useRef, useState, type DragEvent, type MouseEvent, type PointerEvent } from 'react';

type CarouselDragOptions = {
  nextSlide: () => void;
  previousSlide: () => void;
  onInteractionChange: (interacting: boolean) => void;
};
type CarouselGesture = {
  x: number;
  y: number;
  width: number;
  lastX: number;
  lastTime: number;
  velocity: number;
  pointerId: number;
  dragging: boolean;
  element: HTMLDivElement;
};

export const useCarouselDrag = ({ nextSlide, previousSlide, onInteractionChange }: CarouselDragOptions) => {
  const gestureRef = useRef<CarouselGesture | null>(null);
  const frameRef = useRef<number | null>(null);
  const suppressClickRef = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  const clearGesture = useCallback(() => {
    const gesture = gestureRef.current;
    gestureRef.current = null;
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    if (gesture?.element.hasPointerCapture(gesture.pointerId)) gesture.element.releasePointerCapture(gesture.pointerId);
    setProgress(0);
    setDragging(false);
    onInteractionChange(false);
  }, [onInteractionChange]);

  useEffect(() => {
    window.addEventListener(`blur`, clearGesture);
    return () => {
      window.removeEventListener(`blur`, clearGesture);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      gestureRef.current = null;
    };
  }, [clearGesture]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0 || gestureRef.current) return;
    suppressClickRef.current = false;
    if (event.target instanceof Element && event.target.closest(`button, input, textarea, select`)) return;
    gestureRef.current = {
      x: event.clientX,
      y: event.clientY,
      velocity: 0,
      dragging: false,
      lastX: event.clientX,
      lastTime: event.timeStamp,
      pointerId: event.pointerId,
      element: event.currentTarget,
      width: (event.currentTarget.querySelector<HTMLElement>(`.featured-carousel__stage`) ?? event.currentTarget).getBoundingClientRect().width,
    };
    onInteractionChange(true);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    const distanceX = event.clientX - gesture.x;
    const distanceY = event.clientY - gesture.y;
    if (!gesture.dragging) {
      if (Math.abs(distanceY) > 8 && Math.abs(distanceY) > Math.abs(distanceX) * 1.2) {
        clearGesture();
        return;
      }
      if (Math.abs(distanceX) < 8 || Math.abs(distanceX) < Math.abs(distanceY) * 1.25) return;
      gesture.dragging = true;
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
    gesture.velocity = (event.clientX - gesture.lastX) / Math.max(1, event.timeStamp - gesture.lastTime);
    gesture.lastTime = event.timeStamp;
    gesture.lastX = event.clientX;
    const nextProgress = Math.max(-1, Math.min(1, distanceX / Math.max(1, gesture.width * 0.64)));
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      setProgress(nextProgress);
    });
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    const distance = event.clientX - gesture.x;
    const threshold = Math.min(88, Math.max(40, gesture.width * 0.14));
    const velocity = event.timeStamp - gesture.lastTime <= 100 ? gesture.velocity : 0;
    if (gesture.dragging) {
      suppressClickRef.current = true;
      if (Math.abs(distance) >= threshold || (Math.abs(distance) > 24 && Math.abs(velocity) > 0.45)) {
        const direction = Math.abs(distance) >= threshold ? distance : velocity;
        if (direction < 0) nextSlide(); else previousSlide();
      }
    }
    clearGesture();
  };

  const onPointerCancel = (event: PointerEvent<HTMLDivElement>) => {
    if (gestureRef.current?.pointerId !== event.pointerId) return;
    if (gestureRef.current?.dragging) suppressClickRef.current = true;
    clearGesture();
  };

  return {
    dragging,
    progress,
    handlers: {
      onPointerUp,
      onPointerDown,
      onPointerMove,
      onPointerCancel,
      onLostPointerCapture: (event: PointerEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) onPointerCancel(event);
      },
      onPointerLeave: () => {
        if (gestureRef.current && !gestureRef.current.dragging) clearGesture();
      },
      onClickCapture: (event: MouseEvent<HTMLDivElement>) => {
        if (event.detail === 0) { suppressClickRef.current = false; return; }
        if (!suppressClickRef.current) return;
        event.preventDefault();
        event.stopPropagation();
        suppressClickRef.current = false;
      },
      onDragStartCapture: (event: DragEvent<HTMLDivElement>) => event.preventDefault(),
    },
  };
};
