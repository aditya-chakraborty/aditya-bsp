# BackstagePass Challenge Feed

This project is a Next.js App Router implementation of a challenge-feed interface with a day-based sidebar, feed cards, a challenge-description drawer, and light/dark theme support.

## Project Understanding, Requirements, and Decisions

### Understanding of the project

The goal was to build a pixel-conscious, production-like UI screen for a "9-Day Fitness Challenge" where users can:

- Navigate challenge days in a left sidebar.
- View their own submission and community-shared content.
- Open a right-side drawer for challenge details.
- Interact with header actions and user controls.
- Switch between light and dark themes with preference persistence.

### Technical requirements interpreted from the understanding

- Use Next.js with a client-rendered page (`src/app/page.tsx`) for interactive state.
- Keep layout and typography globally consistent in `src/app/layout.tsx` and `src/app/globals.css`.
- Build reusable UI sections as React components rather than one monolithic JSX block.
- Implement robust theme tokens using CSS custom properties and data-attribute theme switching.
- Preserve responsive behavior for desktop/tablet/mobile in `src/app/page.css`.
- Include accessible patterns where relevant (dialog title/description, semantic controls, visible interactions).

### Core decisions I took

- **Component-first page composition:** Split the screen into focused components (`Header`, `Sidebar`, `SubmissionCard`, `SharedSection`, `Drawer`, `UserMenuDropdown`, `Logo`) to simplify maintenance.
- **Tokenized styling:** Drove visual consistency through CSS variables in `globals.css`, while keeping component layout rules in `page.css`.
- **Controlled day selection:** Used `selectedDay` state with normalization (`2..9`) and lock logic so unavailable days are clearly disabled.
- **Theme persistence strategy:** Initialized theme from `localStorage` + system preference fallback, then synced via `document.documentElement.dataset.theme`.
- **Radix primitives for overlays/menus:** Used `Dialog`, `DropdownMenu`, `Tooltip`, and `Switch` for predictable interaction and accessibility baseline.

## Step-by-Step Walkthrough of the Plan and Changes

### 1) Established application shell and fonts

- In `src/app/layout.tsx`, configured the root HTML/body shell and loaded the Be Vietnam Pro + Sarabun font variables.
- Added metadata title/description to reflect the challenge-feed assignment context.

### 2) Designed a theme system before component detailing

- In `src/app/globals.css`, defined a light theme token set in `:root`.
- Added dark theme overrides in `:root[data-theme="dark"]`.
- Added `prefers-color-scheme` fallback for non-explicit theme states.
- Mapped tokens through `@theme inline` to align with app-wide color/font usage.

### 3) Structured the interactive page into clear React components

- In `src/app/page.tsx`, set up type-safe constants (`Day`, `ThemeMode`, day list, sidebar geometry constants).
- Implemented isolated components for each UI area to reduce coupling and improve readability.
- Kept utility logic (`isLocked`) close to page context for straightforward business rules.

### 4) Implemented header and account interactions

- Built a two-row header: top utility row (`Logo`, streak, notifications, user menu) and sub-header with navigation/title.
- Added theme toggle in the user menu and connected it to parent state.
- Used tooltip/dropdown primitives for compact interaction details.

### 5) Implemented day progression sidebar behavior

- Rendered day rows from `dayList` dynamically.
- Computed selected indicator transform from row height + gap constants.
- Added lock/completion visual states and disabled future-day buttons.
- Applied adjacency classes around selected row for custom contour styling.

### 6) Built feed content sections

- Created `SubmissionCard` for the current user entry (profile, text, media, reactions, comments).
- Created `SharedSection` for highlighted/pinned community content and challenge instructions.
- Kept cards composable and style-driven by shared class patterns.

### 7) Added challenge drawer experience

- Implemented `Drawer` using `Dialog` with overlay, title, description, media, stats, and close actions.
- Kept open state in the page-level parent to coordinate trigger and close behavior.
- Added descriptive semantics (`Dialog.Title`, `aria-describedby`) for assistive tooling.

### 8) Finalized responsive and interaction styling

- In `src/app/page.css`, defined desktop-first layout for sticky headers, sidebar, and central feed column.
- Added responsive breakpoints to convert sidebar flow and scale typography/layout on smaller screens.
- Styled control states (hover/focus/disabled) and supporting visuals (gradients, pills, rounded surfaces, overlays).

## Component and Style Breakdown

### Components created in `src/app/page.tsx`

- `Logo`: theme-aware logo image swap (`/BackstagePass LogoDark.svg` vs `/bts_logo.svg`).
- `UserMenuDropdown`: avatar trigger, theme switch, and logout action.
- `Header`: top utility bar + challenge sub-header and drawer trigger.
- `Sidebar`: day listing, lock/completion state, selected-day indicator motion.
- `SubmissionCard`: "Your Submission" card with media and social actions.
- `SharedSection`: pinned community post and challenge guidance content.
- `Drawer`: right-side challenge description panel with close controls.
- `Home` (page root): coordinates all component state (`selectedDay`, `drawerOpen`, `theme`).

### How styles were defined

- `src/app/globals.css`
  - Owns design tokens (background, surface, border, text, states, gradients).
  - Defines light/dark theme variables and system preference fallback.
  - Applies global resets and base body font/background.

- `src/app/page.css`
  - Owns component-scoped class styling and layout mechanics.
  - Uses naming prefix `bp-*` for predictable style targeting.
  - Handles spacing, sizing, sticky positioning, card visuals, controls, and breakpoints.

- `src/app/layout.tsx`
  - Connects global font variables to the app shell body class.
  - Establishes document-level metadata and root app structure.

## Getting Started

Run the development server:

```bash
npm run dev
```

Open `https://aditya-bsp.vercel.app/` to view the project.
