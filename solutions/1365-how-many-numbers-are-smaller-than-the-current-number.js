/**
 * How Many Numbers Are Smaller Than The Current Number
 * Intuition: Values are in a tiny range, so a frequency array plus prefix counts gives, for each value, how many numbers are strictly smaller.
 * Approach: 1. Count occurrences of each value in [0, 100]. 2. Build cumulativeSmaller[v] = count of values < v. 3. Map each original nums[i] to cumulativeSmaller[nums[i]].
 * Dry Run: nums = [8, 1, 2, 2, 3].
 *   - Frequencies: 1→1, 2→2, 3→1, 8→1.
 *   - Smaller counts: 8→4, 1→0, 2→1, 2→1, 3→3. Return [4, 0, 1, 1, 3].
 * Time Complexity: O(N + K)
 * Space Complexity: O(N + K)
 */
var smallerNumbersThanCurrent = function (nums) {
  const valueRange = 101;
  const frequencyCounts = new Array(valueRange).fill(0);

  for (const numberValue of nums) {
    frequencyCounts[numberValue]++;
  }

  const cumulativeSmaller = new Array(valueRange).fill(0);
  for (let indexValue = 1; indexValue < valueRange; indexValue++) {
    cumulativeSmaller[indexValue] =
      cumulativeSmaller[indexValue - 1] + frequencyCounts[indexValue - 1];
  }

  const resultCollection = [];
  for (const elementValue of nums) {
    resultCollection.push(cumulativeSmaller[elementValue]);
  }

  return resultCollection;
};
