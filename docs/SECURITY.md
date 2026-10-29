# Security and privacy boundaries

## Current prototype

The client holds sample data in memory. There is no authenticated identity or server-side authorization. Client rules and the demo role switch are not security controls. Do not enter sensitive personal information. No secrets or credentials belong in frontend code, repository files or Vite environment variables.

React escapes text content. Image selection limits declared MIME type to JPEG/PNG/WebP and file size to 5 MB; these are usability checks only. Photos remain in browser memory. No HTML injection APIs are used.

## Required before real users

- Authenticate users; authorize every operation server-side against stored ownership and participation. Separate private identity records from public pseudonyms.
- Public listing responses must omit identity, precise address, contact information and private quotes. Only owners see received quotes; dealers see their own quotes.
- Define how collection works while preserving anonymity. Prefer platform-mediated coordination and coarse location until a mutually authorized pickup stage; never imply physical pickup guarantees anonymity.
- Strip image EXIF/location metadata; decode and re-encode images; validate bytes and size server-side; use isolated object storage and short-lived authorized access. Moderate photos and text for identifying information.
- Prevent self-bidding, duplicate quotes, nonparticipant ratings and concurrent acceptance of multiple offers using database constraints and transactions.
- Require both parties' handover confirmation. Permit one rating per party per completed transaction; consider blind publication until both submit or a deadline expires.
- Add session protections, CSRF where applicable, rate limits, abuse reporting, retention/deletion policy, audit logs without sensitive payloads and secure deployment headers.
- Review dependencies and execute authorization, malicious-upload, concurrency and privacy regression tests before launch.
