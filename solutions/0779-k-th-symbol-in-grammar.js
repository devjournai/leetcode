/**
 * K Th Symbol In Grammar
 * Intuition: Row n is row n-1 plus its complement. Position k in the right half of row n is the flipped bit from position k-mid of row n-1. Count how many times k sits in a right half; parity of that count is the bit.
 * Approach: 1. While `currentGrammarLevel > 1`, `symbolsInCurrentRow = 1 << (level-1)`, `middlePoint` is half. 2. If `currentSymbolPosition > middlePoint`, increment `inversionCount` and subtract `middlePoint`. 3. Decrement level. 4. Return 0 if `inversionCount` is even else 1.
 * Dry Run: n = 4, k = 5.
 *   - Row size 8, mid 4; 5>4 → invert, k=1, n=3.
 *   - Size 4, mid 2; 1≤2, n=2. Size 2, mid 1; 1≤1, n=1. inversions=1 → return 1.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var kthGrammar = function (n, k) {
  let inversionCount = 0;

  let currentGrammarLevel = n;
  let currentSymbolPosition = k;

  while (currentGrammarLevel > 1) {
    const symbolsInCurrentRow = 1 << (currentGrammarLevel - 1);
    const middlePoint = symbolsInCurrentRow / 2;

    if (currentSymbolPosition > middlePoint) {
      inversionCount++;
      currentSymbolPosition -= middlePoint;
    }

    currentGrammarLevel--;
  }

  if (inversionCount % 2 === 0) {
    return 0;
  } else {
    return 1;
  }
};
