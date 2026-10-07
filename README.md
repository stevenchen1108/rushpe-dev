This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Event announcement popup

The site-wide popup shows today's events in `America/New_York` and the next upcoming event from the same public Google Calendar used by `/events`. It includes calendar subscription and social links. Clicking a flyer opens a larger preview inside the site; closing the preview returns to the announcement. Flyers come from `IMAGE: <URL>` in an event description, an HTML image/image link, or a Google Drive attachment. Attached flyers must be publicly viewable.

The popup appears once per page load. Refreshing the page or opening the site in a new tab shows it again; client-side navigation keeps it dismissed. An in-memory flag tracks whether it has opened, with no browser storage required. Close it with the X, an outside click, or Escape. No popup is shown for empty calendars or failed requests; those visits do not set the seen flag. The popup's “View all events” link jumps directly to `/events#calendar`.

To preview it again locally, refresh the page. Configure `NEXT_PUBLIC_GOOGLE_CAL_API_KEY` with the public calendar's API key. A key restricted to production HTTP referrers will reject localhost requests; use a development key that allows your local origin (for example, `http://127.0.0.1:3000/*`). Run `npm test` for calendar parsing, event selection, pagination, and failure-handling checks.

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
