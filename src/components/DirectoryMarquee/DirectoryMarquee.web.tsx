import './DirectoryMarquee.scss'
import Icon from '../Icon/Icon'
import { useDirectoryMarquee } from './useDirectoryMarquee.web'
import { popularDirectories } from '../../shared/navigation/popularDirectories'

type DirectoryMarqueeProps = {
  scope?: string
}

export default function DirectoryMarquee({ scope = `header` }: DirectoryMarqueeProps) {
  const {
    track,
    cycle,
    paused,
    viewport,
    dragging,
    measured,
    copyCount,
    togglePaused,
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
      aria-label={`Popular directories`}
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
        data-measured={measured ? `true` : undefined}
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
                  data-marquee-original={copyIndex === 1 ? `true` : undefined}
                  id={`directory-marquee-pill-${scope}-${copyIndex}-${directory.id}`}
                  style={{ color: directory.color, backgroundColor: directory.background }}
                >
                  <Icon
                    size={14}
                    name={directory.icon}
                    color={directory.color}
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
      <button
        type={`button`}
        onClick={togglePaused}
        aria-pressed={paused}
        className={`directory-marquee__toggle`}
        id={`directory-marquee-toggle-${scope}`}
        aria-label={paused ? `Play automatic scrolling` : `Pause automatic scrolling`}
      >
        <Icon
          size={13}
          name={paused ? `play` : `pause`}
          className={`directory-marquee__toggle-icon`}
          id={`directory-marquee-toggle-icon-${scope}`}
        />
        <span
          className={`directory-marquee__toggle-label`}
          id={`directory-marquee-toggle-label-${scope}`}
        >
          {paused ? `Play` : `Pause`}
        </span>
      </button>
    </section>
  )
}
