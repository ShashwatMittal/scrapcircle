# Implementation roadmap

The initial frontend foundation is complete. All following items are planned, not implemented production features.

## 1. Product decisions and privacy contract
- Define household and dealer eligibility, supported materials, service area, currency and hazardous-material exclusions.
- Resolve anonymous pickup: precise location and contact visibility, consent, retention and platform-mediated communication.
- Specify quote expiry, edits, cancellations, disputes and rating publication.
Acceptance: approved user journeys and field-level visibility matrix for each role and transaction state.

## 2. Backend schema and API
- Persist users, private identities, public aliases, listings, photos, quotes, transactions and ratings.
- Add schema migrations, validation, pagination, monetary units, constraints and transactional offer acceptance.
Acceptance: documented API and tests for invalid transitions, concurrent acceptance and access boundaries.

## 3. Authentication and authorization
- Implement sessions and household/dealer onboarding; authorize resource access on the server.
Acceptance: one account cannot read or mutate another account's private records; self-bidding is rejected.

## 4. Secure listing creation and photos
- Implement authenticated listing CRUD, material/weight validation, secure uploads and metadata stripping.
Acceptance: durable listings, malicious upload rejection, isolated photo access and no public precise location.

## 5. Dealer discovery and private quotations
- Add material/area search, pagination, quote creation/editing/expiry and offer status.
Acceptance: dealers only see their own offers; listing owners compare all offers; duplicate/self quotes fail.

## 6. Offer selection and pickup lifecycle
- Atomically accept one quote, handle withdrawals and cancellations, coordinate pickup and dual completion confirmation.
Acceptance: only participants access pickup details, only one winning offer exists and completion cannot be forged by one party.

## 7. Bilateral verified ratings
- Allow both participants one review per completed transaction; define blind publication and aggregate calculations.
Acceptance: nonparticipants and incomplete transactions cannot submit ratings; review edits and abuse are covered.

## 8. Notifications and communication
- Add private in-app notifications for quotes, acceptance, pickup and completion; consider optional email.
Acceptance: delivery is idempotent, private fields do not leak and notification preferences are respected.

## 9. Moderation, safety and privacy operations
- Add reporting, blocked materials, PII moderation, dealer verification policy, deletion/export and dispute handling.
Acceptance: documented operational workflow, retention rules and tested report handling.

## 10. Production readiness and accessibility
- Extract focused UI components, verify native dialog keyboard/screen-reader flows and image optimization.
- Add integration/E2E and authorization tests, CI, monitoring, dependency checks, backups and deployment documentation.
Acceptance: core journey passes across mobile/desktop, restore drill passes, privacy and security launch review is complete.
