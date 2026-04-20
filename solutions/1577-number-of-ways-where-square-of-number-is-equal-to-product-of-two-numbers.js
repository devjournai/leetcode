/**
 * Number Of Ways Where Square Of Number Is Equal To Product Of Two Numbers
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
          (productMapStorage.get(currentElementsProduct) || 0) + 1,
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
