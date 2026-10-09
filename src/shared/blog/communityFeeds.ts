export type RedditFeedPost = { id: string; title: string; url: string; publishedAt: string };
export type RedditFeedResult = { sourceId: string; status: `ready` | `unavailable`; posts: RedditFeedPost[] };
export type CommunityFeedSource = { id: string; name: string; url: string; color: string; description: string };
export type YouTubeFeedSource = CommunityFeedSource & { playlistId: string };

export const redditFeedSources: CommunityFeedSource[] = [
  {
    id: `directorymakers`,
    color: `#d97722`,
    name: `r/directorymakers`,
    url: `https://www.reddit.com/r/directorymakers/new/`,
    description: `Meet directory creators, share useful finds, and follow conversations about building and growing curated websites.`,
  },
  {
    id: `directoryguild`,
    color: `#8054d7`,
    name: `r/DirectoryGuild`,
    url: `https://www.reddit.com/r/DirectoryGuild/new/`,
    description: `Explore directory showcases, resource collections, design ideas, and lessons from fellow directory builders.`,
  },
];

export const youtubeFeedSources: YouTubeFeedSource[] = [
  {
    id: `frey-chu`,
    name: `Frey Chu`,
    color: `#0874f9`,
    playlistId: `UUn_9IIusig3hsdaiH0e_pLA`,
    url: `https://www.youtube.com/@FreyChu`,
    description: `Niche directory ideas, hands-on builds, and practical ways to help people discover your directory.`,
  },
  {
    color: `#21a668`,
    id: `brilliant-directories`,
    name: `Brilliant Directories`,
    playlistId: `UUVQfwMCFnjXEVqPAEJVjH0Q`,
    url: `https://www.youtube.com/user/BrilliantDirectories`,
    description: `Directory platform tutorials, webinars, and guidance on membership websites and business listings.`,
  },
  {
    color: `#d83b42`,
    id: `edirectory`,
    name: `eDirectory Software`,
    playlistId: `UUCg2aclofDpLeuRoPtlXq9w`,
    url: `https://www.youtube.com/eDirectorysoftware`,
    description: `Directory software walkthroughs and tips for organizing listings and running a directory website.`,
  },
];
