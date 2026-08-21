/**
 * Remove Duplicate Letters
 * Intuition: The smallest subsequence of unique letters is a greedy stack: drop a larger letter already on the stack if it still appears later, and never add a letter twice.
 * Approach: 1. Record each character's last index. 2. Scan left to right; skip letters already in the result set. 3. While the stack top is greater than the current letter and that top still occurs later, pop it and unmark it. 4. Push the current letter; join the stack.
 * Dry Run: s = "bcabc".
 *   - Last indices: b=3, c=4, a=2. Push b, then c.
 *   - At a, pop c and b (both recur later), then push a, b, c → "abc".
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var removeDuplicateLetters = function (s) {
  const characterLastIndices = new Map();
  for (let currentPosition = 0; currentPosition < s.length; currentPosition++) {
    characterLastIndices.set(s[currentPosition], currentPosition);
  }

  const outputStack = [];
  const addedChars = new Set();

  for (let stringIterator = 0; stringIterator < s.length; stringIterator++) {
    const charFromSource = s[stringIterator];

    if (addedChars.has(charFromSource)) {
      continue;
    }

    while (
      outputStack.length > 0 &&
      outputStack[outputStack.length - 1] > charFromSource &&
      characterLastIndices.get(outputStack[outputStack.length - 1]) >
        stringIterator
    ) {
      const poppedElement = outputStack.pop();
      addedChars.delete(poppedElement);
    }

    outputStack.push(charFromSource);
    addedChars.add(charFromSource);
  }

  return outputStack.join("");
};
