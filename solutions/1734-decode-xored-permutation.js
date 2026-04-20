/**
 * Decode Xored Permutation
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var decode = function (encoded) {
  const permLength = encoded.length + 1;

  let totalPermXor = 0;
  for (let counterOne = 1; counterOne <= permLength; counterOne++) {
    totalPermXor ^= counterOne;
  }

  let oddIndexXorSum = 0;
  for (let counterTwo = 1; counterTwo < encoded.length; counterTwo += 2) {
    oddIndexXorSum ^= encoded[counterTwo];
  }

  const decodedElements = new Array(permLength);
  decodedElements[0] = totalPermXor ^ oddIndexXorSum;

  for (
    let currentElementIndex = 0;
    currentElementIndex < permLength - 1;
    currentElementIndex++
  ) {
    decodedElements[currentElementIndex + 1] =
      decodedElements[currentElementIndex] ^ encoded[currentElementIndex];
  }

  return decodedElements;
};
