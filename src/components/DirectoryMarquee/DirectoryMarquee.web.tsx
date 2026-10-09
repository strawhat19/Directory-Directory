import './DirectoryMarquee.scss'
import Icon from '../Icon/Icon'
import type { CSSProperties } from 'react'
import { useDirectoryMarquee } from './useDirectoryMarquee.web'
import { popularDirectories } from '../../shared/navigation/popularDirectories'

type DirectoryMarqueeProps = {
  scope?: string
}

export default function DirectoryMarquee({ scope = `header` }: DirectoryMarqueeProps) {
  const {
    track,
    cycle,
    viewport,
    dragging,
    copyCount,
    onPointerUp,
    onPointerEnter,
    onPointerLeave,
    onPointerDown,
    onPointerMove,
    onClickCapture,
    onFocusCapture,
    onBlurCapture,
    onPointerCancel,
    onLostPointerCapture,
  } = useDirectoryMarquee()

  return (
    <section
      id={`directory-marquee-${scope}`}
      className={`directory-marquee`}
      aria-label={`Explore directories`}
    >
      <div
        ref={viewport}
        onPointerUp={onPointerUp}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onClickCapture={onClickCapture}
        onFocusCapture={onFocusCapture}
        onBlurCapture={onBlurCapture}
        onPointerCancel={onPointerCancel}
        onLostPointerCapture={onLostPointerCapture}
        id={`directory-marquee-viewport-${scope}`}
        data-dragging={dragging ? `true` : undefined}
        className={`directory-marquee__viewport`}
        onDragStart={(event) => event.preventDefault()}
      >
        <div
          ref={track}
          id={`directory-marquee-track-${scope}`}
          className={`directory-marquee__track`}
        >
          {Array.from({ length: copyCount }, (_, copyIndex) => (
            <div
              key={copyIndex}
              ref={copyIndex === 1 ? cycle : undefined}
              aria-hidden={copyIndex === 1 ? undefined : true}
              id={`directory-marquee-cycle-${scope}-${copyIndex}`}
              className={`directory-marquee__cycle`}
            >
              {popularDirectories.map((directory) => (
                <a
                  target={`_blank`}
                  draggable={false}
                  key={directory.id}
                  href={directory.href}
                  rel={`noopener noreferrer`}
                  className={`directory-marquee__pill`}
                  tabIndex={copyIndex === 1 ? undefined : -1}
                  aria-label={`${directory.label} (opens in a new tab)`}
                  data-ink-accent={directory.color === `#14213d` ? `true` : undefined}
                  data-marquee-original={copyIndex === 1 ? `true` : undefined}
                  id={`directory-marquee-pill-${scope}-${copyIndex}-${directory.id}`}
                  style={{
                    '--pill-color': directory.color,
                    '--pill-background': directory.background,
                  } as CSSProperties}
                >
                  <Icon
                    size={14}
                    name={directory.icon}
                    className={`directory-marquee__pill-icon`}
                    id={`directory-marquee-icon-${scope}-${copyIndex}-${directory.id}`}
                  />
                  <span
                    className={`directory-marquee__pill-label`}
                    id={`directory-marquee-label-${scope}-${copyIndex}-${directory.id}`}
                  >
                    {directory.label}
                  </span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
