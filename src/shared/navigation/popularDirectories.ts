import type { IconName } from '../../components/Icon/Icon.types';
import { categories, linkedDirectories, type DirectoryAccent } from '../catalog/catalog';

export type PopularDirectory = {
    id: string;
    href: string;
    icon: IconName;
    label: string;
    color: string;
    background: string;
};

const accentColors: Record<DirectoryAccent, { color: string; background: string }> = {
    ink: { color: `#14213d`, background: `#eef0f5` },
    red: { color: `#d83b42`, background: `#fff0ee` },
    blue: { color: `#0874f9`, background: `#edf4ff` },
    pink: { color: `#cd4c8c`, background: `#fdeef5` },
    green: { color: `#21a668`, background: `#edf8f1` },
    yellow: { color: `#b7860b`, background: `#fff8db` },
    purple: { color: `#8054d7`, background: `#f3edff` },
    orange: { color: `#d97722`, background: `#fff1e6` },
};

export const popularDirectories: PopularDirectory[] = linkedDirectories.map((directory) => ({
    id: directory.id,
    href: directory.href,
    icon: categories.find((category) => category.id === directory.category)?.icon ?? `globe`,
    label: directory.name,
    ...accentColors[directory.accent],
}));
