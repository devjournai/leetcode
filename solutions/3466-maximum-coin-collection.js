/**
 * Maximum Coin Collection
 * Intuition: Ride a contiguous stretch of miles, starting on either lane, with at most two switches: lane1 → lane2 → lane1. DP at each mile tracks coins with 0, 1, or 2 switches so far, and we may start a new ride (reset to 0 before adding this mile) on the first two states.
 * Approach: 1. `zeroSwitches` = stay on lane1. 2. `oneSwitch` = be on lane2 after at most one switch (or start on lane2). 3. `twoSwitches` = back on lane1 after using lane2. 4. Take the max over all miles and states.
 * Dry Run: lane1 = [1,-5,3], lane2 = [2,-1,4]. Start on lane2 (2), stay or switch; best path can collect 2 + 4 or mix with lane1’s 3 after a second switch.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxCoins = function (lane1, lane2) {
  let zeroSwitches = lane1[0];
  let oneSwitch = lane2[0];
  let twoSwitches = Number.NEGATIVE_INFINITY;
  let bestCoins = Math.max(zeroSwitches, oneSwitch);

  for (let mile = 1; mile < lane1.length; mile++) {
    const nextZero = Math.max(0, zeroSwitches) + lane1[mile];
    const nextOne = Math.max(0, zeroSwitches, oneSwitch) + lane2[mile];
    const nextTwo = Math.max(oneSwitch, twoSwitches) + lane1[mile];
    zeroSwitches = nextZero;
    oneSwitch = nextOne;
    twoSwitches = nextTwo;
    bestCoins = Math.max(bestCoins, zeroSwitches, oneSwitch, twoSwitches);
  }

  return bestCoins;
};
