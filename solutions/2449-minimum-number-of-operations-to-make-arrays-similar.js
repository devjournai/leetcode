/**
 * Minimum Number Of Operations To Make Arrays Similar
 * Intuition: Operations preserve element parity, so even numbers can only become even, and odd numbers can only become odd. This means we can treat even and odd numbers independently. To minimize operations, sort both the numbers from `nums` and `target` within their respective parity groups (even/odd) and pair them up. Each "+2" operation must be balanced by a "-2" operation. Thus, the total operations needed is the sum of all necessary increments (or decrements) divided by 2.
 * Approach: 1. Separate `nums` into `evenNumsArr` and `oddNumsArr`, then sort both. 2. Separate `target` into `evenTargetArr` and `oddTargetArr`, then sort both. 3. Initialize a `totalOperationsCount` to zero. 4. Iterate through `evenNumsArr` and `evenTargetArr` simultaneously. If an element in `evenNumsArr` is smaller than its corresponding element in `evenTargetArr`, add the difference divided by 2 to `totalOperationsCount`. 5. Perform the same iteration and calculation for `oddNumsArr` and `oddTargetArr`. 6. Return `totalOperationsCount`.
 * Dry Run: nums = [8,12,6], target = [2,10,14]
 * 1. numsEvenFiltered = [6,8,12] (sorted from [8,12,6])
 * 2. numsOddFiltered = []
 * 3. targetEvenFiltered = [2,10,14] (sorted from [2,10,14])
 * 4. targetOddFiltered = []
 * 5. operationsTotal = 0
 * 6. Even numbers processing:
 *    - currentEvenIdx = 0: numEvenVal = 6, targetEvenVal = 2. 6 < 2 is false. operationsTotal remains 0.
 *    - currentEvenIdx = 1: numEvenVal = 8, targetEvenVal = 10. 8 < 10 is true. operationsTotal += (10 - 8) / 2 = 1. operationsTotal = 1.
 *    - currentEvenIdx = 2: numEvenVal = 12, targetEvenVal = 14. 12 < 14 is true. operationsTotal += (14 - 12) / 2 = 1. operationsTotal = 1 + 1 = 2.
 *    Loop ends.
 * 7. Odd numbers processing:
 *    - numsOddFiltered.length is 0. Loop does not run.
 * 8. Return operationsTotal = 2.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var makeSimilar = function (nums, target) {
  const numsEvenFiltered = nums.filter((singleNum) => singleNum % 2 === 0);
  numsEvenFiltered.sort((valA, valB) => valA - valB);

  const numsOddFiltered = nums.filter(
    (singleNumValue) => singleNumValue % 2 !== 0
  );
  numsOddFiltered.sort((valC, valD) => valC - valD);

  const targetEvenFiltered = target.filter((targetNum) => targetNum % 2 === 0);
  targetEvenFiltered.sort((valE, valF) => valE - valF);

  const targetOddFiltered = target.filter(
    (targetNumValue) => targetNumValue % 2 !== 0
  );
  targetOddFiltered.sort((valG, valH) => valG - valH);

  let operationsTotal = 0;

  for (
    let currentEvenIdx = 0;
    currentEvenIdx < numsEvenFiltered.length;
    currentEvenIdx++
  ) {
    const numEvenVal = numsEvenFiltered[currentEvenIdx];
    const targetEvenVal = targetEvenFiltered[currentEvenIdx];
    if (numEvenVal < targetEvenVal) {
      operationsTotal += (targetEvenVal - numEvenVal) / 2;
    }
  }

  for (
    let currentOddIdx = 0;
    currentOddIdx < numsOddFiltered.length;
    currentOddIdx++
  ) {
    const numOddVal = numsOddFiltered[currentOddIdx];
    const targetOddVal = targetOddFiltered[currentOddIdx];
    if (numOddVal < targetOddVal) {
      operationsTotal += (targetOddVal - numOddVal) / 2;
    }
  }

  return operationsTotal;
};
