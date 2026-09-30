# Directory Directory

The Directory of Directories is built with Expo Router, React Native, TypeScript, and Sass. It runs on web, iOS, and Android with a light editorial layout and the selected [V15 indexed D logo](assets/concepts/logos/v15/01-indexed-d-compact-blue.svg).

The sticky header places the About (`/about`), Terms (`/terms`), Privacy (`/privacy`), and Contact (`/contact`) menu beside Sign In (`/sign-in`) and Sign Up (`/sign-up`). A looping directory marquee beneath it has colored links, mouse/touch dragging, and a pause control. The account pages use local demo profiles and return to the originating page after success. The footer includes the current copyright year and a link to [Piratechs](https://piratechs.com/).

Eight category cards cover Design, Tools, Communities, Places, Learning, Technology, Business, and Lifestyle. Filled All, Categories, and Directors tabs smoothly change the search theme and placeholder without changing the page or search behavior. The discovery status dot cycles between blue and green with a smooth radar pulse. The Contact form only previews a local draft and does not send messages.

The app is frontend only. Its sample catalog supports search, category filters, saved directories, grid and list views, and directory previews. Saved items live in React context for the current session; refreshing or restarting the app resets them. Demo profiles persist in web localStorage or native AsyncStorage, with no passwords, identity verification, or backend. Signing out clears the active profile; clearing app storage removes the profiles.

Install dependencies with `npm install`, then run `npm start`. To start a specific platform, use `npm run web`, `npm run ios`, or `npm run android`. Expo provides the mobile project for app store deployment, and the web app can be exported to host on a custom domain.

## Structure

- `app/` contains the landing and informational routes and platform layouts.
- `src/components/` contains one folder per component, with structure, logic, and styles separated.
- `src/shared/landing/` holds the sample catalog and shared React context.
- `src/shared/ui/` provides descriptive element identifiers for native components.
- `public/` contains the exact selected SVG for the web header.
- `assets/concepts/` preserves the original design and logo concepts.

Web components use Sass. Native components use React Native styles and adapt the same page for smaller screens. Visible elements have descriptive classes and identifiers to make feedback easy to reference.

Code has not been tested, built, or otherwise verified, following `AGENTS.md`; review the diff and verify before committing.
