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

const allRefs = [];

type Callable = tsmorph.FunctionDeclaration; // note: this only works if the `function` keyword was used

const isNamedFunction = (node: tsmorph.Node): node is Callable =>
  node instanceof tsmorph.FunctionDeclaration; // note: this only works if the `function` keyword was used

const findParentFunction = (ref: tsmorph.Node) => {
  let node: tsmorph.Node | undefined = ref;
  while (node && !isNamedFunction(node)) {
    node = node.getParent();
    console.debug("getParent", node?.getKindName(), node?.getText());
  }
  return node;
};

for (const directRef of directRefs) {
  allRefs.push(directRef);
  // 1. find the caller (i.e. function that called getSongs), for that direct reference
  const caller = findParentFunction(directRef);
  // 2. push all references to that caller, into allRefs
  if (caller) allRefs.push(...caller.findReferencesAsNodes());
  // 3. then, apply the same process to those references, until they are not referenced anywhere.
  // TODO
}

const renderCaller = (fctCall: tsmorph.Node) => ({
  file: fctCall.getSourceFile().getFilePath(),
  line: fctCall.getStartLineNumber(),
  callee: fctCall.getText(),
  caller: findParentFunction(fctCall)?.getName() ?? "[top level]",
});

console.log(`callers of ${targetFunction}:`, allRefs.map(renderCaller));
