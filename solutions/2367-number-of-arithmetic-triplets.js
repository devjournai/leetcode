/**
 * Number Of Arithmetic Triplets
 * Intuition: An arithmetic triplet (num[i], num[j], num[k]) implies that num[j] = num[i] + diff and num[k] = num[j] + diff. This means num[k] = num[i] + 2 * diff. We can iterate through each number as the potential first element (num[i]) and check for the existence of the required second (num[i] + diff) and third (num[i] + 2 * diff) elements within the array.
 * Approach: 1. Initialize a counter for arithmetic triplets. 2. Create a hash set (Set in JavaScript) containing all elements from the input array for efficient O(1) average time lookups. 3. Iterate through each element in the input array, treating it as the potential first element of a triplet. 4. For each potential first element, calculate the values for the required second and third elements based on the given `diff`. 5. Check if both the calculated second and third elements exist in the hash set. 6. If both exist, increment the triplet counter. 7. After iterating through all elements, the counter will hold the total number of unique arithmetic triplets.
 * Dry Run: nums = [0, 1, 4, 6, 7, 10], diff = 3
 * 1. tripletsCount = 0
 * 2. numberPresence = {0, 1, 4, 6, 7, 10}
 * 3. Loop `currentFirst` in `nums`:
 *    - `currentFirst = 0`:
 *      - `neededSecond = 0 + 3 = 3`
 *      - `neededThird = 3 + 3 = 6`
 *      - `numberPresence.has(3)` is false.
 *    - `currentFirst = 1`:
 *      - `neededSecond = 1 + 3 = 4`
 *      - `neededThird = 4 + 3 = 7`
 *      - `numberPresence.has(4)` is true, `numberPresence.has(7)` is true.
 *      - `tripletsCount` becomes 1.
 *    - `currentFirst = 4`:
 *      - `neededSecond = 4 + 3 = 7`
 *      - `neededThird = 7 + 3 = 10`
 *      - `numberPresence.has(7)` is true, `numberPresence.has(10)` is true.
 *      - `tripletsCount` becomes 2.
 *    - `currentFirst = 6`:
 *      - `neededSecond = 6 + 3 = 9`
 *      - `neededThird = 9 + 3 = 12`
 *      - `numberPresence.has(9)` is false.
 *    - `currentFirst = 7`:
 *      - `neededSecond = 7 + 3 = 10`
 *      - `neededThird = 10 + 3 = 13`
 *      - `numberPresence.has(10)` is true, `numberPresence.has(13)` is false.
 *    - `currentFirst = 10`:
 *      - `neededSecond = 10 + 3 = 13`
 *      - `neededThird = 13 + 3 = 16`
 *      - `numberPresence.has(13)` is false.
 * 4. Loop finishes.
 * 5. Return `tripletsCount = 2`.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var arithmeticTriplets = function (nums, diff) {
  let tripletsCount = 0;
  const numberPresence = new Set(nums);

  for (const currentFirst of nums) {
    const neededSecond = currentFirst + diff;
    const neededThird = neededSecond + diff;

    if (numberPresence.has(neededSecond) && numberPresence.has(neededThird)) {
      tripletsCount++;
    }
  }

  return tripletsCount;
};
