/**
 * Check If Word Is Valid After Substitutions
 * Intuition: Valid strings are built by inserting "abc". Scanning left to right, every "c" must immediately close a pending "ab" on a stack.
 * Approach: 1. Iterate characters. 2. On "c", pop two chars and require they were "a" then "b"; otherwise false. 3. Otherwise push "a" or "b". 4. Valid iff the stack is empty at the end.
 * Dry Run: s = "aabcbc".
 *   - Push a,a,b. Next c pops b then a (ok). Stack [a]. Push b. Next c pops b then a. Stack empty -> true.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var isValid = function (s) {
  const characterStack = [];
  const inputLength = s.length;

  for (let currentIdx = 0; currentIdx < inputLength; currentIdx++) {
    const currentChar = s[currentIdx];

    if (currentChar === "c") {
      if (characterStack.length < 2) {
        return false;
      }
      const secondPoppedChar = characterStack.pop();
      const firstPoppedChar = characterStack.pop();

      if (secondPoppedChar !== "b" || firstPoppedChar !== "a") {
        return false;
      }
    } else {
      characterStack.push(currentChar);
    }
  }

  return characterStack.length === 0;
};
