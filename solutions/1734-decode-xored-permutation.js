/**
 * Decode Xored Permutation
 * Intuition: `perm` is a permutation of 1..n. XOR of all values is 1⊕…⊕n. XOR of encoded[1], encoded[3], … equals perm[1]⊕perm[2]⊕…⊕perm[n-1], so perm[0] is totalXor ⊕ that quantity; the rest follows by XOR with encoded.
 * Approach: 1. `totalPermXor` = 1⊕…⊕n. 2. `oddIndexXorSum` of encoded[1], encoded[3], … 3. `decodedElements[0] = totalPermXor ^ oddIndexXorSum`. 4. Fill the rest by XOR with encoded.
 * Dry Run: encoded = [6,5,4,6]
 * n=5, totalXor=1; odd encoded 5⊕6=3; perm[0]=1⊕3=2; then 2⊕6=4,4⊕5=1,1⊕4=5,5⊕6=3 → [2,4,1,5,3].
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
