/**
 * Check If Array Pairs Are Divisible By K
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
