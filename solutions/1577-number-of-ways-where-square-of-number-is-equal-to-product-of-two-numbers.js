/**
 * Number Of Ways Where Square Of Number Is Equal To Product Of Two Numbers
 * Intuition: Count pairs in one array whose product equals a square from the other; do both type-1 and type-2.
 * Approach: 1. Map all pair products (BigInt) in the second array. 2. For each first-array value add map[x*x]. 3. Sum both directions.
 * Dry Run: nums1 = [7,4], nums2 = [5,2,8,9].
 *   - 4^2 = 16 = 2*8 → 1 way.
 * Time Complexity: O(nums1.length^2 + nums2.length^2)
 * Space Complexity: O(nums1.length^2 + nums2.length^2)
 */
var numTriplets = function (nums1, nums2) {
  function findTriplets(firstArray, secondArray) {
    const productMapStorage = new Map();
    let totalWays = 0;

    for (
      let firstLoopIndex = 0;
      firstLoopIndex < secondArray.length;
      firstLoopIndex++
    ) {
      for (
        let secondLoopIndex = firstLoopIndex + 1;
        secondLoopIndex < secondArray.length;
        secondLoopIndex++
      ) {
        const currentElementsProduct =
          BigInt(secondArray[firstLoopIndex]) *
          BigInt(secondArray[secondLoopIndex]);
        productMapStorage.set(
          currentElementsProduct,
          (productMapStorage.get(currentElementsProduct) || 0) + 1
        );
      }
    }

    for (
      let arrayIterator = 0;
      arrayIterator < firstArray.length;
      arrayIterator++
    ) {
      const elementValue = BigInt(firstArray[arrayIterator]);
      const elementSquare = elementValue * elementValue;
      if (productMapStorage.has(elementSquare)) {
        totalWays += productMapStorage.get(elementSquare);
      }
    }

    return totalWays;
  }

  const type1Counter = findTriplets(nums1, nums2);
  const type2Counter = findTriplets(nums2, nums1);

  const finalAnswer = type1Counter + type2Counter;

  return finalAnswer;
};
