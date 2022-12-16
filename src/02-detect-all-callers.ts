// This script lists all callers, direct and indirect, to the "getSongs" function.
//
// Usage: $ npx tsx src/02-detect-all-callers.ts

import * as tsmorph from "ts-morph";

const tsConfigFilePath = "./tsconfig.json";
const targetFile = "./src/index.ts";
const targetFunction = "getSongs";

const directCallers =
  new tsmorph.Project({ tsConfigFilePath })
    .getSourceFile(targetFile)
    ?.getFunction(targetFunction)
    ?.findReferencesAsNodes() || [];

const allCallers = [...directCallers]; // TODO: also include indirect callers

const renderCaller = (fctCall: tsmorph.Node) => ({
  file: fctCall.getSourceFile().getFilePath(),
  line: fctCall.getStartLineNumber(),
});

console.log(`callers of ${targetFunction}:`, allCallers.map(renderCaller));
