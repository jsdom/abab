# Contributing

If you have any questions or run into any trouble contributing to this repo, please file an issue or contact [the maintainer](https://github.com/jeffcarp). I'd be happy to help.

# Checklists

## Before submitting a Pull Request

- `npm run lint`
- `npm test`

## Deploy

- `git status` - verify clean working directory
- `nvm use`
- `npm install`
- `npm test`
- Bump version in `package.json`
- `git add package.json`
- `git commit -m "Version 0.0.0"`
- `git tag -m "0.0.0" 0.0.0`
- `git push`
- `git push --tags`
- `npm publish`
