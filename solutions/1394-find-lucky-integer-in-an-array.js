/**
 * Find Lucky Integer In An Array
 * Intuition: A lucky integer equals its frequency. Count frequencies and scan from large to small so the first hit is the maximum.
 * Approach: 1. Count values in a 501-slot array. 2. For candidate from 500 down to 1, if count[candidate] === candidate, return it. 3. Otherwise return -1.
 * Dry Run: arr = [2,2,3,4].
 *   - Counts: 2→2 (lucky), 3→1, 4→1. Scanning 500..1 hits 2 first among luckies. Return 2.
 * Time Complexity: O(N + M)
 * Space Complexity: O(M)
 */
var findLucky = function (arr) {
  const numberCounts = new Array(501).fill(0);

  for (const numberValue of arr) {
    numberCounts[numberValue]++;
  }

  let greatestLuckyInteger = -1;

  for (let currentCandidate = 500; currentCandidate >= 1; currentCandidate--) {
    const currentCount = numberCounts[currentCandidate];
    if (currentCandidate === currentCount) {
      greatestLuckyInteger = currentCandidate;
      break;
    }
  }

  return greatestLuckyInteger;
};
