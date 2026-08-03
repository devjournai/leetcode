/**
 * Happy Students
 * Intuition: To make all students happy, we must satisfy two conditions simultaneously for a chosen group size `k`: selected students need `k > nums[i]`, and unselected students need `k < nums[j]`. Sorting the `nums` array allows us to systematically check all possible `k` values (from `0` to `n`), as it ensures that if `k` satisfies `k > nums[idx]` for a student at `idx`, it also satisfies it for all students with smaller `nums` values. Similarly, if `k < nums[idx+1]`, it satisfies it for all students with larger `nums` values.
 * Approach: 1. Sort the input `nums` array in ascending order. This helps in efficiently applying the happiness conditions. 2. Initialize `waysToMakeHappy` to count valid selection methods. 3. First, check the case where no students are selected: If `0` (the number of selected students) is strictly less than `nums[0]` (the smallest requirement), then all students would be happy not being selected. If this condition is met, increment `waysToMakeHappy`. 4. Iterate through the sorted array using `studentIterator` from `0` to `totalClassSize - 1`. In each iteration, `currentStudentsChosen` represents `studentIterator + 1`, signifying the number of students selected up to the `studentIterator`-th position. 5. Within the loop, check two happiness conditions: a) For the `currentStudentsChosen` students that are hypothetically selected (i.e., those with `nums` values from `nums[0]` to `nums[studentIterator]`), `currentStudentsChosen` must be strictly greater than `nums[studentIterator]`. b) For the remaining `totalClassSize - currentStudentsChosen` students that are hypothetically not selected (i.e., those with `nums` values from `nums[studentIterator + 1]` to `nums[totalClassSize - 1]`), `currentStudentsChosen` must be strictly less than `nums[studentIterator + 1]`. This second condition is only relevant if there are indeed unselected students (i.e., `studentIterator + 1` is less than `totalClassSize`). 6. If both conditions (a and b, or just a if all students are selected) are met for the current `currentStudentsChosen`, increment `waysToMakeHappy`. 7. After iterating through all possible group sizes, return `waysToMakeHappy`.
 * Dry Run: nums = [1, 1]
 * 1. `nums.sort()` results in `nums = [1, 1]`.
 * 2. `totalClassSize = 2`.
 * 3. `waysToMakeHappy = 0`.
 * 4. Check for 0 selected students: `0 < nums[0]` (i.e., `0 < 1`) is true. `waysToMakeHappy` becomes 1.
 * 5. Loop `studentIterator` from 0 to 1:
 *    - `studentIterator = 0`:
 *      - `currentStudentsChosen = 0 + 1 = 1`.
 *      - Condition a: `currentStudentsChosen > nums[studentIterator]` (i.e., `1 > nums[0]` which is `1 > 1`) is false. Conditions for this `currentStudentsChosen` are not met.
 *    - `studentIterator = 1`:
 *      - `currentStudentsChosen = 1 + 1 = 2`.
 *      - Condition a: `currentStudentsChosen > nums[studentIterator]` (i.e., `2 > nums[1]` which is `2 > 1`) is true.
 *      - Condition b check: `studentIterator + 1 === totalClassSize` (i.e., `1 + 1 === 2`) is true. This means all students are selected, so the second happiness condition (for unselected students) is vacuously true.
 *      - Both relevant conditions are met. `waysToMakeHappy` becomes 2.
 * 6. Loop ends.
 * 7. Return `waysToMakeHappy = 2`.
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var countWays = function (nums) {
  nums.sort((valueA, valueB) => valueA - valueB);

  let totalClassSize = nums.length;
  let waysToMakeHappy = 0;

  if (0 < nums[0]) {
    waysToMakeHappy++;
  }

  for (
    let studentIterator = 0;
    studentIterator < totalClassSize;
    studentIterator++
  ) {
    let currentStudentsChosen = studentIterator + 1;

    let selectedAreHappy = currentStudentsChosen > nums[studentIterator];

    let unselectedAreHappy =
      studentIterator + 1 === totalClassSize ||
      currentStudentsChosen < nums[studentIterator + 1];

    if (selectedAreHappy && unselectedAreHappy) {
      waysToMakeHappy++;
    }
  }

  return waysToMakeHappy;
};
