/**
 * Number Of Pairs Of Strings With Concatenation Equal To Target
 * Intuition: To find pairs (i, j) such that nums[i] + nums[j] equals target, we can iterate through each string in nums. For each current string, we consider it as either the first part (nums[i]) or the second part (nums[j]) of the target. We maintain a frequency map of strings encountered so far. If the current string matches the start of the target, we look for the remaining suffix in our frequency map. If it matches the end of the target, we look for the required prefix. This approach implicitly handles the i != j condition because we only match with strings already added to the map.
 * Approach: 1. Initialize a counter for pairs and a hash map to store the frequencies of strings encountered. 2. Iterate through each string in the input array `nums`. 3. For each string `currentNumberString`: a. Check if `target` starts with `currentNumberString`. If true, calculate the `suffixRequired` to complete the `target`. Add the frequency of `suffixRequired` (if it exists in the map) to the pair counter. b. Check if `target` ends with `currentNumberString`. If true, calculate the `prefixRequired` to complete the `target`. Add the frequency of `prefixRequired` (if it exists in the map) to the pair counter. c. Increment the frequency of `currentNumberString` in the hash map. 4. Return the final pair counter.
 * Dry Run: nums = ["777", "7", "77", "77"], target = "7777"
 * - `numberOfPairsResult` = 0
 * - `stringFrequencyTracker` = new Map()
 *
 * - Loop 1: `currentNumberString` = "777"
 *   - `target.startsWith("777")` is true. `suffixRequired` = "7777".slice("777".length) = "7".
 *   - `stringFrequencyTracker.get("7")` is undefined (0). `numberOfPairsResult` remains 0.
 *   - `target.endsWith("777")` is true. `prefixRequired` = "7777".slice(0, "7777".length - "777".length) = "7".
 *   - `stringFrequencyTracker.get("7")` is undefined (0). `numberOfPairsResult` remains 0.
 *   - `stringFrequencyTracker.set("777", (0 || 0) + 1)` -> {"777": 1}
 *   - `numberOfPairsResult` = 0
 *
 * - Loop 2: `currentNumberString` = "7"
 *   - `target.startsWith("7")` is true. `suffixRequired` = "7777".slice("7".length) = "777".
 *   - `stringFrequencyTracker.get("777")` is 1. `numberOfPairsResult` = 0 + 1 = 1.
 *   - `target.endsWith("7")` is true. `prefixRequired` = "7777".slice(0, "7777".length - "7".length) = "777".
 *   - `stringFrequencyTracker.get("777")` is 1. `numberOfPairsResult` = 1 + 1 = 2.
 *   - `stringFrequencyTracker.set("7", (0 || 0) + 1)` -> {"777": 1, "7": 1}
 *   - `numberOfPairsResult` = 2
 *
 * - Loop 3: `currentNumberString` = "77" (first instance)
 *   - `target.startsWith("77")` is true. `suffixRequired` = "7777".slice("77".length) = "77".
 *   - `stringFrequencyTracker.get("77")` is undefined (0). `numberOfPairsResult` remains 2.
 *   - `target.endsWith("77")` is true. `prefixRequired` = "7777".slice(0, "7777".length - "77".length) = "77".
 *   - `stringFrequencyTracker.get("77")` is undefined (0). `numberOfPairsResult` remains 2.
 *   - `stringFrequencyTracker.set("77", (0 || 0) + 1)` -> {"777": 1, "7": 1, "77": 1}
 *   - `numberOfPairsResult` = 2
 *
 * - Loop 4: `currentNumberString` = "77" (second instance)
 *   - `target.startsWith("77")` is true. `suffixRequired` = "7777".slice("77".length) = "77".
 *   - `stringFrequencyTracker.get("77")` is 1. `numberOfPairsResult` = 2 + 1 = 3.
 *   - `target.endsWith("77")` is true. `prefixRequired` = "7777".slice(0, "7777".length - "77".length) = "77".
 *   - `stringFrequencyTracker.get("77")` is 1. `numberOfPairsResult` = 3 + 1 = 4.
 *   - `stringFrequencyTracker.set("77", (1 || 0) + 1)` -> {"777": 1, "7": 1, "77": 2}
 *   - `numberOfPairsResult` = 4
 *
 * - Return `numberOfPairsResult` = 4.
 *
 * Time Complexity: O(N * L)
 * Space Complexity: O(N * L)
 */
var numOfPairs = function (nums, target) {
  let numberOfPairsResult = 0;
  const stringFrequencyTracker = new Map();

  for (const currentNumberString of nums) {
    if (target.startsWith(currentNumberString)) {
      const suffixRequired = target.slice(currentNumberString.length);
      const currentSuffixMatches =
        stringFrequencyTracker.get(suffixRequired) || 0;
      numberOfPairsResult += currentSuffixMatches;
    }

    if (target.endsWith(currentNumberString)) {
      const prefixRequired = target.slice(
        0,
        target.length - currentNumberString.length
      );
      const currentPrefixMatches =
        stringFrequencyTracker.get(prefixRequired) || 0;
      numberOfPairsResult += currentPrefixMatches;
    }

    const newFrequencyForCurrentNum =
      (stringFrequencyTracker.get(currentNumberString) || 0) + 1;
    stringFrequencyTracker.set(currentNumberString, newFrequencyForCurrentNum);
  }

  return numberOfPairsResult;
};
