/**
 * Find The Original Array Of Prefix Xor
 * Intuition: The prefix XOR property `pref[i] = arr[0] ^ ... ^ arr[i]` implies that `arr[0] = pref[0]`. For any `i > 0`, `pref[i-1] = arr[0] ^ ... ^ arr[i-1]`. XORing `pref[i]` and `pref[i-1]` cancels out `arr[0]` through `arr[i-1]`, leaving only `arr[i]`. Thus, `arr[i] = pref[i] ^ pref[i-1]`.
 * Approach: 1. Initialize a result array of the same length as the input `pref`. 2. Set the first element of the result array to `pref[0]`. 3. Iterate from the second element up to the end of the `pref` array, calculating each element `arr[i]` as `pref[i] ^ pref[i-1]`. 4. Return the constructed array.
 * Dry Run: pref = [5, 2, 0, 3, 1]
 * 1. originalArrayLength = 5.
 * 2. derivedArray = [undefined, undefined, undefined, undefined, undefined].
 * 3. derivedArray[0] = pref[0] = 5. derivedArray = [5, undefined, undefined, undefined, undefined].
 * 4. currentTraversalIndex = 1.
 * 5. While loop (1 < 5):
 *    - derivedArray[1] = pref[1] ^ pref[0] = 2 ^ 5 = 7. derivedArray = [5, 7, undefined, undefined, undefined].
 *    - currentTraversalIndex = 2.
 * 6. While loop (2 < 5):
 *    - derivedArray[2] = pref[2] ^ pref[1] = 0 ^ 2 = 2. derivedArray = [5, 7, 2, undefined, undefined].
 *    - currentTraversalIndex = 3.
 * 7. While loop (3 < 5):
 *    - derivedArray[3] = pref[3] ^ pref[2] = 3 ^ 0 = 3. derivedArray = [5, 7, 2, 3, undefined].
 *    - currentTraversalIndex = 4.
 * 8. While loop (4 < 5):
 *    - derivedArray[4] = pref[4] ^ pref[3] = 1 ^ 3 = 2. derivedArray = [5, 7, 2, 3, 2].
 *    - currentTraversalIndex = 5.
 * 9. While loop (5 < 5) is false. Loop terminates.
 * 10. Return [5, 7, 2, 3, 2].
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var findArray = function (pref) {
  const originalArrayLength = pref.length;
  const derivedArray = new Array(originalArrayLength);

  derivedArray[0] = pref[0];

  let currentTraversalIndex = 1;
  while (currentTraversalIndex < originalArrayLength) {
    derivedArray[currentTraversalIndex] =
      pref[currentTraversalIndex] ^ pref[currentTraversalIndex - 1];
    currentTraversalIndex++;
  }

  return derivedArray;
};
