import './HeroAtom.scss'
import { atomOrbits, atomOrbitPath, useHeroAtom } from './useHeroAtom.web'

export default function HeroAtom() {
  const { atom } = useHeroAtom()

  return (
    <div id={`hero-atom`} className={`hero-atom`} aria-hidden={true}>
      <svg
        ref={atom}
        focusable={false}
        id={`hero-atom-orbits`}
        viewBox={`0 0 400 400`}
        className={`hero-atom__orbits`}
      >
        {atomOrbits.map((orbit) => (
          <g
            key={orbit.id}
            id={`hero-atom-orbit-${orbit.id}`}
            transform={`rotate(${orbit.angle} 200 200)`}
            className={`hero-atom__orbit hero-atom__orbit--${orbit.id}`}
          >
            <ellipse
              cx={200}
              cy={200}
              rx={170}
              ry={65}
              id={`hero-atom-track-${orbit.id}`}
              className={`hero-atom__track`}
            />
            <circle
              r={5}
              id={`hero-atom-electron-${orbit.id}`}
              className={`hero-atom__electron`}
            >
              <animateMotion
                path={atomOrbitPath}
                dur={`${orbit.duration}s`}
                begin={`${orbit.delay}s`}
                repeatCount={`indefinite`}
                id={`hero-atom-motion-${orbit.id}`}
                className={`hero-atom__motion`}
              />
            </circle>
          </g>
        ))}
        <circle
          r={24}
          cx={200}
          cy={200}
          id={`hero-atom-core-halo`}
          className={`hero-atom__core-halo`}
        />
        <circle
          r={9}
          cx={200}
          cy={200}
          id={`hero-atom-core`}
          className={`hero-atom__core`}
        />
      </svg>
    </div>
  )
}
