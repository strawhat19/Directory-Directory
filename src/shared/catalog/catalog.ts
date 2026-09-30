export type CategoryId =
    | `tools`
    | `design`
    | `places`
    | `learning`
    | `business`
    | `lifestyle`
    | `technology`
    | `communities`;
export type DirectoryAccent = `ink` | `red` | `blue` | `pink` | `green` | `yellow` | `purple` | `orange`;

export interface DirectoryCategory {
    id: CategoryId;
    label: string;
    description: string;
}

export interface DirectoryEntry {
    id: string;
    name: string;
    label: string;
    summary: string;
    initials: string;
    featured: boolean;
    category: CategoryId;
    accent: DirectoryAccent;
}

export const categories: DirectoryCategory[] = [
    {
        id: `design`,
        label: `Design`,
        description: `Ideas, references, and a little inspiration.`,
    },
    {
        id: `tools`,
        label: `Tools`,
        description: `Useful things for making your next thing.`,
    },
    {
        id: `communities`,
        label: `Communities`,
        description: `Good people doing interesting things.`,
    },
    {
        id: `places`,
        label: `Places`,
        description: `Find somewhere worth getting lost in.`,
    },
    {
        id: `learning`,
        label: `Learning`,
        description: `Fresh knowledge for your next bright idea.`,
    },
    {
        id: `technology`,
        label: `Technology`,
        description: `Explore what is new and what comes next.`,
    },
    {
        id: `business`,
        label: `Business`,
        description: `Resources for building something of your own.`,
    },
    {
        id: `lifestyle`,
        label: `Lifestyle`,
        description: `Good finds for a more thoughtful everyday.`,
    },
];

export const directories: DirectoryEntry[] = [
    {
        id: `interface-index`,
        initials: `Ii`,
        accent: `blue`,
        featured: true,
        category: `design`,
        name: `Interface Index`,
        label: `Interfaces & inspiration`,
        summary: `Thoughtful interfaces, useful patterns, and the details that make digital products feel right.`,
    },
    {
        id: `maker-stack`,
        initials: `Ms`,
        accent: `ink`,
        featured: true,
        category: `tools`,
        name: `Maker Stack`,
        label: `Tools for builders`,
        summary: `A considered collection of tools for turning a side project into something you can share.`,
    },
    {
        id: `common-ground`,
        initials: `Cg`,
        accent: `green`,
        featured: true,
        category: `communities`,
        name: `Common Ground`,
        label: `Creative communities`,
        summary: `Find your people in welcoming communities for designers, makers, and curious minds.`,
    },
    {
        id: `city-field-notes`,
        initials: `Cf`,
        accent: `red`,
        featured: false,
        category: `places`,
        name: `City Field Notes`,
        label: `Independent city guides`,
        summary: `Local discoveries, neighborhood favorites, and independent guides to a better day out.`,
    },
    {
        id: `type-foundry`,
        initials: `Tf`,
        accent: `ink`,
        featured: false,
        category: `design`,
        name: `Type Foundry`,
        label: `Type & typography`,
        summary: `Explore independent type foundries, distinctive letterforms, and resources for setting better type.`,
    },
    {
        id: `open-toolbox`,
        initials: `Ot`,
        accent: `blue`,
        featured: false,
        category: `tools`,
        name: `Open Toolbox`,
        label: `Open source essentials`,
        summary: `Practical open source tools that make everyday creative work a little more enjoyable.`,
    },
    {
        id: `project-people`,
        initials: `Pp`,
        accent: `red`,
        featured: false,
        category: `communities`,
        name: `Project People`,
        label: `Collaborators & collectives`,
        summary: `Independent collectives and spaces where a shared interest can become a shared project.`,
    },
    {
        id: `open-atlas`,
        initials: `Oa`,
        accent: `green`,
        featured: false,
        category: `places`,
        name: `Open Atlas`,
        label: `Spaces worth exploring`,
        summary: `A starting point for discovering studios, public spaces, and corners of the world with character.`,
    },
    {
        id: `form-and-function`,
        initials: `Ff`,
        accent: `blue`,
        featured: false,
        category: `design`,
        name: `Form & Function`,
        label: `Design systems & resources`,
        summary: `Design systems, accessible resources, and useful building blocks for your next good idea.`,
    },
    {
        id: `curiosity-classroom`,
        initials: `Cc`,
        accent: `yellow`,
        featured: false,
        category: `learning`,
        name: `Curiosity Classroom`,
        label: `Courses & learning resources`,
        summary: `A sample collection of courses, reading lists, and resources for learning something new.`,
    },
    {
        id: `future-files`,
        initials: `Ff`,
        accent: `purple`,
        featured: false,
        category: `technology`,
        name: `Future Files`,
        label: `Technology & emerging ideas`,
        summary: `A sample starting point for exploring new technology, useful experiments, and emerging ideas.`,
    },
    {
        id: `independent-playbook`,
        initials: `Ip`,
        accent: `orange`,
        featured: false,
        category: `business`,
        name: `Independent Playbook`,
        label: `Small business & entrepreneurship`,
        summary: `A sample directory of practical resources for independent businesses and people getting started.`,
    },
    {
        id: `everyday-edit`,
        initials: `Ee`,
        accent: `pink`,
        featured: false,
        category: `lifestyle`,
        name: `Everyday Edit`,
        label: `Lifestyle & everyday inspiration`,
        summary: `A sample collection of everyday inspiration, thoughtful habits, and little things worth finding.`,
    },
];
