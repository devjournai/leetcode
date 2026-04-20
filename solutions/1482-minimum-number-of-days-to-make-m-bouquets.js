/**
 * Minimum Number Of Days To Make M Bouquets
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
      (searchRangeStart + searchRangeEnd) / 2,
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
