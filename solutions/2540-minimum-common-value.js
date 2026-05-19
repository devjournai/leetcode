/**
 * Minimum Common Value
 * Intuition: Given two sorted arrays, a two-pointer approach is efficient. By comparing elements at current pointers, we can decide which pointer to advance without re-checking previous elements, leveraging the sorted property. If elements match, we've found the minimum common value. This process can be naturally expressed recursively.
 * Approach: 1. Define a recursive helper function `findCommonRecursive` that accepts the two arrays and their current indices. 2. Establish a base case: if either index goes out of bounds, no common value exists from that point, so return -1. 3. Inside the recursion, retrieve the values at the current indices. 4. If the values are equal, return this value as it is the minimum common value encountered so far due to the sorted nature and left-to-right traversal. 5. If the value from the first array is smaller, recursively call `findCommonRecursive` advancing only the first array's index. 6. If the value from the second array is smaller, recursively call `findCommonRecursive` advancing only the second array's index. 7. Initiate the process by calling `findCommonRecursive` with initial indices of 0 for both arrays.
 * Dry Run: nums1 = [1, 2, 3], nums2 = [2, 4]
 * 1. findCommonRecursive(nums1, 0, nums2, 0)
 *    valueOne = nums1[0] = 1, valueTwo = nums2[0] = 2
 *    1 < 2, so recurse: findCommonRecursive(nums1, 1, nums2, 0)
 * 2. findCommonRecursive(nums1, 1, nums2, 0)
 *    valueOne = nums1[1] = 2, valueTwo = nums2[0] = 2
 *    2 === 2, so return 2.
 * Time Complexity: O(M + N)
 * Space Complexity: O(M + N)
 */
var getCommon = function (nums1, nums2) {
  const findCommonRecursive = (arrayOne, indexA, arrayTwo, indexB) => {
    if (indexA >= arrayOne.length || indexB >= arrayTwo.length) {
      return -1;
    }

    const valueOne = arrayOne[indexA];
    const valueTwo = arrayTwo[indexB];

    if (valueOne === valueTwo) {
      return valueOne;
    } else if (valueOne < valueTwo) {
      return findCommonRecursive(arrayOne, indexA + 1, arrayTwo, indexB);
    } else {
      return findCommonRecursive(arrayOne, indexA, arrayTwo, indexB + 1);
    }
  };

  return findCommonRecursive(nums1, 0, nums2, 0);
};
