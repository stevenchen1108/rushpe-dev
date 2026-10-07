This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Upcoming-event widget

The site-wide widget shows the next ongoing or future event from the public Google Calendar used by `/events`. The compact card includes its name, date, time, location, and a “View Details” link to `/events#calendar`. When available, its poster appears on the right and opens the existing in-site preview when clicked. Missing or unavailable posters leave the full width for event details. “Today” and “Tomorrow” use the chapter's `America/New_York` time zone, including daylight-saving changes. All-day events retain their calendar dates.

The widget does not take focus or block scrolling when it appears. It stays hidden when the feed is empty, fails to load, or its notice is dismissed. Closing the card or choosing “View Details” saves dismissal for that event across refreshes and navigation. The same event can return once when it becomes “Today”; dismissing that reminder keeps it hidden too. Different events, recurring instances, and rescheduled events receive their own notices. Poster previews do not dismiss the notice.

Dismissals are stored under `rushpe:upcoming-event-dismissals:v1` in local storage and synchronized across tabs. If storage is unavailable, dismissal still works while the page stays open. The feed continues refreshing while dismissed so new events can appear; it refreshes every five minutes and when a timed event ends. Day labels and reminder eligibility update every minute. No new dependencies are required.

Configure `NEXT_PUBLIC_GOOGLE_CAL_API_KEY` with the public calendar's API key. A key restricted to production HTTP referrers will reject localhost requests; use a development key that allows your local origin (for example, `http://127.0.0.1:3000/*`). Run `npm test` for event selection, relative day labels, parsing, pagination, and failure handling.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
