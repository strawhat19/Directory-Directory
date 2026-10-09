export type BlogSection = {
  id: string;
  title: string;
  paragraphs: string[];
};
export type BlogSource = {
  url: string;
  label: string;
};
export type BlogArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  description: string;
  datePublished: string;
  tags: string[];
  sections: BlogSection[];
  sources?: BlogSource[];
};

export const featuredArticle: BlogArticle = {
  readMinutes: 4,
  category: `Directory Essentials`,
  datePublished: `2026-10-08`,
  id: `what-is-a-directory`,
  slug: `what-is-a-directory`,
  tags: [`directories`, `discovery`, `history`],
  title: `What Is a Directory? From Printed Guides to the Open Web`,
  description: `Learn what a directory is, how printed city and telephone guides became online resource collections, and where a directory of directories fits today.`,
  excerpt: `Before links and search bars, directories helped people navigate cities, trades, and telephone networks. Explore how that simple idea became the online collections we use today.`,
  sections: [
    {
      id: `a-collection-with-a-purpose`,
      title: `A Collection With a Purpose`,
      paragraphs: [
        `A directory is an organized collection of resources connected by a subject, place, or purpose. Its entries might be businesses, people, websites, tools, or communities. Each entry gives you enough information to recognize a useful destination and take the next step: visit, contact, compare, or explore.`,
        `The organizing principle matters as much as the list. A directory of independent bookshops answers a different question from a directory of design tools. Categories, descriptions, and useful details turn scattered names into something you can browse. That idea is much older than the internet.`,
      ],
    },
    {
      id: `before-the-search-bar`,
      title: `Before the Search Bar`,
      paragraphs: [
        `Printed city and business directories helped people make sense of the places around them. They gathered residents, addresses, occupations, and institutions into a reference people could consult without already knowing everyone in town. The Library of Congress preserves these publications as records of particular communities at particular moments.`,
        `One example reaches back to eighteenth-century New York: David Longworth began publishing his almanacs and directories annually in 1796. His 1798 volume included a city plan and information about its waterfront. A directory could be both a practical guide for its readers and, much later, a window into a city's history.`,
      ],
    },
    {
      id: `phone-books-and-business-categories`,
      title: `Phone Books and Business Categories`,
      paragraphs: [
        `Telephone directories applied the same reference idea to another everyday need: finding someone to call. Alphabetical listings helped readers look up a known name, while classified business listings grouped services under headings. If you needed a plumber but did not know one, the category gave you a starting point.`,
        `The Library of Congress's digitized telephone collection includes white pages and yellow pages that show these different approaches. Printed guides had limits: a changed address or new business could not instantly appear in every copy. Keeping information current would become one of the opportunities of the online format.`,
      ],
    },
    {
      id: `the-early-web-needed-a-map`,
      title: `The Early Web Needed a Map`,
      paragraphs: [
        `The Web, invented by Tim Berners-Lee at CERN in 1989, created a new kind of destination to organize. The WWW Virtual Library traces its beginning to Berners-Lee's catalogue at CERN in 1991. Links could now connect readers directly to resources, and subject specialists could maintain collections on their own servers.`,
        `In 1994, Stanford graduate students Jerry Yang and David Filo began the guide that became Yahoo. As their collection of websites grew, they divided it into categories and subcategories. Browsing a hierarchy helped visitors discover sites even when they did not know a particular address or the right words to search.`,
      ],
    },
    {
      id: `today-s-specialist-collections`,
      title: `Today's Specialist Collections`,
      paragraphs: [
        `Online directories now take many forms: local business listings, software catalogues, research guides, creative communities, and collections built around a single hobby. Some use editorial selection; others accept submissions or gather listings automatically. A directory label alone does not tell you how thoroughly its entries have been checked.`,
        `Their value comes from useful scope and organization. A good description can explain who a resource serves, while categories make alternatives easier to compare. Links can be updated without reprinting a book, although maintaining accurate entries still requires attention.`,
      ],
    },
    {
      id: `a-directory-of-directories`,
      title: `A Directory of Directories`,
      paragraphs: [
        `Directory Directory brings the same idea up one level: the resources you browse here are directories themselves. Start with a category, discover a collection that interests you, and follow it to explore its resources. From printed guides to online lists, the purpose remains familiar: organize possibilities so people can find a useful next step.`,
      ],
    },
  ],
  sources: [
    {
      label: `CERN: The Birth of the Web`,
      url: `https://home.cern/science/computing/the-birth-of-the-web/`,
    },
    {
      label: `WWW Virtual Library: Its History`,
      url: `https://vlib.org/admin/history`,
    },
    {
      label: `Library of Congress: New York in 1798`,
      url: `https://blogs.loc.gov/inside_adams/2023/06/new-york-in-1798/`,
    },
    {
      label: `Library of Congress: City and Telephone Directories`,
      url: `https://guides.loc.gov/united-states-city-telephone-directories`,
    },
    {
      label: `Library of Congress: U.S. Telephone Directory Collection`,
      url: `https://www.loc.gov/collections/united-states-telephone-directory-collection/about-this-collection/`,
    },
    {
      label: `Centre for Computing History: David Filo and Jerry Yang Found Yahoo`,
      url: `https://www.computinghistory.org.uk/det/12410/David-Filo-and-Jerry-Yang-found-Yahoo/`,
    },
  ],
};

