/**
 * Find Lucky Integer In An Array
 * Time Complexity: O(N + M)
 * Space Complexity: O(M)
 */
var findLucky = function (arr) {
  const numberCounts = new Array(501).fill(0);

  for (const numberValue of arr) {
    numberCounts[numberValue]++;
  }

  let greatestLuckyInteger = -1;

  for (let currentCandidate = 500; currentCandidate >= 1; currentCandidate--) {
    const currentCount = numberCounts[currentCandidate];
    if (currentCandidate === currentCount) {
      greatestLuckyInteger = currentCandidate;
      break;
    }
  }

  return greatestLuckyInteger;
};
