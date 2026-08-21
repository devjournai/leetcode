/**
 * Decode Xored Array
 * Intuition: encoded[i] = arr[i] XOR arr[i+1], so arr[i+1] = arr[i] XOR encoded[i]. Start from `first` and fold XOR along the encoding.
 * Approach: 1. `originalArray = [first]`. 2. For each encoded value, push `previousElement ^ currentEncodedValue`. 3. Return `originalArray`.
 * Dry Run: encoded = [1,2,3], first = 1
 * 1, 1⊕1=0, 0⊕2=2, 2⊕3=1 → [1,0,2,1].
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
