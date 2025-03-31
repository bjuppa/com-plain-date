# Development

```sh
# Run tests
deno test

# Linter
deno lint

# Formatter
deno fmt --check
deno fmt
```

## Releases

Set a new `version` in [`deno.json`](deno.json) and push to `main` branch to
[automatically publish](https://jsr.io/docs/publishing-packages#publishing-from-github-actions)
to [jsr](https://jsr.io/@bjuppa/complaindate) with a
[GitHub Action](https://github.com/bjuppa/com-plain-date/actions/).

Releases are to be created and managed through
[GitHub Releases](https://github.com/bjuppa/com-plain-date/releases).

When created, GitHub releases are automatically published to
[npm](https://www.npmjs.com/package/complaindate) with a
[GitHub Action](https://github.com/bjuppa/com-plain-date/actions) and to
[deno.land](https://deno.land/x/complaindate) with a
[GitHub Webhook](https://github.com/bjuppa/com-plain-date/settings/hooks).

## Testing the package

There's a script (using [dnt](https://github.com/denoland/dnt)) that generates
an npm package from the current code into [the `npm/` directory](/npm):

```sh
# Version tag is not required for local testing
deno run -A scripts/build_npm.ts
```

If you have an npm project setup locally for testing, you may install the built
package using a local path:

```sh
npm install path/to/com-plain-date/npm
```

## Troubleshooting

If publishing to npm gives 404 errors, check that `NPM_TOKEN` is not expired at
<https://www.npmjs.com/settings/bjuppa/tokens> and set properly at
<https://github.com/bjuppa/com-plain-date/settings/secrets/actions>.
