/**
 * Smallest String With A Given Numeric Value
 * Intuition: Greedy lex-smallest string of length n summing to k: fill with 'a', then from the right raise letters toward 'z' until the leftover sum is spent.
 * Approach: 1. Start with n copies of 'a' (cost n). 2. leftover = k-n. 3. From the last index, add min(25, leftover) to the char and subtract. 4. Join the array.
 * Dry Run: n=3, k=27.
 *   - "aaa" leftover 24 → last becomes 'y' → "aay".
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var getSmallestString = function (n, k) {
  const asciiOfA = 97;
  const maxPossibleIncrease = 25;

  const stringBuilder = new Array(n).fill(String.fromCharCode(asciiOfA));
  let remainingRequiredSum = k - n;

  for (
    let currentForwardIndex = 0;
    currentForwardIndex < n && remainingRequiredSum > 0;
    currentForwardIndex++
  ) {
    const actualStringIndex = n - 1 - currentForwardIndex;

    const currentIncrease = Math.min(maxPossibleIncrease, remainingRequiredSum);
    stringBuilder[actualStringIndex] = String.fromCharCode(
      asciiOfA + currentIncrease
    );
    remainingRequiredSum -= currentIncrease;
  }

  return stringBuilder.join("");
};
