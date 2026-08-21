/**
 * Guess Number Higher Or Lower
 * Intuition: The pick lies in [1, n]; `guess(mid)` tells us whether to shrink the high side, the low side, or stop, so binary search finds it.
 * Approach: 1. low = 1, high = n. 2. mid = floor(low + (high-low)/2). 3. feedback 0 returns mid; -1 sets high = mid-1; else low = mid+1.
 * Dry Run: n = 10, pick = 6. mid 5 → guess +1 so low=6; mid 8 → -1 high=7; mid 6 → 0 return 6.
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
var guessNumber = function (n) {
  let minimumPossible = 1;
  let maximumPossible = n;

  while (minimumPossible <= maximumPossible) {
    const trialNumber = Math.floor(
      minimumPossible + (maximumPossible - minimumPossible) / 2
    );
    const feedback = guess(trialNumber);

    if (feedback === 0) {
      return trialNumber;
    } else if (feedback === -1) {
      maximumPossible = trialNumber - 1;
    } else {
      minimumPossible = trialNumber + 1;
    }
  }
};
