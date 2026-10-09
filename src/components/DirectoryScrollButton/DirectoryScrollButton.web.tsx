import Icon from '../Icon/Icon';
import './DirectoryScrollButton.scss';
import { directoryScrollActions } from './DirectoryScrollButton.content';
import type { DirectoryScrollButtonProps } from './DirectoryScrollButton.types';

const DirectoryScrollButton = ({ onExplore, target = `directories` }: DirectoryScrollButtonProps) => {
  const { letters, icon, ariaLabel } = directoryScrollActions[target];
  const id = `hero-${target}`;

  return (
    <button
      type={`button`}
      onClick={onExplore}
      id={`${id}-button`}
      aria-label={ariaLabel}
      className={`directory-scroll-button directory-scroll-button--${target}`}
    >
      <Icon size={17} name={icon} id={`${id}-section-icon`} className={`directory-scroll-button__icon`} />
      <span aria-hidden={true} id={`${id}-label`} className={`directory-scroll-button__label`}>
        {letters.map((letter, index) => (
          <span key={index} id={`${id}-letter-${index}`} className={`directory-scroll-button__letter`}>{letter}</span>
        ))}
      </span>
      <Icon size={16} name={`arrow-up`} id={`${id}-arrow`} className={`directory-scroll-button__icon directory-scroll-button__arrow`} />
    </button>
  );
};

export default DirectoryScrollButton;
