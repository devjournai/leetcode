/**
 * Validate Stack Sequences
 * Intuition: Simulate the stack: push in given order, and pop whenever the top matches the next required pop.
 * Approach: 1. For each `nextPushValue`, push. 2. While top equals `popped[popOperationsPointer]`, pop and advance. 3. Valid iff the stack is empty at the end.
 * Dry Run: pushed=[1,2,3,4,5], popped=[4,5,3,2,1]. Push to 4, pop 4, push 5, pop 5..1 → empty, true. popped=[4,3,5,1,2] fails (1 before 2).
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
