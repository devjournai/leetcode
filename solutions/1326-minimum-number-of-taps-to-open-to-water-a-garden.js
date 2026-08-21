/**
 * Minimum Number Of Taps To Open To Water A Garden
 * Intuition: Each tap covers [i-r, i+r]. Compress to the farthest end reachable from each start, then jump-game cover [0,n].
 * Approach: 1. For each tap, set maximumReach[left]=max end. 2. Scan positions, tracking current end and farthest. 3. When the current end is hit, open a tap and jump to farthest. 4. Return tap count or -1 if stuck.
 * Dry Run: n=5, ranges=[3,4,1,1,0,0]. Taps at 0 and 1 cover [0,5] in 1 open.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var minTaps = function (n, ranges) {
  const maximumReachPerPoint = new Array(n + 1).fill(0);

  let indexCounter = 0;
  while (indexCounter <= n) {
    const leftIntervalBound = Math.max(0, indexCounter - ranges[indexCounter]);
    const rightIntervalBound = Math.min(n, indexCounter + ranges[indexCounter]);
    maximumReachPerPoint[leftIntervalBound] = Math.max(
      maximumReachPerPoint[leftIntervalBound],
      rightIntervalBound
    );
    indexCounter++;
  }

  let totalTapsOpened = 0;
  let currentGardenCoverageEnd = 0;
  let furthestPotentialReach = 0;

  for (let positionMarker = 0; positionMarker <= n; positionMarker++) {
    furthestPotentialReach = Math.max(
      furthestPotentialReach,
      maximumReachPerPoint[positionMarker]
    );

    if (positionMarker === currentGardenCoverageEnd) {
      if (positionMarker === n) {
        break;
      }
      if (furthestPotentialReach <= currentGardenCoverageEnd) {
        return -1;
      }
      totalTapsOpened++;
      currentGardenCoverageEnd = furthestPotentialReach;
    }

    if (currentGardenCoverageEnd >= n) {
      break;
    }
  }

  return currentGardenCoverageEnd >= n ? totalTapsOpened : -1;
};
