/**
 * Minimum Number Of Days To Make M Bouquets
 * Intuition: Feasibility is monotonic in the wait day: binary search the day, then greedily count adjacent groups of k flowers bloomed by that day.
 * Approach: 1. If m*k > n return -1. 2. Binary search days in [1, max bloomDay]. 3. Mid day: scan counting consecutive bloomed flowers, forming a bouquet every k. 4. If bouquets >= m, try smaller days; else larger. Return the best mid or -1.
 * Dry Run: bloomDay = [1,10,3,10,2], m = 3, k = 1
 *   - day 3: flowers bloomed except index 1 and 3 -> 3 singles. Return 3.
 * Time Complexity: O(N * log(MaxDay))
 * Space Complexity: O(1)
 */
var minDays = function (bloomDay, m, k) {
  const totalFlowerCount = bloomDay.length;
  const flowersRequiredForBouquets = m * k;

  if (flowersRequiredForBouquets > totalFlowerCount) {
    return -1;
  }

  let searchRangeStart = 1;
  let searchRangeEnd = 0;
  for (const dayEntry of bloomDay) {
    if (dayEntry > searchRangeEnd) {
      searchRangeEnd = dayEntry;
    }
  }

  let finalMinimumDays = -1;

  while (searchRangeStart <= searchRangeEnd) {
    const currentMidpointDay = Math.floor(
      (searchRangeStart + searchRangeEnd) / 2
    );

    let bouquetsAssembled = 0;
    let consecutiveBloomedFlowers = 0;

    for (const flowerBloomTime of bloomDay) {
      if (flowerBloomTime <= currentMidpointDay) {
        consecutiveBloomedFlowers++;
        if (consecutiveBloomedFlowers === k) {
          bouquetsAssembled++;
          consecutiveBloomedFlowers = 0;
        }
      } else {
        consecutiveBloomedFlowers = 0;
      }
    }

    if (bouquetsAssembled >= m) {
      finalMinimumDays = currentMidpointDay;
      searchRangeEnd = currentMidpointDay - 1;
    } else {
      searchRangeStart = currentMidpointDay + 1;
    }
  }

  return finalMinimumDays;
};