export const blogArticles: BlogArticle[] = [
  featuredArticle,
  {
    readMinutes: 3,
    category: `Better Browsing`,
    datePublished: `2026-10-08`,
    id: `directory-vs-search-engine`,
    slug: `directory-vs-search-engine`,
    tags: [`directories`, `discovery`, `search`],
    title: `Directory vs. Search Engine: When to Browse and When to Search`,
    description: `Understand the difference between a directory and a search engine, and combine category browsing with focused searches to find useful online resources.`,
    excerpt: `A search starts with a question. A directory starts with a collection. Learn how to use both when you are finding a specific answer or exploring a new subject.`,
    sections: [
      {
        id: `two-starting-points`,
        title: `Two Starting Points`,
        paragraphs: [
          `A search engine and a directory both help you find information, but they give you different starting points. A search engine responds to a query. A directory presents a collection organized around a topic or place, so you can explore its entries without first naming the exact resource you want.`,
          `Google describes its search as using automated systems to find relevant information in an index. A directory usually has a narrower boundary: a profession, a region, a type of software, or another shared theme. Neither approach guarantees that every useful resource will appear.`,
        ],
      },
      {
        id: `search-for-a-specific-answer`,
        title: `Search for a Specific Answer`,
        paragraphs: [
          `Search is a useful starting point when your question is already clear. You might know a product name, need a particular documentation page, or want the official website of an organization. Include the detail that distinguishes your need, such as a location, supported platform, or topic.`,
          `For example, searching for a named tool's export instructions is more focused than browsing a broad software directory. Once you reach the result, read the destination page. A search snippet helps you choose a link; it is not a substitute for checking the source and its context.`,
        ],
      },
      {
        id: `browse-to-discover-options`,
        title: `Browse to Discover Options`,
        paragraphs: [
          `Directory browsing is useful when you are still learning what exists. A category can reveal neighboring ideas, unfamiliar terminology, or several ways to solve the same problem. Brief descriptions let you compare possibilities before opening every destination.`,
          `If you are beginning a creative project, a collection of design resources might introduce tools you would not yet know to search for. Pay attention to the directory's scope and selection process. A small, clearly explained list can be more useful for your task than a much larger collection with little context.`,
        ],
      },
      {
        id: `combine-browsing-and-search`,
        title: `Combine Browsing and Search`,
        paragraphs: [
          `Start broadly with a directory, make a short list, then use focused searches to investigate the options. Check current details on each resource's own website and compare the points that matter to you. You can also reverse the process: search for a niche directory, then browse its categories.`,
          `Some directories include their own search bar. That feature searches within the collection rather than turning the directory into a general web search engine. Choose the method that helps your next decision, and switch when your question becomes more precise.`,
        ],
      },
    ],
    sources: [
      {
        label: `Google: How Google Search Works`,
        url: `https://www.google.com/search/howsearchworks/how-search-works/`,
      },
    ],
  },
  {
    readMinutes: 3,
    category: `Better Browsing`,
    datePublished: `2026-10-08`,
    id: `choose-a-trustworthy-directory`,
    slug: `choose-a-trustworthy-directory`,
    tags: [`directories`, `quality`, `research`],
    title: `How to Choose a Trustworthy Online Directory`,
    description: `Evaluate an online directory by its purpose, ownership, selection rules, listing freshness, and clear treatment of sponsored placements.`,
    excerpt: `Useful directories explain what they include and why. Look beyond a polished layout to understand how a collection is maintained and how to assess its listings.`,
    sections: [
      {
        id: `look-for-a-clear-purpose`,
        title: `Look for a Clear Purpose`,
        paragraphs: [
          `Before relying on an online directory, ask what it is trying to collect. Is it limited to a city, an industry, a particular audience, or a type of resource? A clear boundary helps you understand both the listings it includes and the useful options it might leave out.`,
          `Read its About page and any submission guidance. Useful explanations tell you who runs the collection, how to contact them, and what an entry needs to qualify. If the purpose is vague, treat the listings as leads for further research rather than a complete picture of the topic.`,
        ],
      },
      {
        id: `understand-selection-and-placement`,
        title: `Understand Selection and Placement`,
        paragraphs: [
          `Directories can be editorially selected, openly submitted, paid, automatically assembled, or a mixture of these approaches. None of those labels tells the whole story. Look for an explanation of whether entries receive a review and what that review actually covers.`,
          `Sponsored placement should be recognizable. A featured position, large card, or prominent badge may reflect a commercial arrangement rather than an assessment of quality. When a collection uses rankings or ratings, check whether it explains their basis before allowing the order to decide your choice.`,
        ],
      },
      {
        id: `check-a-few-listings`,
        title: `Check a Few Listings`,
        paragraphs: [
          `Open several entries and compare their descriptions with the destinations they link to. Check whether the links work, whether the subject matches the category, and whether the details remain relevant. A visible update date is helpful, but recent dates alone do not prove that an entry has been reviewed thoroughly.`,
          `Notice how the collection handles mistakes. A working correction or reporting option gives readers a way to help maintain it. Repeated broken links or descriptions that do not match their destinations are reasons to investigate each listing more carefully.`,
        ],
      },
      {
        id: `use-the-directory-as-a-starting-point`,
        title: `Use the Directory as a Starting Point`,
        paragraphs: [
          `A directory can introduce a resource without endorsing everything about it. Before signing up, buying, or sharing information, visit the resource's own site and review the details that affect your decision. For a local service, confirm availability directly; for a tool, check its current features and conditions.`,
          `Keep a short comparison of the options you find. Separating the directory's description from what you confirm yourself makes it easier to see unresolved questions. A trustworthy browsing habit depends on both the collection you choose and how you use it.`,
        ],
      },
    ],
  },
  {
    readMinutes: 3,
    category: `Discovery Guides`,
    datePublished: `2026-10-08`,
    id: `discover-niche-resources`,
    slug: `discover-niche-resources`,
    tags: [`discovery`, `research`, `niche`],
    title: `How to Discover Niche Resources Through Directories`,
    description: `Find specialist websites, tools, and communities by narrowing your goal, following directory categories, and keeping a useful resource shortlist.`,
    excerpt: `The most useful resource for your project may live in a specialist collection. Turn a broad interest into a focused trail of categories, descriptions, and links.`,
    sections: [
      {
        id: `start-with-a-useful-question`,
        title: `Start With a Useful Question`,
        paragraphs: [
          `Niche discovery becomes easier when you describe the task behind your interest. Instead of simply looking for design resources, you might need accessible color tools for a web project. Instead of exploring education generally, you might be looking for beginner astronomy activities that work without specialist equipment.`,
          `Write down one goal and two or three constraints before browsing. Your available time, experience, location, or preferred format can help you decide which descriptions deserve a closer look. A focused question still leaves room for discovery; it gives that discovery a direction.`,
        ],
      },
      {
        id: `follow-the-category-trail`,
        title: `Follow the Category Trail`,
        paragraphs: [
          `Start in the nearest broad category, then look for narrower groupings or specialist directories. Read the collection's introduction before opening a long list of entries. It may explain its intended audience or use terminology that helps you recognize the area you actually need.`,
          `Explore one neighboring category when it has a clear connection to your goal. A research project might benefit from both archive collections and visualization resources, for example. Follow the relationship deliberately so your browsing remains useful rather than becoming an endless pile of tabs.`,
        ],
      },
      {
        id: `compare-context-not-just-names`,
        title: `Compare Context, Not Just Names`,
        paragraphs: [
          `Look for descriptions that explain what a resource does, who it is for, and what makes it relevant to the collection. Similar names can hide very different audiences. One community might focus on professional discussion while another is built around first steps and peer support.`,
          `When an entry seems promising, open its official destination and check a sample of its content. For a learning collection, read one lesson. For a community, review its public introduction and participation rules. A small amount of direct exploration is more useful than guessing from the listing alone.`,
        ],
      },
      {
        id: `keep-a-small-shortlist`,
        title: `Keep a Small Shortlist`,
        paragraphs: [
          `Save a few promising resources with a sentence explaining why each belongs on your list. Record a next action, such as reading a tutorial or comparing an alternative. That note helps you return with a purpose instead of rediscovering the same pages later.`,
          `Try one resource before expanding the collection again. You will learn which details matter and which constraints need refining. Directory Directory can help you find collections to begin that process; the specialist destinations you visit supply the detail for the next step.`,
        ],
      },
    ],
  },
  {
    readMinutes: 3,
    category: `Collection Building`,
    datePublished: `2026-10-08`,
    id: `organize-a-resource-collection`,
    slug: `organize-a-resource-collection`,
    tags: [`directories`, `organization`, `quality`],
    title: `Turn a Pile of Links Into a Useful Resource Collection`,
    description: `Organize a personal or shared resource directory with a clear purpose, practical categories, consistent descriptions, and a manageable review routine.`,
    excerpt: `A helpful collection needs more than saved URLs. Give your links a purpose, simple categories, and enough context for someone to know where to begin.`,
    sections: [
      {
        id: `decide-who-the-collection-serves`,
        title: `Decide Who the Collection Serves`,
        paragraphs: [
          `A useful resource collection begins with an audience and a task. It might help your future self find project references, introduce colleagues to a topic, or give newcomers a starting point. Write one sentence describing its purpose before deciding what belongs in it.`,
          `Use that sentence to set a practical boundary. A collection of beginner photography lessons does not need to include every camera store and professional editing service. A clear scope makes decisions easier and keeps the collection from becoming a second version of your entire browser history.`,
        ],
      },
      {
        id: `create-categories-people-understand`,
        title: `Create Categories People Understand`,
        paragraphs: [
          `Choose a small set of category names that reflect how readers will browse. Group by purpose when that is the most useful distinction: learning, tools, inspiration, and communities, for example. If location or format matters more, organize around those details instead.`,
          `Avoid creating a new category for every link. Start broad enough that each category holds a meaningful group, then divide it when readers need a clearer choice. Keep labels consistent and use tags for details that cross categories, such as beginner level or a particular platform.`,
        ],
      },
      {
        id: `give-each-entry-context`,
        title: `Give Each Entry Context`,
        paragraphs: [
          `For every resource, save a name, a direct link, and a short description of what someone can do there. Add the details that influence a choice, such as intended audience or content format. Use the same fields across the collection so readers can compare entries without decoding a different style each time.`,
          `Write descriptions in your own words and separate observable details from your opinion. If a condition may change, record when you checked it or send readers to the official page for the current information. A concise, specific note beats a string of promotional adjectives.`,
        ],
      },
      {
        id: `make-maintenance-manageable`,
        title: `Make Maintenance Manageable`,
        paragraphs: [
          `Review a small group of entries at a time. Remove duplicates, correct destinations that have moved, and archive resources that no longer fit the scope. You do not need an elaborate system to begin; a consistent document or spreadsheet can hold a useful collection.`,
          `If other people use the list, provide a way to suggest additions and corrections. Keep the admission rule clear so every suggestion does not automatically become an entry. A directory earns its usefulness through continuing organization, not simply through the number of links it accumulates.`,
        ],
      },
    ],
  },
  {
    readMinutes: 3,
    category: `Directory Essentials`,
    datePublished: `2026-10-08`,
    id: `why-a-directory-of-directories`,
    slug: `why-a-directory-of-directories`,
    tags: [`directories`, `discovery`, `organization`],
    title: `Why Browse a Directory of Directories?`,
    description: `See how a directory of directories helps you discover specialist resource collections, compare their scope, and begin exploring a new topic.`,
    excerpt: `Sometimes the resource you need is an entire collection. A directory of directories helps you find those collections and choose a useful place to start.`,
    sections: [
      {
        id: `find-the-collection-first`,
        title: `Find the Collection First`,
        paragraphs: [
          `An ordinary online directory groups resources around a theme. A directory of directories groups the collections themselves. Instead of listing every design tool, local venue, or learning website directly, it helps you discover directories whose focus matches the subject you want to explore.`,
          `That extra layer is useful when you need more than one destination. You might be comparing options, learning the vocabulary of a new field, or looking for a collection to return to as your project develops. Finding a suitable directory gives you a more focused space for those next steps.`,
        ],
      },
      {
        id: `match-the-scope-to-your-goal`,
        title: `Match the Scope to Your Goal`,
        paragraphs: [
          `Two directories in the same category may serve very different purposes. One could cover a broad industry; another could focus on beginners, a particular place, or one type of resource. Read the description and visit the directory's introduction to understand what is included.`,
          `Choose according to the question you are trying to answer. A broad collection can help you orient yourself, while a specialist list may be easier to use once your need is clear. The most useful starting point is the one whose boundary fits your task, not necessarily the one with the largest catalogue.`,
        ],
      },
      {
        id: `understand-the-two-levels`,
        title: `Understand the Two Levels`,
        paragraphs: [
          `Directory Directory is the starting layer: browse categories and directory listings to discover a collection. The directory you visit is the next layer, with its own entries, organization, and rules. Those destinations are responsible for the details they publish and may change how they operate over time.`,
          `Treat a listing here as an introduction. Once you leave for a collection, check how its resources are selected and how current its information is. Continue to the individual resource's official site when you need to confirm a feature, availability, or other detail before acting.`,
        ],
      },
      {
        id: `make-a-purposeful-browsing-loop`,
        title: `Make a Purposeful Browsing Loop`,
        paragraphs: [
          `Begin with one category and choose a collection whose description matches your goal. Explore enough entries to understand its usefulness, then save a few promising destinations with a short note. If the collection is too broad or narrow, return and try another starting point.`,
          `This approach makes discovery easier to manage. You are building a path from a broad interest to a relevant collection and then to a specific resource. A directory of directories adds value when it helps you choose that path with less guesswork.`,
        ],
      },
    ],
  },
  {
    readMinutes: 3,
    category: `Discovery Guides`,
    datePublished: `2026-10-08`,
    id: `directories-for-local-discovery`,
    slug: `directories-for-local-discovery`,
    tags: [`discovery`, `directories`, `local`],
    title: `Use Local Directories to Discover More of Your Community`,
    description: `Use local directories to find places, services, and community groups, compare useful details, and confirm information before planning a visit.`,
    excerpt: `Explore beyond the places you already know. Local directories can introduce businesses, venues, and groups when you browse with a clear purpose and confirm the details.`,
    sections: [
      {
        id: `define-what-local-means`,
        title: `Define What Local Means`,
        paragraphs: [
          `Local discovery starts with a place and a purpose. You might want to explore independent shops in walking distance, find a community group near work, or compare services across a wider region. Decide how far you are willing to travel and what makes a destination relevant before opening listings.`,
          `Check the directory's geographic scope. A collection named after a city may include surrounding towns, online businesses, or services that travel to customers. Clear location information helps you distinguish a nearby destination from one that merely serves the same area.`,
        ],
      },
      {
        id: `browse-by-need`,
        title: `Browse by Need`,
        paragraphs: [
          `Categories are helpful when you know the type of place you want but do not know a particular name. Start with that need, then read the descriptions for details that matter to you. A venue's activities, a group's audience, or a shop's specialty can make the difference between a relevant listing and an interesting detour.`,
          `Try a neighboring category when it serves the same goal. Someone looking for a creative afternoon might consider both workshops and galleries. Keep a short list of possibilities so you can compare them before building a plan around the first result.`,
        ],
      },
      {
        id: `confirm-before-you-go`,
        title: `Confirm Before You Go`,
        paragraphs: [
          `A directory entry is a starting point for a visit. Check the destination's official website or contact it directly to confirm opening hours, address, booking requirements, and whether an activity is happening on your chosen day. Listings can remain online after circumstances change.`,
          `Confirm the practical details that affect your visit, such as step-free access, transport connections, or whether an event requires registration. Do not assume a missing detail means a feature is available. Asking the destination a specific question is often more useful than interpreting a brief description.`,
        ],
      },
      {
        id: `build-a-personal-local-guide`,
        title: `Build a Personal Local Guide`,
        paragraphs: [
          `Save places you want to try with a note about why they caught your attention. After visiting, update that note with what was useful and whether you want to return. A small personal guide helps you plan future outings without starting your search again every time.`,
          `If you notice an outdated directory entry, use its correction option when one is available. Helpful collections depend on accurate information as much as good organization. Explore thoughtfully, confirm directly, and let the directory introduce the parts of your community you have not encountered yet.`,
        ],
      },
    ],
  },
];

export const getBlogArticle = (slug: string) => blogArticles.find(article => article.slug === slug);
export const getRelatedArticles = (article: BlogArticle, limit = 3) => blogArticles
  .filter(candidate => candidate.id !== article.id)
  .map((candidate, index) => ({
    index,
    article: candidate,
    score: candidate.tags.filter(tag => article.tags.includes(tag)).length,
  }))
  .sort((left, right) => right.score - left.score || left.index - right.index)
  .slice(0, Math.max(0, limit))
  .map(candidate => candidate.article);
