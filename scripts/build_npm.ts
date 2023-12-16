import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    deno: {
      test: "dev",
    },
  },
  package: {
    // package.json properties
    name: "complaindate",
    version: Deno.args[0]?.replace(/^v/, ""),
    description: "Date-time utilities that keep timezones on the surface.",
    license: "MIT",
    author: { name: "Björn Nilsved" },
    keywords: [
      "plain-date",
      "plain-time",
      "date-time",
      "timezone",
      "date",
      "time",
      "localization",
      "l10n",
      "internationalization",
      "i18n",
      "immutable",
      "functional",
      "fp",
      "curried",
      "pure",
    ],
    sideEffects: false,
    repository: {
      type: "git",
      url: "git+https://github.com/bjuppa/com-plain-date.git",
    },
    bugs: {
      url: "https://github.com/bjuppa/com-plain-date/issues",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
