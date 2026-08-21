/**
 * Minimum Number Of Days To Eat N Oranges
 * Intuition: Eating one-by-one to a multiple of 2 or 3 then dividing is optimal; memoize remaining oranges.
 * Approach: 1. dp(x)=x if x≤1. 2. dp(x)=min(x%2+1+dp(x//2), x%3+1+dp(x//3)). 3. Cache.
 * Dry Run: n = 10.
 *   - Eat toward 8 or 9 then divide; minimum days is 4.
 * Time Complexity: O(logN)
 * Space Complexity: O(logN)
 */
var minDays = function (initialQuantity) {
  const calculationCache = new Map();

  const determineMinimumDays = (remainingOranges) => {
    if (remainingOranges <= 1) {
      return remainingOranges;
    }

    const potentialCacheValue = calculationCache.get(remainingOranges);
    if (potentialCacheValue !== undefined) {
      return potentialCacheValue;
    }

    let pathOneDays =
      determineMinimumDays(Math.floor(remainingOranges / 2)) +
      (remainingOranges % 2) +
      1;
    let pathTwoDays =
      determineMinimumDays(Math.floor(remainingOranges / 3)) +
      (remainingOranges % 3) +
      1;

    let finalMinimum = Math.min(pathOneDays, pathTwoDays);
    calculationCache.set(remainingOranges, finalMinimum);
    return finalMinimum;
  };

  return determineMinimumDays(initialQuantity);
};
