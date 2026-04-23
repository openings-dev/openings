# Contributing to openings.dev

Thanks for helping improve openings.dev.

## Ways to contribute

- Add new community repositories that publish jobs via GitHub issues
- Improve stack/seniority/location detection logic
- Fix bugs in ingestion, API or UI
- Improve docs and examples

## Development setup

```bash
git clone https://github.com/openings-dev/openings
cd openings
npm install
npm run dev
```

Open `http://localhost:3000`.

## Workflow

1. Create a branch from `main`
2. Make focused changes
3. Run checks:

```bash
npm run lint
npm run build
```

4. Open a Pull Request with:

- clear summary
- screenshots for UI changes
- test notes (what you ran)

## Adding a source repository

When proposing a new source repo, include:

- repository URL
- country/region covered
- language
- proof that jobs are published as issues
- expected posting frequency (if known)

## Pull request checklist

- [ ] Change is scoped and documented
- [ ] Lint/build pass locally
- [ ] No unrelated refactors in the same PR
- [ ] Breaking changes are explicitly called out

## Code of conduct

By participating, you agree to follow our [Code of Conduct](./CODE_OF_CONDUCT.md).
