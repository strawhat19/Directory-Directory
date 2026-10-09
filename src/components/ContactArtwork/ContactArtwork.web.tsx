import './ContactArtwork.scss';
import Icon from '../Icon/Icon';
import type { CSSProperties } from 'react';
import HeroAtom from '../HeroAtom/HeroAtom';
import BrandMark from '../BrandMark/BrandMark';
import { contactArtworkFolders } from './contactArtworkFolders';

const ContactArtwork = () => (
  <div id={`contact-artwork`} className={`contact-artwork`} aria-hidden={true}>
    <div id={`contact-artwork-dots`} className={`contact-artwork__dots`} />
    <HeroAtom />
    <div id={`contact-artwork-mark-frame`} className={`contact-artwork__mark-frame`}>
      <BrandMark size={116} id={`contact-artwork-brand-mark`} className={`contact-artwork__brand-mark`} />
    </div>
    <div id={`contact-artwork-folders`} className={`contact-artwork__folders`}>
      {contactArtworkFolders.map((folder, index) => (
        <div
          key={folder.id}
          id={`contact-artwork-folder-${folder.id}`}
          className={`contact-artwork__folder contact-artwork__folder--${folder.id}`}
          style={{ [`--folder-color`]: folder.color } as CSSProperties}
        >
          <span id={`contact-artwork-number-${folder.id}`} className={`contact-artwork__number`}>{String(index + 1).padStart(2, `0`)}</span>
          <div id={`contact-artwork-copy-${folder.id}`} className={`contact-artwork__copy`}>
            <span id={`contact-artwork-detail-${folder.id}`} className={`contact-artwork__detail`}>{folder.detail}</span>
            <span id={`contact-artwork-label-${folder.id}`} className={`contact-artwork__label`}>{folder.label}</span>
          </div>
          <Icon size={17} name={folder.icon} color={folder.color} id={`contact-artwork-icon-${folder.id}`} className={`contact-artwork__icon`} />
        </div>
      ))}
    </div>
  </div>
);

export default ContactArtwork;
