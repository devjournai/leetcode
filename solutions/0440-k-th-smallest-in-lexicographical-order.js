/**
 * K Th Smallest In Lexicographical Order
 * Intuition: Denary-tree order: from prefix `p`, either skip the whole subtree of numbers with that prefix (move to `p+1`) or step into `p*10` (next lex child). Count how many integers ≤ n sit under a prefix.
 * Approach: 1. Start `lexicalTarget=1`, `remainingSteps=k-1`. 2. Count nodes under `[lexicalTarget, lexicalTarget+1)` by stretching both bounds ×10 until past n. 3. If that count ≤ remaining, increment prefix and subtract; else go `*10` and spend one step. 4. Return `lexicalTarget`.
 * Dry Run: n=13, k=2. Prefix 1 covers 1,10-13 (5). 5>1 so go to 10, remaining 0. Return 10.
 * Time Complexity: O((log N)^2)
 * Space Complexity: O(1)
 */
var findKthNumber = function (n, k) {
  let lexicalTarget = 1;
  let remainingSteps = k - 1;

  while (remainingSteps > 0) {
    let currentPrefixCount = 0;
    let initialRangeBoundary = lexicalTarget;
    let finalRangeBoundary = lexicalTarget + 1;

    while (initialRangeBoundary <= n) {
      currentPrefixCount +=
        Math.min(n + 1, finalRangeBoundary) - initialRangeBoundary;

      if (initialRangeBoundary > Math.floor(n / 10)) {
        break;
      }
      initialRangeBoundary *= 10;
      finalRangeBoundary *= 10;
    }

    if (currentPrefixCount <= remainingSteps) {
      lexicalTarget++;
      remainingSteps -= currentPrefixCount;
    } else {
      lexicalTarget *= 10;
      remainingSteps--;
    }
  }

  return lexicalTarget;
};
