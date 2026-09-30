import type { IconName } from '../../components/Icon/Icon.types';

export type PopularDirectory = {
    id: string;
    href: string;
    icon: IconName;
    label: string;
    color: string;
    background: string;
};

export const popularDirectories: PopularDirectory[] = [
    {
        icon: `sparkles`,
        color: `#bd581b`,
        id: `product-hunt`,
        label: `Product Hunt`,
        background: `#fff1e6`,
        href: `https://www.producthunt.com/`,
    },
    {
        icon: `tools`,
        color: `#168652`,
        id: `alternative-to`,
        label: `AlternativeTo`,
        background: `#e6f5ed`,
        href: `https://alternativeto.net/`,
    },
    {
        icon: `design`,
        id: `awwwards`,
        color: `#c13139`,
        label: `Awwwards`,
        background: `#fdecef`,
        href: `https://www.awwwards.com/`,
    },
    {
        id: `behance`,
        icon: `communities`,
        label: `Behance`,
        color: `#0868df`,
        background: `#edf4ff`,
        href: `https://www.behance.net/`,
    },
    {
        id: `g2`,
        label: `G2`,
        icon: `business`,
        color: `#7443c8`,
        background: `#f3edff`,
        href: `https://www.g2.com/`,
    },
    {
        id: `yelp`,
        label: `Yelp`,
        icon: `places`,
        color: `#b33775`,
        background: `#fdeef5`,
        href: `https://www.yelp.com/`,
    },
    {
        id: `all-trails`,
        icon: `places`,
        label: `AllTrails`,
        color: `#168652`,
        background: `#e6f5ed`,
        href: `https://www.alltrails.com/`,
    },
    {
        icon: `learning`,
        color: `#926b08`,
        id: `open-library`,
        label: `Open Library`,
        background: `#fff8db`,
        href: `https://openlibrary.org/`,
    },
];
