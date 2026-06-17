/**
 * Process String with Special Operations II
 * Intuition: The final string can be extremely long (10^15 characters), making it impossible to store explicitly. The index `k` can also be very large. This indicates that a simulation approach building the string is not viable. Instead, we need to record the operations in a way that allows us to "backtrack" `k` through the history of transformations.
 * Approach:
 * 1. Forward Pass: Iterate through the input string `s` from left to right. Maintain `currentLength` (as a BigInt) and two lists: `charHistory` to store actual characters appended, and `opHistory` to store the sequence of transformations.
 *    - For lowercase letters: Increment `currentLength`, store the character in `charHistory`, and push a `{type: 'literal', charIndex: ...}` entry to `opHistory`.
 *    - For '*': If `currentLength > 0`, decrement `currentLength` and push a `{type: 'remove'}` entry to `opHistory`.
 *    - For '#': Double `currentLength` and push a `{type: 'duplicate'}` entry to `opHistory`.
 *    - For '%': Push a `{type: 'reverse'}` entry to `opHistory`. `currentLength` remains unchanged.
 * 2. Backtracking Query: After processing all of `s`, we have the `finalLength` (stored in `currentLength`) and `opHistory`. We need to find the character at index `k`.
 *    - First, check if `k` is out of bounds (`k >= finalLength` or `k < 0`). If so, return '.'.
 *    - Initialize `currentK` with `k` and `currentSegmentLength` with `finalLength`. These variables will represent the target index and the length of the string segment we are currently "looking into" as we undo operations.
 *    - Iterate `opHistory` backwards from the last operation to the first. For each operation:
 *        - If `op.type` is 'literal': If `currentK` is the last character of the current segment (`currentK === currentSegmentLength - 1n`), then this is the character we are looking for. Return `charHistory[op.charIndex]`. Otherwise, `currentK` refers to a character before this literal was appended; conceptually remove the literal by decrementing `currentSegmentLength`.
 *        - If `op.type` is 'remove': This operation reduced the segment length. To "undo" it, increment `currentSegmentLength`. `currentK` remains the same relative to the now-longer string.
 *        - If `op.type` is 'reverse': If `currentSegmentLength > 0`, `currentK` maps to `currentSegmentLength - 1n - currentK` in the unreversed string. `currentSegmentLength` remains the same. Handle `currentSegmentLength === 0n` to prevent `RangeError`.
 *        - If `op.type` is 'duplicate': If `currentSegmentLength > 0`, `currentK` maps to `currentK % (currentSegmentLength / 2n)` in the original string that was duplicated. Update `currentSegmentLength` to `currentSegmentLength / 2n`. Handle `currentSegmentLength === 0n` to prevent `RangeError`.
 *    - If the loop finishes without returning (which theoretically shouldn't happen if `k` was initially in bounds and `charHistory` covers all literal appends), it implies `k` couldn't be resolved, which could be an error or an edge case not fully considered. For this problem, it should always resolve to a character if `k` is in bounds.
 * Dry Run: See detailed trace in thought process.
 * Time Complexity: O(S)
 * Space Complexity: O(S)
 */
var processStr = function (s, k) {
  let currentLength = 0n;
  const opHistory = [];
  const charHistory = [];

  k = BigInt(k);

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char >= "a" && char <= "z") {
      currentLength++;
      charHistory.push(char);
      opHistory.push({ type: "literal", charIndex: charHistory.length - 1 });
    } else if (char === "*") {
      if (currentLength > 0n) {
        currentLength--;
        opHistory.push({ type: "remove" });
      }
    } else if (char === "#") {
      currentLength *= 2n;
      opHistory.push({ type: "duplicate" });
    } else if (char === "%") {
      opHistory.push({ type: "reverse" });
    }
  }

  if (k >= currentLength || k < 0n) {
    return ".";
  }

  let currentK = k;
  let currentSegmentLength = currentLength;

  for (let i = opHistory.length - 1; i >= 0; i--) {
    const op = opHistory[i];

    if (op.type === "literal") {
      if (currentK === currentSegmentLength - 1n) {
        return charHistory[op.charIndex];
      } else {
        currentSegmentLength--;
      }
    } else if (op.type === "remove") {
      currentSegmentLength++;
    } else if (op.type === "reverse") {
      if (currentSegmentLength > 0n) {
        currentK = currentSegmentLength - 1n - currentK;
      }
    } else if (op.type === "duplicate") {
      if (currentSegmentLength > 0n) {
        currentK = currentK % (currentSegmentLength / 2n);
        currentSegmentLength = currentSegmentLength / 2n;
      }
    }
  }

  return ".";
};
