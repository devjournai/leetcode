/**
 * Number Of Good Binary Strings
 * Intuition: The problem asks for counting binary strings with specific block length rules. This is a classic dynamic programming scenario where the solution for a length `L` can be built from solutions for smaller lengths. A good string of length `L` can be formed by appending a valid block of 1s (of length `oneGroup`) to a good string of length `L - oneGroup`, or by appending a valid block of 0s (of length `zeroGroup`) to a good string of length `L - zeroGroup`.
 * Approach: 1. Initialize a dynamic programming array, `goodStringCounts`, of size `maxLength + 1`. `goodStringCounts[j]` will store the number of good binary strings of length `j`. 2. Set the base case: `goodStringCounts[0] = 1`, representing one way to form an empty string. 3. Iterate `currentLength` from `1` up to `maxLength`. For each `currentLength`: a. If `currentLength` is at least `oneGroup`, add `goodStringCounts[currentLength - oneGroup]` to `goodStringCounts[currentLength]`. This accounts for strings ending with a block of `oneGroup` ones. b. If `currentLength` is at least `zeroGroup`, add `goodStringCounts[currentLength - zeroGroup]` to `goodStringCounts[currentLength]`. This accounts for strings ending with a block of `zeroGroup` zeros. c. Apply the modulo `10^9 + 7` after each addition to prevent overflow. 4. Initialize `totalGoodStringCount` to `0`. 5. Iterate `iterationLength` from `minLength` up to `maxLength`. For each `iterationLength`, add `goodStringCounts[iterationLength]` to `totalGoodStringCount` and apply the modulo. 6. Return `totalGoodStringCount`.
 * Dry Run: minLength = 2, maxLength = 3, oneGroup = 1, zeroGroup = 1
 * modulusValue = 1e9 + 7
 * goodStringCounts = [0, 0, 0, 0] (size maxLength + 1 = 4)
 * goodStringCounts[0] = 1
 * goodStringCounts = [1, 0, 0, 0]
 *
 * Loop currentLength from 1 to 3:
 * currentLength = 1:
 *   oneGroup (1) <= 1: goodStringCounts[1] = (goodStringCounts[1] + goodStringCounts[0]) % modulusValue = (0 + 1) % modulusValue = 1.
 *   zeroGroup (1) <= 1: goodStringCounts[1] = (goodStringCounts[1] + goodStringCounts[0]) % modulusValue = (1 + 1) % modulusValue = 2.
 * goodStringCounts = [1, 2, 0, 0]
 *
 * currentLength = 2:
 *   oneGroup (1) <= 2: goodStringCounts[2] = (goodStringCounts[2] + goodStringCounts[1]) % modulusValue = (0 + 2) % modulusValue = 2.
 *   zeroGroup (1) <= 2: goodStringCounts[2] = (goodStringCounts[2] + goodStringCounts[1]) % modulusValue = (2 + 2) % modulusValue = 4.
 * goodStringCounts = [1, 2, 4, 0]
 *
 * currentLength = 3:
 *   oneGroup (1) <= 3: goodStringCounts[3] = (goodStringCounts[3] + goodStringCounts[2]) % modulusValue = (0 + 4) % modulusValue = 4.
 *   zeroGroup (1) <= 3: goodStringCounts[3] = (goodStringCounts[3] + goodStringCounts[2]) % modulusValue = (4 + 4) % modulusValue = 8.
 * goodStringCounts = [1, 2, 4, 8]
 *
 * Initialize totalGoodStringCount = 0
 *
 * Loop iterationLength from minLength (2) to maxLength (3):
 * iterationLength = 2:
 *   totalGoodStringCount = (totalGoodStringCount + goodStringCounts[2]) % modulusValue = (0 + 4) % modulusValue = 4.
 * iterationLength = 3:
 *   totalGoodStringCount = (totalGoodStringCount + goodStringCounts[3]) % modulusValue = (4 + 8) % modulusValue = 12.
 *
 * Return 12.
 * Time Complexity: O(maxLength)
 * Space Complexity: O(maxLength)
 */
var goodBinaryStrings = function (minLength, maxLength, oneGroup, zeroGroup) {
  const modulusValue = 1000000007;
  const goodStringCounts = new Array(maxLength + 1).fill(0);
  goodStringCounts[0] = 1;

  for (let currentLength = 1; currentLength <= maxLength; currentLength++) {
    if (oneGroup <= currentLength) {
      goodStringCounts[currentLength] =
        (goodStringCounts[currentLength] +
          goodStringCounts[currentLength - oneGroup]) %
        modulusValue;
    }
    if (zeroGroup <= currentLength) {
      goodStringCounts[currentLength] =
        (goodStringCounts[currentLength] +
          goodStringCounts[currentLength - zeroGroup]) %
        modulusValue;
    }
  }

  let totalGoodStringCount = 0;
  for (
    let iterationLength = minLength;
    iterationLength <= maxLength;
    iterationLength++
  ) {
    totalGoodStringCount =
      (totalGoodStringCount + goodStringCounts[iterationLength]) % modulusValue;
  }

  return totalGoodStringCount;
};
