import type { IconName } from '../../components/Icon/Icon.types';

export type InformationPageId = `about` | `api` | `docs` | `discover` | `pricing` | `terms` | `privacy`;

export type InformationSection = {
    id: string;
    title: string;
    paragraphs: string[];
};

export type InformationPageContent = {
    icon: IconName;
    title: string;
    eyebrow: string;
    summary: string;
    noteTitle: string;
    note: string;
    sections: InformationSection[];
};

export const informationUpdatedDate = `September 29, 2026`;

export const informationPages: Record<InformationPageId, InformationPageContent> = {
    about: {
        icon: `info`,
        eyebrow: `A little more about us`,
        title: `About Directory Directory`,
        summary: `A thoughtful starting point for discovering directories, following your curiosity, and finding your next favorite thing.`,
        noteTitle: `A catalogue in progress`,
        note: `The current collection uses sample listings. Think of it as a preview of the discovery experience.`,
        sections: [
            {
                id: `the-idea`,
                title: `The Directory of Directories.`,
                paragraphs: [
                    `The internet is full of useful things. Finding a good starting point can still take a little work. Directory Directory brings directories together in one approachable place, organized around design, tools, communities, places, learning, technology, business, and lifestyle.`,
                    `Whether you are looking for inspiration, something useful for your next project, or a new rabbit hole to explore, the idea is simple: a little direction goes a long way.`,
                ],
            },
            {
                id: `how-to-explore`,
                title: `Make it your own`,
                paragraphs: [
                    `Search the collection, browse a category, or switch between grid and list views. Open a listing to read more, and use the bookmark button to keep a few favorites close during your visit.`,
                    `Searches, filters, and saved listings stay in this app's memory while it is open. Moving between these pages preserves that session; refreshing the website or restarting the app clears it.`,
                ],
            },
            {
                id: `the-collection`,
                title: `A clear starting point`,
                paragraphs: [
                    `The current listings are sample content that demonstrates the directory experience. Their names and descriptions are examples, rather than verified recommendations or endorsements of real services.`,
                    `If you follow a link to another website, take a moment to assess that website and read its own terms and privacy information.`,
                ],
            },
            {
                id: `stay-in-touch`,
                title: `Keep the conversation going`,
                paragraphs: [
                    `For project information, questions, or feedback, visit Piratechs using the link below. We appreciate a good idea as much as a good find.`,
                ],
            },
        ],
    },
    api: {
        icon: `tools`,
        eyebrow: `For builders`,
        title: `API`,
        summary: `An overview of where API access stands as Directory Directory takes shape.`,
        noteTitle: `No public API yet`,
        note: `The current catalogue is a local preview. There are no public endpoints, API keys, or developer accounts to request.`,
        sections: [
            {
                id: `current-status`,
                title: `Current status`,
                paragraphs: [
                    `Directory Directory does not offer a public API today. The sample listings are included with the app rather than served through a documented endpoint.`,
                    `You can browse the preview, search its sample catalogue, and explore the interface without an API key.`,
                ],
            },
            {
                id: `share-your-interest`,
                title: `Share your interest`,
                paragraphs: [
                    `If API access would help your project, tell us what you would want to build. Your feedback can help shape future plans, but no API release or access date is promised.`,
                ],
            },
        ],
    },
    docs: {
        icon: `file-text`,
        eyebrow: `Getting started`,
        title: `Docs`,
        summary: `A short guide to exploring the current Directory Directory preview.`,
        noteTitle: `Preview guide`,
        note: `This page covers the features available in the current app. Developer API documentation is not available yet.`,
        sections: [
            {
                id: `explore-listings`,
                title: `Find a directory`,
                paragraphs: [
                    `Start on the home page and search the sample collection by name or topic. Browse categories and use the available filters to narrow what you see.`,
                    `Switch between grid and list views, then open a listing to read its preview. The listings are examples for exploring the app, not verified recommendations.`,
                ],
            },
            {
                id: `save-listings`,
                title: `Save for this visit`,
                paragraphs: [
                    `Use a listing's bookmark button to keep it close while you explore. Searches, filters, and saved listings stay in memory during your visit and clear when you refresh the website or restart the app.`,
                ],
            },
        ],
    },
    discover: {
        icon: `sparkles`,
        eyebrow: `Follow your curiosity`,
        title: `Discover`,
        summary: `Explore the ideas and categories behind the Directory Directory preview.`,
        noteTitle: `A sample collection`,
        note: `The current listings are illustrative examples, so treat this as a preview of the discovery experience.`,
        sections: [
            {
                id: `browse-your-way`,
                title: `Browse your way`,
                paragraphs: [
                    `Browse directories across design, tools, communities, places, learning, technology, business, and lifestyle. Choose a category that catches your eye or search for something specific.`,
                    `The home page brings search, filters, and listing previews together so you can move from a broad idea to a closer look.`,
                ],
            },
            {
                id: `keep-exploring`,
                title: `Keep exploring`,
                paragraphs: [
                    `Open a listing to see more details, try another search, or bookmark an example during your visit. The collection is sample content and may change as the app develops.`,
                ],
            },
        ],
    },
    pricing: {
        icon: `business`,
        eyebrow: `Simple to explore`,
        title: `Pricing`,
        summary: `Directory Directory is currently a free preview with no paid plans.`,
        noteTitle: `No checkout or subscription`,
        note: `There are no paid tiers, billing accounts, or purchases in the current app.`,
        sections: [
            {
                id: `free-preview`,
                title: `Explore the preview for free`,
                paragraphs: [
                    `You can browse, search, filter, and bookmark the sample listings without paying or creating an account. These features are part of the current preview.`,
                ],
            },
            {
                id: `future-pricing`,
                title: `Looking ahead`,
                paragraphs: [
                    `No future pricing or paid features have been announced here. If that changes, this page will explain the available options before you are asked to pay for anything.`,
                ],
            },
        ],
    },
    terms: {
        icon: `file-text`,
        eyebrow: `Using the directory`,
        title: `Terms of Use`,
        summary: `A few straightforward terms for exploring Directory Directory and using the information you find here.`,
        noteTitle: `Simple, respectful use`,
        note: `Explore responsibly, make your own decisions, and respect the people and work behind the websites you visit.`,
        sections: [
            {
                id: `using-the-service`,
                title: `Using Directory Directory`,
                paragraphs: [
                    `These terms apply to your use of Directory Directory. By using the website or app, you agree to these terms. If you do not agree, please stop using the service.`,
                    `The directory currently offers a sample catalogue with search, filters, listing previews, and session-only bookmarks. No account is required for these features.`,
                ],
            },
            {
                id: `acceptable-use`,
                title: `Use it respectfully`,
                paragraphs: [
                    `Use the service lawfully and without interfering with other people or the operation of the website or app. Do not attempt to damage, overload, bypass security, or gain unauthorized access to the service or its supporting systems.`,
                    `Respect the rights of others, including intellectual property and privacy rights, when using any information or external resources you discover.`,
                ],
            },
            {
                id: `listing-information`,
                title: `Listings and your decisions`,
                paragraphs: [
                    `The current listings are illustrative sample content. Inclusion in the collection does not mean a service has been verified, endorsed, or guaranteed, and descriptions may be changed or removed.`,
                    `Assess information independently before relying on it. Directory Directory does not promise that a listing is accurate, complete, current, or suitable for your particular purpose.`,
                ],
            },
            {
                id: `external-websites`,
                title: `External websites`,
                paragraphs: [
                    `Links to other websites, including Piratechs, take you outside Directory Directory. Those websites operate under their own terms and privacy policies, and their content and availability are outside this directory's control.`,
                ],
            },
            {
                id: `content-and-availability`,
                title: `Content and availability`,
                paragraphs: [
                    `The design, branding, text, and other materials remain subject to the rights of their respective owners. Using the directory does not transfer ownership or grant permission to reuse protected material beyond what applicable law permits.`,
                    `The service is offered as available and may change, experience interruptions, or be discontinued. To the extent permitted by applicable law, no guarantee is made about uninterrupted operation or fitness for a particular purpose. Nothing in these terms limits rights or protections that cannot lawfully be excluded.`,
                ],
            },
            {
                id: `updates-and-questions`,
                title: `Updates and questions`,
                paragraphs: [
                    `These terms may be updated as the directory develops. The date shown on this page identifies the latest revision. Please review the terms when you return, and visit Piratechs for questions or feedback.`,
                ],
            },
        ],
    },
    privacy: {
        icon: `shield`,
        eyebrow: `Your privacy`,
        title: `Privacy Policy`,
        summary: `How the current Directory Directory experience handles your searches, preferences, and saved listings.`,
        noteTitle: `Session-only preferences`,
        note: `Your searches and bookmarks live in this app's memory. Refreshing the website or restarting the app starts a fresh session.`,
        sections: [
            {
                id: `current-experience`,
                title: `The current experience`,
                paragraphs: [
                    `This policy describes the current Directory Directory website and app. The sample catalogue is included with the app. Optional sign-in and sign-up pages use local demo profiles, and the Contact page offers a local message preview without sending a message.`,
                ],
            },
            {
                id: `searches-and-saves`,
                title: `Searches, filters, and saved listings`,
                paragraphs: [
                    `Search text, category and topic filters, view preferences, saved listing identifiers, and the open listing preview are held in the app's memory. The search and saved-list features do not send these preferences to a backend.`,
                    `These preferences are not written to cookies or persistent device storage by this app. They remain available while navigating between its pages, and are cleared when you refresh the website or restart the app.`,
                ],
            },
            {
                id: `local-demo-profiles`,
                title: `Local demo profiles`,
                paragraphs: [
                    `Sign-up saves your name and email address, and sign-in saves the active profile, in this browser's local storage or the mobile app's device storage. These details are not sent to an account server or email provider.`,
                    `Local profiles and the active sign-in remain after a refresh or restart. Signing out removes the active sign-in while retaining your local profiles. Clear this app's browser or device storage to remove them. No passwords are requested or stored, and this demo does not verify identity.`,
                ],
            },
            {
                id: `contact-drafts`,
                title: `Contact form drafts`,
                paragraphs: [
                    `The Contact page lets you enter a name, email address, and message to preview a draft. These fields stay in the page's memory and are not sent to a backend, email service, or third party by the form.`,
                    `The form is not connected to a delivery service. A preview does not send your message, and the draft is not saved to cookies or persistent device storage. Refreshing the website or restarting the app clears it.`,
                ],
            },
            {
                id: `hosting-and-network`,
                title: `Hosting and network requests`,
                paragraphs: [
                    `Loading a website involves network requests to the services that deliver it. Hosting or network providers may process connection information, such as an IP address and request details, under their own practices.`,
                    `This policy describes the app's features and does not make claims about a hosting provider's logging, retention, or other processing. Those practices depend on the provider and deployment configuration.`,
                ],
            },
            {
                id: `external-links`,
                title: `When you leave the directory`,
                paragraphs: [
                    `Following an external link, including the Piratechs link, opens a separate website. That website may collect information or use cookies according to its own privacy policy. Review its policy before providing information or using its services.`,
                ],
            },
            {
                id: `copyright-year`,
                title: `The copyright year`,
                paragraphs: [
                    `The footer's copyright year comes from your device's current date. This feature does not request your precise location or send the date to a backend.`,
                ],
            },
            {
                id: `your-controls`,
                title: `Your controls and questions`,
                paragraphs: [
                    `You can remove a saved listing with its bookmark button or clear your search and filters within the directory. Refreshing the website or restarting the app clears catalogue preferences; local demo profiles remain until their device storage is cleared.`,
                    `This policy may change if the app's features or data handling change. The revision date is shown on this page. For privacy questions or feedback, visit Piratechs using the link below.`,
                ],
            },
        ],
    },
};
