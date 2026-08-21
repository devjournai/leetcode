/**
 * Permutation Sequence
 * Intuition: The k-th permutation (1-based) can be built with the factorial number system: for remaining digits, the next digit is at index floor((k-1) / (n-1)!), then k is reduced modulo that factorial.
 * Approach: 1. Precompute factorials 0!..(n-1)!. 2. Put digits 1..n in a list; set k = k-1. 3. For remaining slots from n-1 down to 0, take digit at floor(k / fact[slots]), reduce k, splice that digit out, and append it.
 * Dry Run: n = 3, k = 3. Digits [1,2,3], k=2, facts [1,1,2].
 *   - slots=2: index floor(2/2)=1 → take 2, k=0, digits [1,3]. slots=1: index 0 → take 1, then 3. Result "213".
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
var getPermutation = function (n, k) {
  const factorialProducts = [1];
  for (let digitStep = 1; digitStep < n; digitStep++) {
    factorialProducts[digitStep] = factorialProducts[digitStep - 1] * digitStep;
  }

  const availableDigits = new Array(n)
    .fill(0)
    .map((_element, mapIndex) => mapIndex + 1);
  let permutationResult = "";
  let adjustedKth = k - 1;

  for (let remainingSlots = n - 1; remainingSlots >= 0; remainingSlots--) {
    const currentDigitIndex = Math.floor(
      adjustedKth / factorialProducts[remainingSlots]
    );
    adjustedKth %= factorialProducts[remainingSlots];
    permutationResult += availableDigits[currentDigitIndex];
    availableDigits.splice(currentDigitIndex, 1);
  }

  return permutationResult;
};
