## Pull Request

- Run lint - `npm lint`
- Run tests - `npm test`

## Deploy

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
