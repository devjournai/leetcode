/**
 * Find Anagram Mappings
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
