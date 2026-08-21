/**
 * Can I Win
 * Intuition: Integers 1..maxChoosableInteger are used at most once. On a turn you win if you can take a still-free integer ≥ the remaining total, or if some legal pick leaves the opponent with no winning reply. A bitmask of used numbers is memoized so each subset is solved once.
 * Approach: 1. If `desiredTotal <= 0`, return true. 2. If triangular sum `maxChoosableInteger * (maxChoosableInteger + 1) / 2` is below `desiredTotal`, return false. 3. DFS `canCurrentPlayerWin(currentUsedNumbersMask, currentDesiredSum)`: remaining ≤ 0 is a loss. 4. For each unused `nextNumberChoice` (bit `1 << nextNumberChoice`), win immediately when that number ≥ remaining, otherwise recurse; if the opponent’s result is false, cache true and return. 5. If no move works, cache false. Start from mask 0.
 * Dry Run: maxChoosableInteger = 10, desiredTotal = 11.
 *   - Sum 1..10 = 55 ≥ 11, so search.
 *   - No unused pick is ≥ 11, so the first player always subtracts some k in 1..10.
 *   - Opponent then faces remaining 11-k ≤ 10 with 11-k still unused, takes it, and wins.
 *   - Every first move fails → `canCurrentPlayerWin(0, 11)` is false.
 * Time Complexity: O(maxChoosableInteger * 2^maxChoosableInteger)
 * Space Complexity: O(2^maxChoosableInteger)
 */
var canIWin = function (maxChoosableInteger, desiredTotal) {
  const memoizationCache = new Map();

  if (desiredTotal <= 0) {
    return true;
  }

  const totalPossibleSum =
    (maxChoosableInteger * (maxChoosableInteger + 1)) / 2;
  if (totalPossibleSum < desiredTotal) {
    return false;
  }

  const canCurrentPlayerWin = (currentUsedNumbersMask, currentDesiredSum) => {
    if (currentDesiredSum <= 0) {
      return false;
    }

    const cacheKey = currentUsedNumbersMask.toString();
    if (memoizationCache.has(cacheKey)) {
      return memoizationCache.get(cacheKey);
    }

    for (
      let nextNumberChoice = 1;
      nextNumberChoice <= maxChoosableInteger;
      nextNumberChoice++
    ) {
      const numberBit = 1 << nextNumberChoice;
      if (!(currentUsedNumbersMask & numberBit)) {
        if (nextNumberChoice >= currentDesiredSum) {
          memoizationCache.set(cacheKey, true);
          return true;
        }

        const updatedMask = currentUsedNumbersMask | numberBit;
        const newRemainingSum = currentDesiredSum - nextNumberChoice;
        const opponentOutcome = canCurrentPlayerWin(
          updatedMask,
          newRemainingSum
        );

        if (!opponentOutcome) {
          memoizationCache.set(cacheKey, true);
          return true;
        }
      }
    }

    memoizationCache.set(cacheKey, false);
    return false;
  };

  const finalResult = canCurrentPlayerWin(0, desiredTotal);
  return finalResult;
};
