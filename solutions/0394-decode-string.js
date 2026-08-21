/**
 * Decode String
 * Intuition: Nested `k[encoded]` blocks are a recursive grammar. `parseSegment` consumes from a shared `stringPointer` and returns the decoded chunk for the current nesting level.
 * Approach: 1. Digits accumulate `currentMultiplier`. 2. On `[`, recurse, then append `nestedContent.repeat(currentMultiplier)` and reset the multiplier. 3. On `]` return the current build. 4. Other characters append as-is. 5. Top-level call starts at index 0.
 * Dry Run: s = "3[a2[c]]".
 *   - multiplier 3, `[` → inner: `a`, multiplier 2, `[` → `c`, `]` → "cc"; repeat → "acc"; `]` → "accaccacc".
 * Time Complexity: O(M)
 * Space Complexity: O(M + N)
 */
var decodeString = function (s) {
  const stringPointer = { value: 0 };

  const parseSegment = (inputStr, currentIdx) => {
    let currentBuild = "";
    let currentMultiplier = 0;

    while (currentIdx.value < inputStr.length) {
      const charUnit = inputStr[currentIdx.value];

      if (charUnit >= "0" && charUnit <= "9") {
        currentMultiplier = currentMultiplier * 10 + Number(charUnit);
      } else if (charUnit === "[") {
        currentIdx.value++;
        const nestedContent = parseSegment(inputStr, currentIdx);
        currentBuild += nestedContent.repeat(currentMultiplier);
        currentMultiplier = 0;
      } else if (charUnit === "]") {
        return currentBuild;
      } else {
        currentBuild += charUnit;
      }
      currentIdx.value++;
    }
    return currentBuild;
  };

  return parseSegment(s, stringPointer);
};
