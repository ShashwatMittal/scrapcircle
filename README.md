# ScrapCircle

A React + TypeScript foundation for an anonymous household scrap marketplace.

## Run locally

Node.js 22.12+ recommended.

```sh
npm ci
npm run dev
```

```sh
npm test
npm run build
npm run lint
```

## Included

Responsive marketplace; material and text filtering; photo-based listing form; household/dealer demo role switch; anonymous quotations; offer acceptance; collection confirmation and transaction rating UI. Sample data uses Bengaluru neighbourhoods and INR as working defaults.

**This is a frontend prototype.** Data exists in memory and resets on refresh. The role switch is for demonstration, not authentication. Initial listing artwork is illustrative, not uploaded item photography. Use sample information only.

## Structure

- `src/features/marketplace/model.ts`: typed domain models and offer rules
- `src/App.tsx`: marketplace and demo transaction interface
- `src/App.css`, `src/index.css`: responsive visual system
- `docs/ROADMAP.md`: implementation backlog and acceptance criteria
- `docs/SECURITY.md`: privacy requirements and security boundaries

## Product direction

Households list recyclable materials with photos and estimated weights. Dealers submit private offers using pseudonymous profiles. The seller selects an offer, both parties coordinate pickup, confirm completion and rate the transaction. Identities remain hidden throughout browsing and negotiation. The exact pickup privacy model must be agreed before implementing location sharing.

The production service, authentication, persistence, notifications, pickup coordination, moderation and verified bilateral ratings are future work. No payments or real-world collection are arranged by this demo.

## License

This project is licensed under the [MIT License](LICENSE).
