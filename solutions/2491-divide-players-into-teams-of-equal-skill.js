/**
 * Divide Players Into Teams Of Equal Skill
 * Intuition: To ensure all teams have an equal total skill, if we sort the players by skill, the player with the lowest skill must be paired with the player with the highest skill to achieve the target sum. This target sum then becomes the benchmark for all other pairs.
 * Approach: 1. Sort the input `skill` array in ascending order. 2. Calculate the `initialTeamSum` by pairing the smallest skill (`skill[0]`) with the largest skill (`skill[skill.length - 1]`). This sum is the target for all teams. 3. Initialize `accumulatedChemistry` to zero. 4. Use two pointers, `leftBound` starting at the beginning and `rightBound` starting at the end of the sorted array. 5. Iterate inwards, forming pairs: for each pair (`skill[leftBound]`, `skill[rightBound]`), check if their sum equals `initialTeamSum`. If not, return -1 as it's impossible to form teams. If they do, add their product to `accumulatedChemistry`. 6. Advance `leftBound` and decrement `rightBound`. 7. After iterating through all pairs, return `accumulatedChemistry`.
 * Dry Run: skill = [3, 4, 1, 2]
 * 1. `skill.sort()` results in `skill = [1, 2, 3, 4]`.
 * 2. `arrayLength` = 4.
 * 3. `initialTeamSum = skill[0] + skill[arrayLength - 1] = 1 + 4 = 5`.
 * 4. `accumulatedChemistry = 0`.
 * 5. `leftBound = 0`, `rightBound = 3`.
 * Loop 1: `leftBound` (0) < `rightBound` (3) is true.
 *    `currentPairSum = skill[0] + skill[3] = 1 + 4 = 5`.
 *    `currentPairSum` (5) === `initialTeamSum` (5) is true.
 *    `accumulatedChemistry += skill[0] * skill[3] = 1 * 4 = 4`. `accumulatedChemistry` is now 4.
 *    `leftBound` becomes 1, `rightBound` becomes 2.
 * Loop 2: `leftBound` (1) < `rightBound` (2) is true.
 *    `currentPairSum = skill[1] + skill[2] = 2 + 3 = 5`.
 *    `currentPairSum` (5) === `initialTeamSum` (5) is true.
 *    `accumulatedChemistry += skill[1] * skill[2] = 2 * 3 = 6`. `accumulatedChemistry` is now 4 + 6 = 10.
 *    `leftBound` becomes 2, `rightBound` becomes 1.
 * Loop 3: `leftBound` (2) < `rightBound` (1) is false. Loop terminates.
 * 6. Return `accumulatedChemistry` (10).
 * Time Complexity: O(N log N)
 * Space Complexity: O(log N)
 */
var dividePlayers = function (skill) {
  skill.sort((comparisonA, comparisonB) => comparisonA - comparisonB);

  const arrayLength = skill.length;
  const initialTeamSum = skill[0] + skill[arrayLength - 1];
  let accumulatedChemistry = 0;

  let leftBound = 0;
  let rightBound = arrayLength - 1;

  while (leftBound < rightBound) {
    const currentPairSum = skill[leftBound] + skill[rightBound];
    if (currentPairSum !== initialTeamSum) {
      return -1;
    }
    accumulatedChemistry += skill[leftBound] * skill[rightBound];
    leftBound++;
    rightBound--;
  }

  return accumulatedChemistry;
};
