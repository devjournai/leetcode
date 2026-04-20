/**
 * Validate Stack Sequences
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var validateStackSequences = function (pushed, popped) {
  const simulationStack = [];
  let popOperationsPointer = 0;

  for (const nextPushValue of pushed) {
    simulationStack.push(nextPushValue);

    while (
      simulationStack.length > 0 &&
      simulationStack[simulationStack.length - 1] ===
        popped[popOperationsPointer]
    ) {
      simulationStack.pop();
      popOperationsPointer++;
    }
  }

  return simulationStack.length === 0;
};
