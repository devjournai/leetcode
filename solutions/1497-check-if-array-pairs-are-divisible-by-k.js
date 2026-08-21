/**
 * Check If Array Pairs Are Divisible By K
 * Intuition: Pair remainders r with k-r. Remainder 0 (and k/2 if k even) must have even counts.
 * Approach: 1. Count ((x%k)+k)%k for each x. 2. For r from 0 to floor(k/2), if r is 0 or 2r==k, require even frequency. 3. Else require freq[r]==freq[k-r]. 4. Return true if all checks pass.
 * Dry Run: arr = [1,2,3,4,5,10,6,7,8,9], k = 5
 *   - remainders: 0:2, 1:2, 2:2, 3:2, 4:2 all pair. Return true.
 * Time Complexity: O(n + k)
 * Space Complexity: O(k)
 */
var canArrange = function (arr, k) {
  const remainderFrequency = new Array(k).fill(0);

  for (const arrayElement of arr) {
    const currentModulo = ((arrayElement % k) + k) % k;
    remainderFrequency[currentModulo]++;
  }

  for (let checkIndex = 0; checkIndex <= Math.floor(k / 2); checkIndex++) {
    if (checkIndex === 0 || checkIndex * 2 === k) {
      if (remainderFrequency[checkIndex] % 2 !== 0) return false;
    } else {
      const neededComplement = k - checkIndex;
      if (
        remainderFrequency[checkIndex] !== remainderFrequency[neededComplement]
      ) {
        return false;
      }
    }
  }

  return true;
};
