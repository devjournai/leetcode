/**
 * Number Of Substrings With Fixed Ratio
 * Intuition: The problem asks for substrings where the ratio of zeros to ones is num1 : num2. This can be expressed as `countZeros / countOnes = num1 / num2`, which simplifies to `countZeros * num2 = countOnes * num1`, or `countOnes * num1 - countZeros * num2 = 0`. This structure is characteristic of problems solvable with prefix sums and a hash map. If a substring `s[j...i]` satisfies the condition, it means that the difference `(ones_i - ones_{j-1}) * num1 - (zeros_i - zeros_{j-1}) * num2` is zero. Rearranging, this implies `ones_i * num1 - zeros_i * num2 == ones_{j-1} * num1 - zeros_{j-1} * num2`. We can maintain a running `difference` value for prefixes and count how many times each `difference` has appeared previously using a hash map.
 * Approach: 1. Initialize a hash map `frequencyMap` to store the counts of prefix differences (`oneCount * num1 - zeroCount * num2`). Seed the map with `frequencyMap.set(0, 1)` to account for the empty prefix having a difference of 0, allowing substrings starting from index 0 to be counted. 2. Initialize `zeroCount` and `oneCount` to zero, and `totalSubstrings` to zero. 3. Iterate through the input string `s` character by character using `currentIdx`. 4. For each character, update `zeroCount` or `oneCount` accordingly. 5. Calculate the `currentDifference` for the prefix up to `currentIdx` as `oneCount * num1 - zeroCount * num2`. 6. If `currentDifference` is present in `frequencyMap`, it means there are `frequencyMap.get(currentDifference)` previous prefixes `s[0...j-1]` that had the same difference. Each such prefix forms a valid ratio substring `s[j...currentIdx]` when combined with the current prefix. Add this count to `totalSubstrings`. 7. Increment the count of `currentDifference` in `frequencyMap`. If it's not present, add it with a count of 1. 8. After iterating through the entire string, return `totalSubstrings`.
 * Dry Run: s = "01011", num1 = 2, num2 = 3
 * Initial: strLength = 5, frequencyMap = {0: 1}, zeroCount = 0, oneCount = 0, totalSubstrings = 0
 * currentIdx = 0, s[0] = '0':
 *   zeroCount = 1, oneCount = 0
 *   calculatedDiff = 0 * 2 - 1 * 3 = -3
 *   frequencyMap does not have -3.
 *   frequencyMap = {0: 1, -3: 1}
 * currentIdx = 1, s[1] = '1':
 *   zeroCount = 1, oneCount = 1
 *   calculatedDiff = 1 * 2 - 1 * 3 = -1
 *   frequencyMap does not have -1.
 *   frequencyMap = {0: 1, -3: 1, -1: 1}
 * currentIdx = 2, s[2] = '0':
 *   zeroCount = 2, oneCount = 1
 *   calculatedDiff = 1 * 2 - 2 * 3 = -4
 *   frequencyMap does not have -4.
 *   frequencyMap = {0: 1, -3: 1, -1: 1, -4: 1}
 * currentIdx = 3, s[3] = '1':
 *   zeroCount = 2, oneCount = 2
 *   calculatedDiff = 2 * 2 - 2 * 3 = -2
 *   frequencyMap does not have -2.
 *   frequencyMap = {0: 1, -3: 1, -1: 1, -4: 1, -2: 1}
 * currentIdx = 4, s[4] = '1':
 *   zeroCount = 2, oneCount = 3
 *   calculatedDiff = 3 * 2 - 2 * 3 = 0
 *   frequencyMap HAS 0. totalSubstrings += frequencyMap.get(0) -> totalSubstrings = 0 + 1 = 1.
 *   frequencyMap.set(0, (frequencyMap.get(0) || 0) + 1) -> frequencyMap = {0: 2, -3: 1, -1: 1, -4: 1, -2: 1}
 * Loop ends.
 * Return totalSubstrings = 1.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var fixedRatio = function (s, num1, num2) {
  const stringLength = s.length;
  const frequencyMap = new Map();
  frequencyMap.set(0, 1);

  let zeroCount = 0;
  let oneCount = 0;
  let totalSubstrings = 0;

  for (let currentIdx = 0; currentIdx < stringLength; currentIdx++) {
    if (s[currentIdx] === "0") {
      zeroCount++;
    } else {
      oneCount++;
    }

    const calculatedDiff = oneCount * num1 - zeroCount * num2;

    if (frequencyMap.has(calculatedDiff)) {
      totalSubstrings += frequencyMap.get(calculatedDiff);
    }

    frequencyMap.set(
      calculatedDiff,
      (frequencyMap.get(calculatedDiff) || 0) + 1,
    );
  }

  return totalSubstrings;
};
