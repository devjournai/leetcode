/**
 * Tuple With Same Product
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var tupleSameProduct = function (nums) {
  const productFrequencyMap = new Map();
  let totalProductCombinations = 0;

  for (let firstIndex = 0; firstIndex < nums.length; firstIndex++) {
    for (
      let secondIndex = firstIndex + 1;
      secondIndex < nums.length;
      secondIndex++
    ) {
      const currentCalculatedProduct = nums[firstIndex] * nums[secondIndex];
      productFrequencyMap.set(
        currentCalculatedProduct,
        (productFrequencyMap.get(currentCalculatedProduct) || 0) + 1,
      );
    }
  }

  for (const [
    productKeyIdentifier,
    productOccurrences,
  ] of productFrequencyMap) {
    if (productOccurrences > 1) {
      const combinationsOfTwoPairs =
        (productOccurrences * (productOccurrences - 1)) / 2;
      totalProductCombinations += combinationsOfTwoPairs;
    }
  }

  const finalTupleCount = totalProductCombinations * 8;
  return finalTupleCount;
};
