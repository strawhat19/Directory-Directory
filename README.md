# Directory Directory

The Directory of Directories is a single landing page built with Expo Router, React Native, TypeScript, and Sass. It runs on web, iOS, and Android with a light editorial layout and the selected [V15 indexed D logo](assets/concepts/logos/v15/01-indexed-d-compact-blue.svg).

The app is frontend only. Its sample catalog supports search, category filters, saved directories, grid and list views, and directory previews. Saved items live in React context for the current session; refreshing or restarting the app resets them. There is no backend or authentication.

Install dependencies with `npm install`, then run `npm start`. To start a specific platform, use `npm run web`, `npm run ios`, or `npm run android`. Expo provides the mobile project for app store deployment, and the web app can be exported to host on a custom domain.

## Structure

- `app/` contains the shared landing route and platform layouts.
- `src/components/` contains one folder per component, with structure, logic, and styles separated.
- `src/shared/landing/` holds the sample catalog and shared React context.
- `src/shared/ui/` provides descriptive element identifiers for native components.
- `public/` contains the exact selected SVG for the web header.
- `assets/concepts/` preserves the original design and logo concepts.

Web components use Sass. Native components use React Native styles and adapt the same page for smaller screens. Visible elements have descriptive classes and identifiers to make feedback easy to reference.

Code has not been tested, built, or otherwise verified, following `AGENTS.md`; review the diff and verify before committing.
