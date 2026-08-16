# Spec 33 profile-copy final verification

## Copy outcome

- Community pages lead with open roles from the named community and explain the GitHub source.
- User pages lead with roles shared by the named publisher and identify the public community-repository source.
- Community and user directories use visitor-facing discovery language rather than internal-system language.
- Product copy avoids unsupported quality claims, “premium” language, and abstract “jobs intelligence” phrasing.
- All profile and directory changes are complete in English, Portuguese, Spanish, Italian, French, and German.

## Route and metadata evidence

- Community sample output contains a unique title, description, canonical URL, Open Graph fields, and Twitter fields.
- User sample output contains a unique title, description, canonical URL, `profile` Open Graph type, and Twitter fields.
- Existing `?authors=` links remain readable, while generated directory links now use `/users/[handle]`.

## Validation evidence

Executed with Node.js 20.19.5 and npm 10.8.2:

- `npm run lint` — exit 0.
- `npx tsc --noEmit` — exit 0.
- `npm run build` — exit 0.
- Static generation produced 464 pages: 137 community profile paths and 316 user profile paths, plus shared routes.
