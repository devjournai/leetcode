/**
 * House Robber
 * Intuition: Adjacent houses cannot both be robbed. Track the best total skipping the previous house vs using it, rolling two scalars instead of a DP array.
 * Approach: 1. prev2 = 0 (two houses ago), prev1 = 0 (one ago). 2. For each house: rob = value + prev2, skip = prev1, take max. 3. Shift prev2 ← prev1, prev1 ← max. 4. Return prev1.
 * Dry Run: nums = [1,2,3,1].
 *   - house 1: max(1+0, 0)=1; prev2=0, prev1=1.
 *   - house 2: max(2+0, 1)=2; prev2=1, prev1=2.
 *   - house 3: max(3+1, 2)=4; prev2=2, prev1=4.
 *   - house 1: max(1+2, 4)=4. Return 4.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var rob = function (nums) {
  let maxMoneyFromTwoHousesAgo = 0;
  let maxMoneyFromOneHouseAgo = 0;

  for (const currentHouseValue of nums) {
    let amountIfRobbedCurrent = currentHouseValue + maxMoneyFromTwoHousesAgo;
    let amountIfSkippedCurrent = maxMoneyFromOneHouseAgo;

    let currentMaxAchieved = Math.max(
      amountIfRobbedCurrent,
      amountIfSkippedCurrent
    );

    maxMoneyFromTwoHousesAgo = maxMoneyFromOneHouseAgo;
    maxMoneyFromOneHouseAgo = currentMaxAchieved;
  }

  return maxMoneyFromOneHouseAgo;
};
