// ex. scripts/build_npm.ts
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
    version: Deno.args[0],
    description: "Date-time utilities that keeps timezones on the surface.",
    license: "MIT",
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
