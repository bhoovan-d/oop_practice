# CS F213 OOP Practice

A personal Java practice site organised by course week, topic and difficulty.

## Features

- 249 coding questions across 83 topics and 13 course weeks
- Easy, moderate and hard practice for every topic
- Worked input/output examples and detailed hard-question contracts
- Learn mode with progressive hints
- Timed exam mode
- Browser-local progress and optional solution storage
- No embedded compiler or server-side code storage

## Run locally

Requires Node.js 22.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

Import this GitHub repository into Vercel. The included `vercel.json` selects the Next.js framework and runs `next build`. No environment variables are required.

The production deployment is public unless deployment protection is enabled in the Vercel project settings.

## Data storage

Questions are stored in `lib/curriculum.ts`, `lib/challenge-examples.ts` and `lib/hard-contracts.ts`. Progress and pasted solutions use browser local storage and therefore remain on the current browser and device.
