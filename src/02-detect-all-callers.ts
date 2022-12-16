// This script lists all callers, direct and indirect, to the "getSongs" function.
//
// Usage: $ npx tsx src/02-detect-all-callers.ts

import * as tsmorph from "ts-morph";

const tsConfigFilePath = "./tsconfig.json";
const targetFile = "./src/index.ts";
const targetFunction = "getSongs";

const directRefs =
  new tsmorph.Project({ tsConfigFilePath })
    .getSourceFile(targetFile)
    ?.getFunction(targetFunction)
    ?.findReferencesAsNodes() || [];

const allRefs = [...directRefs]; // TODO: also include indirect callers

for (const directRef of allRefs) {
  // 1. find the caller (i.e. function that called getSongs), for that direct reference
  // 2. push all references to that caller, into allRefs
  // 3. then, apply the same process to those references, until they are not referenced anywhere.
}

const renderCaller = (fctCall: tsmorph.Node) => ({
  file: fctCall.getSourceFile().getFilePath(),
  line: fctCall.getStartLineNumber(),
});

console.log(`callers of ${targetFunction}:`, allRefs.map(renderCaller));
