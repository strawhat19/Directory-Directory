import './DirectoryIntroCta.scss';
import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import { directoryIntroCta } from './DirectoryIntroCta.content';
import { useDirectoryIntroCta } from './useDirectoryIntroCta.web';

type DirectoryIntroCtaProps = {
  onExplore: () => void;
};

const DirectoryIntroCta = ({ onExplore }: DirectoryIntroCtaProps) => {
  const { canvasRef, sectionRef } = useDirectoryIntroCta();
  const { id, title, eyebrow, description, href, label } = directoryIntroCta;

  return (
    <section id={id} ref={sectionRef} className={`directory-intro-cta`} aria-labelledby={`${id}-heading`}>
      <div id={`${id}-content`} className={`directory-intro-cta__content`}>
        <div id={`${id}-copy`} className={`directory-intro-cta__copy`}>
          <p id={`${id}-eyebrow`} className={`directory-intro-cta__eyebrow dd-eyebrow`}>
            <Icon size={13} name={`grid`} id={`${id}-eyebrow-icon`} className={`directory-intro-cta__eyebrow-icon`} />
            <span id={`${id}-eyebrow-label`} className={`directory-intro-cta__eyebrow-label`}>{eyebrow}</span>
          </p>
          <h2 id={`${id}-heading`} className={`directory-intro-cta__heading`}>{title}</h2>
          <p id={`${id}-description`} className={`directory-intro-cta__description`}>{description}</p>
        </div>
        <div id={`${id}-actions`} className={`directory-intro-cta__actions`}>
          <button
            type={`button`}
            onClick={onExplore}
            id={`${id}-explore`}
            aria-label={`Explore Directories`}
            className={`directory-intro-cta__explore dd-button`}
          >
            <Icon size={13} name={`grid`} id={`${id}-explore-icon`} className={`directory-intro-cta__action-icon`} />
            <span id={`${id}-explore-label`} className={`directory-intro-cta__action-label`}>{`Explore`}</span>
            <Icon size={13} name={`arrow-up`} id={`${id}-explore-arrow`} className={`directory-intro-cta__down-icon`} />
          </button>
          <Link
            href={href}
            id={`${id}-read-more`}
            className={`directory-intro-cta__link dd-button`}
            aria-label={`Read More About What a Directory Is`}
          >
            <Icon size={13} name={`file-text`} id={`${id}-read-icon`} className={`directory-intro-cta__action-icon`} />
            <span id={`${id}-read-label`} className={`directory-intro-cta__action-label`}>{label}</span>
            <Icon size={13} name={`arrow-right`} id={`${id}-arrow-icon`} className={`directory-intro-cta__action-icon`} />
          </Link>
        </div>
        <div aria-hidden={`true`} id={`${id}-artwork`} className={`directory-intro-cta__artwork`}>
          <canvas ref={canvasRef} id={`${id}-helix`} className={`directory-intro-cta__helix`} />
        </div>
      </div>
    </section>
  );
};

export default DirectoryIntroCta;
