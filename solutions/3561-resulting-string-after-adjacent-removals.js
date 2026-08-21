/**
 * Resulting String After Adjacent Removals
 * Intuition: Adjacent consecutive letters (including a/z) cancel. A stack simulates the remaining string after all cancellations.
 * Approach: 1. Scan left to right. 2. If the stack top and the current char differ by 1 or 25, pop. 3. Otherwise push. 4. Join the stack.
 * Dry Run: s = "abc". Push a. b is consecutive with a → pop. Push c. Result "c".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var resultingString = function (s) {
  const stack = [];

  const isConsecutive = (a, b) => {
    const diff = Math.abs(a.charCodeAt(0) - b.charCodeAt(0));
    return diff === 1 || diff === 25;
  };

  for (const char of s) {
    if (stack.length && isConsecutive(stack[stack.length - 1], char)) {
      stack.pop();
    } else {
      stack.push(char);
    }
  }

  return stack.join("");
};
