/**
 * Count Special Quadruplets
 * Intuition: The problem asks for four indices (a, b, c, d) such that a < b < c < d and nums[a] + nums[b] + nums[c] == nums[d]. A brute-force O(N^4) approach iterates all four indices. To optimize to O(N^3), we can fix three indices and use a hash map or a two-pointer technique to find the fourth in O(N) or O(1). Since indices must be strictly increasing, sorting is not directly applicable if we need original indices. Instead, we can use a hash map to efficiently count occurrences of target values within the valid index ranges.
 * Approach: 1. Initialize a counter for special quadruplets. 2. Iterate through possible indices for 'a' from the beginning of the array. 3. For each 'a', iterate through possible indices for 'b' (b > a). 4. For each pair (a, b), calculate their sum, `currentSumOfTwo = nums[a] + nums[b]`. 5. Now, we need to find (c, d) such that b < c < d and `currentSumOfTwo + nums[c] == nums[d]`. This means `nums[c] = nums[d] - currentSumOfTwo`. 6. To efficiently find such (c, d) pairs, iterate 'd' from its minimum valid index (b + 2) up to the end of the array. 7. Maintain a frequency map (`thirdNumberFrequencies`) that stores counts of `nums[c]` values encountered so far, where `c` is within the valid range (i.e., `b < c < d`). 8. Inside the 'd' loop, before adding `nums[d-1]` to the map (as a candidate for `c`), check if the `targetThirdNumber = nums[d] - currentSumOfTwo` exists in `thirdNumberFrequencies`. If it does, add its count to the `quadrupletCount`. 9. Then, add `nums[d-1]` to `thirdNumberFrequencies`, as `d-1` becomes a valid 'c' for subsequent 'd' values.
 * Dry Run: nums = [1, 2, 3, 6]
 * arraySize = 4
 * quadrupletCount = 0
 *
 * firstIndex = 0 (nums[0] = 1)
 *   secondIndex = 1 (nums[1] = 2)
 *     currentSumOfTwo = nums[0] + nums[1] = 1 + 2 = 3
 *     thirdNumberFrequencies = {} (empty map)
 *     fourthIndex loop: from 3 to 3 (arraySize - 1)
 *       fourthIndex = 3 (nums[3] = 6)
 *         targetThirdNumber = nums[3] - currentSumOfTwo = 6 - 3 = 3
 *         thirdNumberFrequencies does not contain 3. quadrupletCount remains 0.
 *         currentThirdNumberCandidate = nums[fourthIndex - 1] = nums[2] = 3
 *         thirdNumberFrequencies.set(3, 1) -> {3: 1}
 *   (secondIndex loop ends)
 * (firstIndex loop ends)
 *
 * Result: quadrupletCount = 0.
 * Wait, the dry run for [1,2,3,6] should yield 1.
 * Let's re-trace the example [1,2,3,6] in the approach's context:
 * a=0, b=1, c=2, d=3  (1 < 2 < 3 < 4)
 * nums[0] + nums[1] + nums[2] = 1 + 2 + 3 = 6
 * nums[3] = 6
 * So, (0, 1, 2, 3) is a valid quadruplet.
 *
 * Corrected Dry Run: nums = [1, 2, 3, 6]
 * arraySize = 4
 * quadrupletCount = 0
 *
 * firstIndex = 0 (nums[0] = 1)
 *   secondIndex = 1 (nums[1] = 2)
 *     currentSumOfTwo = nums[0] + nums[1] = 1 + 2 = 3
 *     thirdNumberFrequencies = new Map()
 *     fourthIndex loop: from (secondIndex + 2) = 3 to (arraySize - 1) = 3
 *       fourthIndex = 3 (nums[3] = 6)
 *         // Before checking, add nums[fourthIndex-1] to map
 *         // This is a subtle point. The values in thirdNumberFrequencies should be `nums[c]` where `b < c < current fourthIndex`.
 *         // When fourthIndex is 3, c must be 2. So `nums[2]` should be in the map before checking for `d=3`.
 *         // My current code adds `nums[fourthIndex-1]` *after* checking. This means `nums[2]` is added *after* the check for `d=3`.
 *         // This logic needs to be swapped for `nums[d-1]` to be included as a candidate for `c`.
 *
 * Corrected Approach Logic:
 * Inside the 'd' loop:
 *  1. Add `nums[d-1]` to `thirdNumberFrequencies`. This ensures `nums[c]` for `c = d-1` is available for current and future `d`'s.
 *  2. Calculate `targetThirdNumber = nums[d] - currentSumOfTwo`.
 *  3. Check if `targetThirdNumber` exists in `thirdNumberFrequencies`. If it does, add its count to `quadrupletCount`.
 *
 * Corrected Dry Run (with fixed logic): nums = [1, 2, 3, 6]
 * arraySize = 4
 * quadrupletCount = 0
 *
 * firstIndex = 0 (nums[0] = 1)
 *   secondIndex = 1 (nums[1] = 2)
 *     currentSumOfTwo = nums[0] + nums[1] = 1 + 2 = 3
 *     thirdNumberFrequencies = new Map()
 *     fourthIndex loop: from (secondIndex + 2) = 3 to (arraySize - 1) = 3
 *       fourthIndex = 3 (nums[3] = 6)
 *         currentThirdNumberCandidate = nums[fourthIndex - 1] = nums[2] = 3
 *         thirdNumberFrequencies.set(3, (thirdNumberFrequencies.get(3) || 0) + 1) -> {3: 1}
 *
 *         targetThirdNumber = nums[3] - currentSumOfTwo = 6 - 3 = 3
 *         thirdNumberFrequencies has 3.
 *         quadrupletCount += thirdNumberFrequencies.get(3) = 0 + 1 = 1
 *
 * Result: quadrupletCount = 1. This is correct for [1,2,3,6].
 *
 * Time Complexity: O(N^3)
 * Space Complexity: O(N)
 */
var countQuadruplets = function (nums) {
  const arraySize = nums.length;
  let quadrupletCount = 0;

  for (let firstIndex = 0; firstIndex < arraySize - 3; firstIndex++) {
    for (
      let secondIndex = firstIndex + 1;
      secondIndex < arraySize - 2;
      secondIndex++
    ) {
      const currentSumOfTwo = nums[firstIndex] + nums[secondIndex];
      const thirdNumberFrequencies = new Map();

      for (
        let fourthIndex = secondIndex + 2;
        fourthIndex < arraySize;
        fourthIndex++
      ) {
        const currentThirdNumberCandidate = nums[fourthIndex - 1];
        thirdNumberFrequencies.set(
          currentThirdNumberCandidate,
          (thirdNumberFrequencies.get(currentThirdNumberCandidate) || 0) + 1
        );
        const targetThirdNumber = nums[fourthIndex] - currentSumOfTwo;
        if (thirdNumberFrequencies.has(targetThirdNumber)) {
          quadrupletCount += thirdNumberFrequencies.get(targetThirdNumber);
        }
      }
    }
  }

  return quadrupletCount;
};
