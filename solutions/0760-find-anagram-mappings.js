/**
 * Find Anagram Mappings
 * Intuition: `nums1` is a permutation of `nums2`, so map each value in `nums2` to a stack of indices and pop one index per `nums1` element.
 * Approach: 1. Fill `numberLocationMap`: for each index in `nums2`, push the index onto that value’s array. 2. For each `numberFromNums1`, `pop()` `nextAvailableIndex` from its list and append to `mappingResult`. 3. Return `mappingResult`.
 * Dry Run: nums1 = [12,28,46,32,50], nums2 = [50,12,32,46,28].
 *   - Map: 50→[0], 12→[1], 32→[2], 46→[3], 28→[4].
 *   - Pops: 12→1, 28→4, 46→3, 32→2, 50→0. Return [1,4,3,2,0].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var anagramMappings = function (nums1, nums2) {
  const numberLocationMap = new Map();

  for (let currentIdx = 0; currentIdx < nums2.length; currentIdx++) {
    const valueInNums2 = nums2[currentIdx];
    if (!numberLocationMap.has(valueInNums2)) {
      numberLocationMap.set(valueInNums2, []);
    }
    numberLocationMap.get(valueInNums2).push(currentIdx);
  }

  const mappingResult = [];
  for (const numberFromNums1 of nums1) {
    const availableIndices = numberLocationMap.get(numberFromNums1);
    const nextAvailableIndex = availableIndices.pop();
    mappingResult.push(nextAvailableIndex);
  }

  return mappingResult;
};
