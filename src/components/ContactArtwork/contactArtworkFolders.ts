import type { IconName } from '../Icon/Icon.types';

type ContactArtworkFolder = {
  id: string;
  label: string;
  color: string;
  detail: string;
  icon: IconName;
};

export const contactArtworkFolders: readonly ContactArtworkFolder[] = [
  { id: `ideas`, detail: `A LITTLE INSPIRATION`, color: `#21a668`, icon: `sparkles`, label: `Ideas worth sharing` },
  { id: `questions`, detail: `START A CONVERSATION`, color: `#0874f9`, icon: `mail`, label: `Questions worth asking` },
  { id: `finds`, detail: `SOMETHING GOOD`, color: `#d83b42`, icon: `bookmark`, label: `Finds worth passing on` },
];
