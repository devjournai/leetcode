/**
 * Tuple With Same Product
 * Intuition: Distinct a,b,c,d with a*b=c*d. Count pair products; C(freq,2) ways to pick two pairs with the same product, and each two pairs permute into 8 tuples.
 * Approach: 1. Nested loops fill `productFrequencyMap`. 2. For each product with `productOccurrences>1`, add C(occ,2). 3. Return that sum times 8.
 * Dry Run: nums = [2,3,4,6]
 * products 6,8,12,12,18,24; product 12 appears twice → 1*8 = 8 tuples.
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
        (productFrequencyMap.get(currentCalculatedProduct) || 0) + 1
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
