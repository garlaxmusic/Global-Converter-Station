# WaveDrop Pro UI

A premium, creator-focused media converter interface inspired by the clean editorial feel of modern underground music platforms.

## Run locally
- Node.js 18+
- `npm install`
- `npm start`
- Open `http://localhost:3000`

## Backend
The UI is complete, while `/api/convert` is intentionally an adapter skeleton. For a production deployment, connect it to an authorized source or your own storage and use FFmpeg in an isolated worker.

The site should only process:
- media you own;
- public-domain media;
- direct files explicitly offered for download;
- sources whose platform/creator terms authorize downloading.

Do not bypass DRM, private content, login controls, paywalls, or platform restrictions.

## Design direction
The visual language uses:
- near-black editorial canvas;
- acid-lime accent;
- oversized typography;
- compact mono metadata;
- thin borders;
- source-aware UI;
- mobile-first responsive layout.
