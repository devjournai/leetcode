/**
* Maximum Sum With Exactly K Elements
* Intuition: To maximize the sum, we should always pick the largest available number. Since picking an element 'm' replaces it with 'm+1', continuously picking the largest available element will always result in picking the initial maximum, then initial_maximum + 1, then initial_maximum + 2, and so on, for 'k' operations.
* Approach: 1. Identify the maximum value in the initial `nums` array. Let this be `initialMaximumValue`. 2. The `k` operations will involve picking `initialMaximumValue`, then `initialMaximumValue + 1`, then `initialMaximumValue + 2`, up to `initialMaximumValue + (k - 1)`. 3. Calculate the sum of this arithmetic progression using the formula for the sum of an arithmetic series: `k * initialMaximumValue + k * (k - 1) / 2`. 4. Return this calculated sum as the maximum score.
* Dry Run: nums = [1,2,3,4,5], k = 3
        1. `initialMaximumValue` = Math.max(...[1,2,3,4,5]) = 5.
        2. `numberOfOperations` = 3.
        3. The sum of the `k` elements chosen will be:
           - Operation 1: Pick 5, score increases by 5. (Conceptually, `nums` now contains 6).
           - Operation 2: Pick 5 + 1 = 6, score increases by 6. (Conceptually, `nums` now contains 7).
           - Operation 3: Pick 5 + 2 = 7, score increases by 7.
        4. Total sum = 5 + 6 + 7 = 18.
        5. Using the formula: `3 * 5 + 3 * (3 - 1) / 2`
           `15 + 3 * 2 / 2`
           `15 + 3`
           `18`
        The result `18` matches the dry run.
* Time Complexity: O(N)
* Space Complexity: O(1)
*/
var maximizeSum = function (nums, k) {
  let initialMaximumValue = Math.max(...nums);
  let numberOfOperations = k;
  let finalScore =
    numberOfOperations * initialMaximumValue +
    (numberOfOperations * (numberOfOperations - 1)) / 2;
  return finalScore;
};
