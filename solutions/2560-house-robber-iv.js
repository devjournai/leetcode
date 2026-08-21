/**
 * House Robber Iv
 * Intuition: The problem asks for the minimum possible "maximum amount of money stolen from one house" such that we can rob at least `k` non-adjacent houses. This structure (finding the minimum value `X` that satisfies a condition) is a classic indicator for binary search on the answer. The possible range for this maximum amount (capability) is from the minimum to the maximum value in the `nums` array.
 * Approach: 1. Define a search space for the "capability" (the maximum money allowed per house). This range will be from the minimum house value to the maximum house value in the `nums` array.
 * 2. Perform a binary search within this capability range. For each `mid` value (representing a candidate capability), we need to check if it's possible to rob at least `k` houses, ensuring no two robbed houses are adjacent and all robbed houses have values less than or equal to `mid`.
 * 3. Implement a helper function `checkRobbingFeasibility` that takes `nums`, `mid` (current capability), and `k` (minimum required houses) as arguments. This function iterates through `nums` greedily: if a house `nums[i]` can be robbed (i.e., `nums[i] <= mid`), we rob it, increment our count, and then skip the next house (`i += 2`) because it's adjacent. Otherwise, if the house cannot be robbed, we simply move to the next house (`i++`).
 * 4. Based on the result of `checkRobbingFeasibility`:
 *    - If `true` (we *can* rob `k` houses with `mid` capability), it means `mid` is a possible answer, and we might be able to do even better (lower capability). So, we try the lower half: `right = mid`.
 *    - If `false` (we *cannot* rob `k` houses with `mid` capability), it means `mid` is too low. We need a higher capability. So, we try the upper half: `left = mid + 1`.
 * 5. The binary search continues until `left` equals `right`. This value will be the minimum capability required.
 * Dry Run: nums = [2, 3, 5, 9], k = 2
 * 1. Initialize capability search space: `capabilityMinRange = 2`, `capabilityMaxRange = 9`.
 * 2. Iteration 1:
 *    - `currentCandidateCapability = floor((2 + 9) / 2) = 5`.
 *    - Call `checkRobbingFeasibility([2, 3, 5, 9], 5, 2)`:
 *      - `currentIndex = 0`, `stolenHousesCount = 0`.
 *      - `houseValuations[0] = 2 <= 5`: `stolenHousesCount = 1`, `currentIndex = 2`.
 *      - `houseValuations[2] = 5 <= 5`: `stolenHousesCount = 2`, `currentIndex = 4`.
 *      - Loop ends. `stolenHousesCount = 2 >= targetHousesToSteal = 2`. Returns `true`.
 *    - Since `checkRobbingFeasibility` returned `true`, `capabilityMaxRange = currentCandidateCapability = 5`.
 *    - `capabilityMinRange = 2`, `capabilityMaxRange = 5`.
 * 3. Iteration 2:
 *    - `currentCandidateCapability = floor((2 + 5) / 2) = 3`.
 *    - Call `checkRobbingFeasibility([2, 3, 5, 9], 3, 2)`:
 *      - `currentIndex = 0`, `stolenHousesCount = 0`.
 *      - `houseValuations[0] = 2 <= 3`: `stolenHousesCount = 1`, `currentIndex = 2`.
 *      - `houseValuations[2] = 5 > 3`: `currentIndex = 3`.
 *      - `houseValuations[3] = 9 > 3`: `currentIndex = 4`.
 *      - Loop ends. `stolenHousesCount = 1 < targetHousesToSteal = 2`. Returns `false`.
 *    - Since `checkRobbingFeasibility` returned `false`, `capabilityMinRange = currentCandidateCapability + 1 = 3 + 1 = 4`.
 *    - `capabilityMinRange = 4`, `capabilityMaxRange = 5`.
 * 4. Iteration 3:
 *    - `currentCandidateCapability = floor((4 + 5) / 2) = 4`.
 *    - Call `checkRobbingFeasibility([2, 3, 5, 9], 4, 2)`:
 *      - `currentIndex = 0`, `stolenHousesCount = 0`.
 *      - `houseValuations[0] = 2 <= 4`: `stolenHousesCount = 1`, `currentIndex = 2`.
 *      - `houseValuations[2] = 5 > 4`: `currentIndex = 3`.
 *      - `houseValuations[3] = 9 > 4`: `currentIndex = 4`.
 *      - Loop ends. `stolenHousesCount = 1 < targetHousesToSteal = 2`. Returns `false`.
 *    - Since `checkRobbingFeasibility` returned `false`, `capabilityMinRange = currentCandidateCapability + 1 = 4 + 1 = 5`.
 *    - `capabilityMinRange = 5`, `capabilityMaxRange = 5`.
 * 5. Loop terminates as `capabilityMinRange` is not less than `capabilityMaxRange`.
 * 6. Return `capabilityMinRange` which is 5.
 * Time Complexity: O(N * log(MaxVal - MinVal))
 * Space Complexity: O(1)
 */
var minCapability = function (numsArray, minimumHousesToRob) {
  let capabilityMinRange = Math.min(...numsArray);
  let capabilityMaxRange = Math.max(...numsArray);

  while (capabilityMinRange < capabilityMaxRange) {
    const currentCandidateCapability = Math.floor(
      (capabilityMinRange + capabilityMaxRange) / 2
    );

    if (
      checkRobbingFeasibility(
        numsArray,
        currentCandidateCapability,
        minimumHousesToRob
      )
    ) {
      capabilityMaxRange = currentCandidateCapability;
    } else {
      capabilityMinRange = currentCandidateCapability + 1;
    }
  }

  return capabilityMinRange;
};

function checkRobbingFeasibility(
  houseValuations,
  maxAllowedCapability,
  targetHousesToSteal
) {
  let stolenHousesCount = 0;
  let currentIndex = 0;

  while (currentIndex < houseValuations.length) {
    if (houseValuations[currentIndex] <= maxAllowedCapability) {
      stolenHousesCount++;
      currentIndex += 2;
    } else {
      currentIndex++;
    }
  }

  return stolenHousesCount >= targetHousesToSteal;
}
