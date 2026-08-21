/**
 * Koko Eating Bananas
 * Intuition: Hours needed is nonincreasing in speed, so binary-search the smallest `candidateSpeed` in `[1, max pile]` such that `sum(ceil(pile/speed)) <= h`.
 * Approach: 1. `calculateHoursRequired` sums `Math.ceil(pileContent / currentSpeed)`. 2. Set `lowestPossibleSpeed = 1`, `highestPossibleSpeed = max pile`, `resultMinimumSpeed` initially that max. 3. While low ≤ high, mid = floor((low+high)/2); if hours(mid) ≤ h, record mid and search left, else search right. 4. Return `resultMinimumSpeed`.
 * Dry Run: piles = [3, 6, 7, 11], h = 8.
 *   - Max speed 11. Mid 6: hours 1+1+2+2=6 ≤ 8 → try lower. Mid 4: 1+2+2+3=8 ≤ 8. Mid 3: 1+2+3+4=10 > 8. Answer 4.
 * Time Complexity: O(N * log(M))
 * Space Complexity: O(1)
 */
var minEatingSpeed = function (piles, h) {
  const calculateHoursRequired = (currentSpeed) => {
    let accumulatedHours = 0;
    for (let pileContent of piles) {
      accumulatedHours += Math.ceil(pileContent / currentSpeed);
    }
    return accumulatedHours;
  };

  let lowestPossibleSpeed = 1;
  let highestPossibleSpeed = 0;
  for (let currentPileAmount of piles) {
    if (currentPileAmount > highestPossibleSpeed) {
      highestPossibleSpeed = currentPileAmount;
    }
  }

  let resultMinimumSpeed = highestPossibleSpeed;

  while (lowestPossibleSpeed <= highestPossibleSpeed) {
    const candidateSpeed = Math.floor(
      (lowestPossibleSpeed + highestPossibleSpeed) / 2
    );

    if (calculateHoursRequired(candidateSpeed) <= h) {
      resultMinimumSpeed = candidateSpeed;
      highestPossibleSpeed = candidateSpeed - 1;
    } else {
      lowestPossibleSpeed = candidateSpeed + 1;
    }
  }

  return resultMinimumSpeed;
};
