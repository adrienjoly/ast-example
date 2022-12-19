// This script lists all callers, direct and indirect, to the "getSongs" function.
//
// Usage: $ npx tsx src/02-detect-all-callers.ts

import * as tsmorph from "ts-morph";

const isFunction = (node: tsmorph.Node): node is tsmorph.FunctionDeclaration =>
  node instanceof tsmorph.FunctionDeclaration; // note: this only works if the `function` keyword was used

const findParentFunction = (ref: tsmorph.Node) => {
  let node: tsmorph.Node | undefined = ref;
  while (node && !isFunction(node)) {
    node = node.getParent();
  }
  return node;
};

const tsConfigFilePath = "./tsconfig.json";
const targetFile = "./src/index.ts";
const targetFunction = "getSongs";

const directRefs =
  new tsmorph.Project({ tsConfigFilePath })
    .getSourceFile(targetFile)
    ?.getFunction(targetFunction)
    ?.findReferencesAsNodes() || [];

const allRefs = [...directRefs];

for (const directRef of allRefs) {
  const caller = findParentFunction(directRef);
  if (caller) allRefs.push(...caller.findReferencesAsNodes());
}

const renderCaller = (fctCall: tsmorph.Node) => ({
  file: fctCall.getSourceFile().getFilePath(),
  line: fctCall.getStartLineNumber(),
  callee: fctCall.getText(),
  caller: findParentFunction(fctCall)?.getName() ?? "[top level]",
});

console.log(`callers of ${targetFunction}:`, allRefs.map(renderCaller));
