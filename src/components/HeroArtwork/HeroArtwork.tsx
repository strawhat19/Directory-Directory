import './HeroArtwork.scss'
import Icon from '../Icon/Icon'
import HeroAtom from '../HeroAtom/HeroAtom'
import BrandMark from '../BrandMark/BrandMark'

const folderLabels = [
  { id: `design`, color: `green`, label: `A little inspiration`, detail: `DESIGN & IDEAS` },
  { id: `tools`, color: `blue`, label: `Your next useful find`, detail: `TOOLS & RESOURCES` },
  { id: `places`, color: `red`, label: `Somewhere new`, detail: `PEOPLE & PLACES` },
]

export default function HeroArtwork() {
  return (
    <div id={`hero-artwork`} className={`hero-artwork`} aria-hidden={true}>
      <div id={`hero-artwork-grid`} className={`hero-artwork__grid`} />
      {/* Comment out this component to remove the atom animation. */}
      <HeroAtom />
      {/* <span id={`hero-artwork-index`} className={`hero-artwork__index`}>
        {`THE INTERNET, FILED UNDER GOOD.`}
      </span> */}
      <div id={`hero-artwork-mark-frame`} className={`hero-artwork__mark-frame`}>
        <BrandMark
          size={250}
          id={`hero-artwork-brand-mark`}
          className={`hero-artwork__brand-mark`}
        />
      </div>
      <div id={`hero-artwork-folders`} className={`hero-artwork__folders`}>
        {folderLabels.map((folder, index) => (
          <div
            key={folder.id}
            id={`hero-artwork-folder-${folder.id}`}
            className={`hero-artwork__folder hero-artwork__folder--${folder.color}`}
          >
            <span
              id={`hero-artwork-folder-number-${folder.id}`}
              className={`hero-artwork__folder-number`}
            >
              {`0${index + 1}`}
            </span>
            <div
              id={`hero-artwork-folder-copy-${folder.id}`}
              className={`hero-artwork__folder-copy`}
            >
              <span
                id={`hero-artwork-folder-detail-${folder.id}`}
                className={`hero-artwork__folder-detail`}
              >
                {folder.detail}
              </span>
              <span
                id={`hero-artwork-folder-label-${folder.id}`}
                className={`hero-artwork__folder-label`}
              >
                {folder.label}
              </span>
            </div>
            <Icon
              size={17}
              name={`arrow-up-right`}
              id={`hero-artwork-folder-icon-${folder.id}`}
            />
          </div>
        ))}
      </div>
      {/* <span id={`hero-artwork-note`} className={`hero-artwork__note`}>
        <Icon name={`sparkles`} id={`hero-artwork-note-icon`} size={13} />
        {`Less searching. More discovering.`}
      </span> */}
    </div>
  )
}
