/**
 * Minimum Factorization
 * Time Complexity: O(log N)
 * Space Complexity: O(log N)
 */
var smallestFactorization = function (initialValue) {
  if (initialValue < 2) {
    return initialValue;
  }

  const factorList = [];
  let processingNumber = initialValue;

  let currentFactor = 9;
  while (currentFactor > 1) {
    while (processingNumber % currentFactor === 0) {
      factorList.push(currentFactor);
      processingNumber /= currentFactor;
    }
    currentFactor--;
  }

  if (processingNumber > 1) {
    return 0;
  }

  let finalProduct = 0;
  const maxSignedInt = 2147483647;

  let listLength = factorList.length;
  let listIndex = listLength - 1;

  for (; listIndex >= 0; listIndex--) {
    let currentDigit = factorList[listIndex];
    finalProduct = finalProduct * 10 + currentDigit;

    if (finalProduct > maxSignedInt) {
      return 0;
    }
  }

  return finalProduct;
};
