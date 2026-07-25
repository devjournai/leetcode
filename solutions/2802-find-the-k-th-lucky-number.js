/**
 * Find The K Th Lucky Number
 * Intuition: Lucky numbers consist only of digits '4' and '7'. When sorted by length and then lexicographically, they resemble binary numbers where '0' maps to '4' and '1' maps to '7'. For example, 1-digit numbers are '4' (0), '7' (1); 2-digit numbers are '44' (00), '47' (01), '74' (10), '77' (11). This pattern means there are 2^L lucky numbers of length L. We can determine the length of the K-th lucky number and its 0-indexed position within that length group, then convert this position to binary and map the bits to '4' or '7'.
 * Approach: 1. Determine the `kthLength` of the K-th lucky number. This is done by iteratively summing the count of lucky numbers of increasing lengths (2^1, 2^2, ...) until `k` falls into the range of numbers for the current `length`. A `while` loop accumulates `numbersShorterThanKth` (total count of lucky numbers shorter than `kthLength`) and increments `kthLength`. 2. Calculate `luckyNumberIndexInGroup`, which is `k` minus `numbersShorterThanKth`. This gives the 1-indexed position of the K-th lucky number within its `kthLength` group. 3. Convert `luckyNumberIndexInGroup - 1` (to make it 0-indexed for binary conversion) to its binary string representation using `toString(2)`. Pad this binary string with leading zeros to match `kthLength`. 4. Finally, replace all '0's in the binary string with '4's and all '1's with '7's to form the actual lucky number string.
 * Dry Run: k = 5
 *   1. Initialize `currentLength` = 1, `numbersShorterThanKth` = 0.
 *   2. First iteration of `while` loop:
 *      - `numbersShorterThanKth + Math.pow(2, currentLength)` = 0 + 2^1 = 2.
 *      - Is 2 < 5? Yes.
 *      - `numbersShorterThanKth` becomes 2.
 *      - `currentLength` becomes 2.
 *   3. Second iteration of `while` loop:
 *      - `numbersShorterThanKth + Math.pow(2, currentLength)` = 2 + 2^2 = 6.
 *      - Is 6 < 5? No. Loop terminates.
 *   4. `kthLength` is 2. `numbersShorterThanKth` is 2.
 *   5. Calculate `luckyNumberIndexInGroup` = `k` - `numbersShorterThanKth` = 5 - 2 = 3.
 *   6. Calculate `binaryValueToConvert` = `luckyNumberIndexInGroup` - 1 = 3 - 1 = 2.
 *   7. Convert `binaryValueToConvert` to binary string: `2.toString(2)` results in "10".
 *   8. Pad `binaryRepresentation` ("10") with leading zeros to `kthLength` (2): "10".
 *   9. Replace '0' with '4' and '1' with '7': "10" becomes "74".
 *   Result: "74"
 * Time Complexity: O(log k)
 * Space Complexity: O(log k)
 */
var kthLuckyNumber = function (k) {
  let kthLength = 1;
  let numbersShorterThanKth = 0;

  while (numbersShorterThanKth + Math.pow(2, kthLength) < k) {
    numbersShorterThanKth += Math.pow(2, kthLength);
    kthLength++;
  }

  const luckyNumberIndexInGroup = k - numbersShorterThanKth;
  const binaryValueToConvert = luckyNumberIndexInGroup - 1;
  const binaryRepresentation = binaryValueToConvert
    .toString(2)
    .padStart(kthLength, "0");

  let luckyNumberString = "";
  for (
    let charIndex = 0;
    charIndex < binaryRepresentation.length;
    charIndex++
  ) {
    const currentDigit = binaryRepresentation[charIndex];
    if (currentDigit === "0") {
      luckyNumberString += "4";
    } else {
      luckyNumberString += "7";
    }
  }

  return luckyNumberString;
};
