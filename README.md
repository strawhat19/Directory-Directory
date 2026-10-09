# Directory Directory

The Directory of Directories is built with Expo Router, React Native, TypeScript, and Sass. It runs on web, iOS, and Android with a light editorial layout and the selected [V15 indexed D logo](assets/concepts/logos/v15/01-indexed-d-compact-blue.svg).

The sticky header places Blog (`/blog`) next to About (`/about`), with Terms (`/terms`), Privacy (`/privacy`), and Contact (`/contact`) in the menu beside Sign In (`/sign-in`) and Sign Up (`/sign-up`). A looping directory marquee beneath it has colored links, mouse/touch dragging, and a pause control. The account pages use local demo profiles and return to the originating page after success. The footer includes the current copyright year and a link to [Piratechs](https://piratechs.com/).

Eight category cards cover Design, Tools, Communities, Places, Learning, Technology, Business, and Lifestyle. Filled All, Categories, and Directors tabs smoothly change the search theme and placeholder without changing the page or search behavior. The discovery status dot cycles between blue and green with a smooth radar pulse. The Contact form only previews a local draft and does not send messages.

The app is frontend only. Its sample catalog supports search, category filters, saved directories, grid and list views, and directory previews. Saved items live in React context for the current session; refreshing or restarting the app resets them. Demo profiles persist in web localStorage or native AsyncStorage, with no passwords, identity verification, or backend. Signing out clears the active profile; clearing app storage removes the profiles.

Install dependencies with `npm install`, then run `npm start`. To start a specific platform, use `npm run web`, `npm run ios`, or `npm run android`. Expo provides the mobile project for app store deployment, and the web app can be exported to host on a custom domain.

## Community Feeds

The bottom of the blog includes Reddit community cards and YouTube channels. Web YouTube cards embed each channel's uploads playlist, which loads YouTube's current public playlist when opened or reloaded; new uploads appear without changing the app's source. Native cards open the channels directly. Playback depends on YouTube's availability and embedding permissions. See the [official YouTube player parameters](https://developers.google.com/youtube/player_parameters) for playlist embedding.

Reddit feeds require a separately hosted provider using access approved by Reddit. Set `EXPO_PUBLIC_REDDIT_FEED_URL` to its public HTTPS JSON endpoint, then restart Expo or export the web app again. This variable is public: include no tokens, API keys, passwords, or other secrets in it. Reddit credentials and upstream requests belong on the approved provider's server. The app does not fetch Reddit directly or fall back to scraping, generic proxies, or RSS. [Reddit announced that public RSS support ends November 13, 2026](https://www.reddit.com/r/modnews/comments/1wubgvt/continuing_our_infrastructure_updates_whats/); a direct RSS integration would not be a durable feed source.

The provider must return HTTP `200` with `Content-Type: application/json` and this response shape. The post below is illustrative; serve real approved-provider data, or an empty `posts` array when a source has no current posts:

```json
{
  "sources": [
    {
      "id": "directorymakers",
      "posts": [
        {
          "id": "post-id",
          "title": "Post Title",
          "url": "https://www.reddit.com/r/directorymakers/comments/post_id/post_title/",
          "publishedAt": "2026-10-08T14:30:00Z"
        }
      ]
    },
    { "id": "directoryguild", "posts": [] }
  ]
}
```

Only `directorymakers` and `directoryguild` are accepted source IDs. Posts require nonempty string IDs and titles, an HTTPS URL on `reddit.com`, `www.reddit.com`, or `old.reddit.com`, and a valid ISO 8601 timestamp with seconds and a timezone. The client displays at most four posts per source in provider order and ignores duplicate IDs or URLs within each source and repeated source records. A well-shaped empty list is a successful empty feed. A missing source is unavailable; malformed records, unknown sources, invalid JSON, non-200 responses, network failures, and timeouts make feeds unavailable instead of presenting old posts as current.

Serve the endpoint without client credentials and allow the deployed web origin through CORS. Use `Vary: Origin` if the allowed origin is set dynamically. Send `Cache-Control: no-store` to the browser; any server-side caching must follow the provider's Reddit approval and current retention rules. Propagate deleted or removed posts promptly into the feed and purge them from provider caches. Return a non-200 status for upstream failures rather than claiming success with an empty collection. Keep all upstream authentication and secrets on the server.

The shared hook fetches on mount, supports manual refresh, and polls every five minutes while the web page is visible or the native app is active. Requests do not overlap and are aborted after fifteen seconds or on unmount. Without a valid configured provider endpoint, no Reddit requests run and the cards offer direct community links.

## Structure

The public blog lives at `/blog` (`/blogs` redirects there). Seven articles have individual `/blog/[slug]` pages with related reading, metadata, canonical links, social cards, and structured data. The featured directory history appears on the blog, About, and landing pages. Article content lives in `src/shared/blog/articles.ts`.

`PageCta` shares the colored CTA sections across web and native pages. Page-specific copy, destinations, blue/green/purple/red tones, and dots/rings/grid patterns live in `src/shared/cta/pageCtas.ts`. Information, discovery, contact, account, and article pages use contextual sections; the blog's purple directory CTA uses the same component.

Web output uses Expo Router static rendering so an export includes HTML for every article. Set `EXPO_PUBLIC_SITE_URL` to the full public origin (for example, `https://your-domain.com`) before exporting with `npx expo export --platform web`. Without it, canonical and structured-data URLs use relative paths; social image URLs need the public origin for external sharing. The featured image and its generation prompt are saved in `public/blog/directory-history.png` and `assets/blog/PROMPT.md`.

- `app/` contains the landing and informational routes and platform layouts.
- `src/components/` contains one folder per component, with structure, logic, and styles separated.
- `src/shared/landing/` holds the sample catalog and shared React context.
- `src/shared/ui/` provides descriptive element identifiers for native components.
- `public/` contains the exact selected SVG for the web header.
- `assets/concepts/` preserves the original design and logo concepts.

Web components use Sass. Native components use React Native styles and adapt the same page for smaller screens. Visible elements have descriptive classes and identifiers to make feedback easy to reference.

Code has not been tested, built, or otherwise verified, following `AGENTS.md`; review the diff and verify before committing.
