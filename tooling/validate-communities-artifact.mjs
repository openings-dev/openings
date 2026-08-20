import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import ts from "typescript";

const sourcePath = resolve("lib/opportunities/community-artifact-validation.ts");
const source = await readFile(sourcePath, "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  fileName: sourcePath,
}).outputText;
const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`;
const { parseStaticCommunities } = await import(moduleUrl);

const valid = {
  generatedAt: "2026-08-19T00:00:00.000Z",
  items: [{
    repository: "rustdevbr/vagas",
    repositoryUrl: "https://github.com/rustdevbr/vagas",
    name: "rustdevbr",
    avatarUrl: "https://github.com/rustdevbr.png",
    region: "South America",
    country: "Brazil",
    countryCode: "BR",
    locale: "pt-BR",
    scope: "national",
    opportunitiesCount: 0,
    lastPostedAt: null,
  }],
};

assert.deepEqual(parseStaticCommunities(valid, "api/communities.json"), valid);
assert.throws(
  () => parseStaticCommunities({ ...valid, items: [{ ...valid.items[0], opportunitiesCount: -1 }] }, "api/communities.json"),
  /Invalid static opportunity communities/,
);
assert.throws(
  () => parseStaticCommunities({ ...valid, items: [{ ...valid.items[0], repositoryUrl: "nope" }] }, "api/communities.json"),
  /Invalid static opportunity communities/,
);

console.log("communities-artifact-ok");
