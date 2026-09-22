# Enigma Music Series

A single-track ambient techno listening experience built with Next.js.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

This repository is ready to import directly into Vercel:

1. In Vercel, select **Add New → Project** and import `Bardiap82/enigma`.
2. Keep the detected **Next.js** framework preset and the default build command: `npm run build`.
3. Add these environment variables in **Project Settings → Environment Variables** if Cloudinary's server SDK is used by a future route:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
4. Click **Deploy**.

The current audio player uses a public Cloudinary delivery URL, so it does not need runtime secrets to play the track.

## Verify production build

```bash
npm run build
```
