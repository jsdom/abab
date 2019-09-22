# Contributing

If you have any questions or run into any trouble contributing to this repo, please file an issue or contact [the maintainer](https://github.com/jeffcarp).

# Checklists

## Before submitting a Pull Request

- `npm run lint`
- `npm test`

## Deploy

- `git checkout master`
- `git pull`
- `git status`
  - Verify clean working directory
  - Verify branch is up-to-date with 'origin/master'
- `nvm use`
- `npm install`
- `npm test`
- Verify Travis build is also passing https://travis-ci.org/jsdom/abab
- Bump version in `package.json`
- Update `CHANGELOG.md` to reflect changes since last tag
- `git add package.json package-lock.json CHANGELOG.md`
- `git commit -m "Version 0.0.0"`
- `git tag -m "0.0.0" 0.0.0`
- `git push`
- `git push --tags`
- `npm publish`
