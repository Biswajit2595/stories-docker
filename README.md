# Instagram Stories

Live demo: https://instagram-stories-azure.vercel.app/

A simplified mobile-first Instagram Stories experience built with Next.js, React, and Tailwind CSS.

## Project Overview

This app presents a mobile-style Instagram feed with a horizontal stories tray and a full-screen story viewer. Stories are loaded from an external JSON file and can be navigated manually or by auto-advance.

## Key Features

- Mobile-only interface with desktop fallback messaging
- Stories fetched from `public/stories.json`
- Horizontally scrollable story tray with profile images
- Full-screen story viewer overlay
- Tap left / right to navigate between stories
- Auto-advance every 5 seconds with progress bar
- Image loading states and smooth transitions
- Lightweight implementation using native React state and effects
- Feed preview with infinite scroll-style load-on-scroll posts

## What’s Included

- `app/page.tsx` - main client-side page logic, mobile detection, story state, and layout
- `app/components/StoriesList.tsx` - story carousel UI
- `app/components/StoryViewer.tsx` - story modal viewer with navigation and progress
- `app/components/Feed.tsx` - sample Instagram-style feed below the stories bar
- `public/stories.json` - external story data source
- `next.config.ts` - remote image host configuration for `next/image`

## Tech Stack

- Next.js 16.2.4
- React 19.2.4
- TypeScript
- Tailwind CSS v4
- lucide-react for UI icons

## Running Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app in your browser:

```bash
http://localhost:3000
```

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Deployment

This project is already deployed on Vercel:

- https://instagram-stories-azure.vercel.app/

To deploy your own copy, connect the repository to Vercel and use the default Next.js build settings.

## Notes

- The story disappearance logic is intentionally simplified: stories auto-advance and can be closed manually.
- The application is optimized for mobile viewing and intentionally shows a mobile-only message on wider screens.

## Future Improvements

- Add swipe gestures for story navigation
- Persist story state across sessions
- Add story captions and timestamps
- Improve accessibility with keyboard controls and ARIA labels
