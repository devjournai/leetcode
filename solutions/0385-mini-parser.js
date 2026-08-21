/**
 * Mini Parser
 * Intuition: A NestedInteger is either a lone integer or a bracketed list of NestedIntegers, so a stack of list objects can parse nested `[` / `]` while scanning numbers (including a leading `-`).
 * Approach: 1. If s does not start with `[`, wrap parseInt(s) in a NestedInteger. 2. On `[`, create a list, add it to the parent if the stack is nonempty, push it, and remember the first list as the result. 3. On `]` pop; skip commas. 4. Otherwise parse an optional minus plus digits, wrap, and add to the current parent.
 * Dry Run: "[123,[456,[789]]]". Push outer, add 123, push inner add 456, push inner add 789, three pops → NestedInteger list 123 / [456 / [789]].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var deserialize = function (s) {
  if (s[0] !== "[") {
    const finalValue = parseInt(s);
    const singleItem = new NestedInteger();
    singleItem.setInteger(finalValue);
    return singleItem;
  }

  const objectStack = [];
  let currentPosition = 0;
  let primaryResult;

  while (currentPosition < s.length) {
    const currentCharacter = s[currentPosition];

    if (currentCharacter === "[") {
      const newListInstance = new NestedInteger();
      if (objectStack.length > 0) {
        const containingList = objectStack[objectStack.length - 1];
        containingList.add(newListInstance);
      }
      objectStack.push(newListInstance);
      if (!primaryResult) {
        primaryResult = newListInstance;
      }
      currentPosition++;
    } else if (currentCharacter === "]") {
      objectStack.pop();
      currentPosition++;
    } else if (currentCharacter === ",") {
      currentPosition++;
    } else {
      let numberStart = currentPosition;
      if (currentCharacter === "-") {
        currentPosition++;
      }
      while (
        currentPosition < s.length &&
        s[currentPosition] >= "0" &&
        s[currentPosition] <= "9"
      ) {
        currentPosition++;
      }
      const numericSegment = s.substring(numberStart, currentPosition);
      const parsedInteger = parseInt(numericSegment);

      const integerWrapper = new NestedInteger();
      integerWrapper.setInteger(parsedInteger);

      if (objectStack.length > 0) {
        const activeParent = objectStack[objectStack.length - 1];
        activeParent.add(integerWrapper);
      }
    }
  }

  return primaryResult;
};
