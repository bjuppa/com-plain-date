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

Releases are to be created and managed through
[GitHub Releases](https://github.com/bjuppa/com-plain-date/releases).

New releases are automatically published to
[deno.land](https://deno.land/x/complaindate) with a
[GitHub Webhook](https://github.com/bjuppa/com-plain-date/settings/hooks) and to
[npm](https://www.npmjs.com/package/complaindate) with a
[GitHub Action](https://github.com/bjuppa/com-plain-date/actions).

## Testing the package

There's a script (using [dnt](https://github.com/denoland/dnt)) that generates
an npm package from the current code into [the `npm/` directory](/npm):

```sh
# Version tag is not required for local testing
deno run -A scripts/build_npm.ts
```

If you have an npm project setup locally for testing, you may install the built package using a local path:

```sh
npm install path/to/com-plain-date/npm
```
