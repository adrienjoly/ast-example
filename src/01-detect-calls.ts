// This script lists all calls to the "getSongs" function.
//
// Usage: $ npx tsx src/01-detect-calls.ts

import * as tsmorph from "ts-morph";

const tsConfigFilePath = "./tsconfig.json";
const targetFile = "./src/index.ts";
const targetFunction = "getSongs";

const functionCalls =
  new tsmorph.Project({ tsConfigFilePath })
    .getSourceFile(targetFile)
    ?.getFunction(targetFunction)
    ?.findReferencesAsNodes() || [];

const renderCaller = (fctCall: tsmorph.Node) => ({
  file: fctCall.getSourceFile().getFilePath(),
  line: fctCall.getStartLineNumber(),
});

console.log(`calls to ${targetFunction}:`, functionCalls.map(renderCaller));
