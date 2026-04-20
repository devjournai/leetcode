/**
 * Decode Xored Array
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var decode = function (encoded, first) {
  const originalArray = [first];
  let currentIndex = 0;

  while (currentIndex < encoded.length) {
    const previousElement = originalArray[currentIndex];
    const currentEncodedValue = encoded[currentIndex];
    const nextElement = previousElement ^ currentEncodedValue;
    originalArray.push(nextElement);
    currentIndex++;
  }

  return originalArray;
};
