/**
 * Remove Digit From Number To Maximize Result
 * Intuition: To maximize the resulting number, we want its most significant digits to be as large as possible. This means we should aim to remove a digit that either allows a larger digit to occupy a more significant place or, if that's not possible, minimally impacts the number's magnitude by removing the least significant occurrence.
 * Approach: 1. Iterate through the input string `number` from left to right. 2. Keep track of the index of the rightmost (last found) occurrence of the `digit` in a variable, say `removalIndexCandidate`. 3. Within the loop, if an occurrence of `digit` is found at `currentPos` and it is immediately followed by a character `number[currentPos + 1]` that is strictly greater than `digit` (`number[currentPos] < number[currentPos + 1]`), then removing this `digit` at `currentPos` will yield the largest possible number. This is because it makes an earlier, more significant position hold a larger value. In this specific case, construct the new string by removing the `digit` at `currentPos` and return it immediately, as no further operations can produce a larger value. 4. If the loop completes without finding such a condition (i.e., no `digit` is followed by a strictly larger digit, or it's the last character), it means all `digit` occurrences are either at the end of the string or followed by an equal or smaller digit. To maximize the resulting number in this scenario, we must remove the rightmost (least significant) occurrence of the `digit` to minimize its impact on the number's value. Use the `removalIndexCandidate` for this final removal.
 * Dry Run:
 *   number = "1231", digit = "1"
 *   - `removalIndexCandidate` initialized to -1.
 *   - `currentPos = 0`: `number[0]` ('1') matches `digit`. `removalIndexCandidate` becomes 0. `currentPos + 1` (1) < `number.length` (4) is true. `number[0]` ('1') < `number[1]` ('2') is true. This condition is met.
 *     - `firstPart = number.slice(0, 0)` which is `""`.
 *     - `secondPart = number.slice(0 + 1)` which is `"231"`.
 *     - Return `firstPart + secondPart` = `"231"`.
 *
 *   number = "551", digit = "5"
 *   - `removalIndexCandidate` initialized to -1.
 *   - `currentPos = 0`: `number[0]` ('5') matches `digit`. `removalIndexCandidate` becomes 0. `currentPos + 1` (1) < `number.length` (3) is true. `number[0]` ('5') < `number[1]` ('5') is false. Continue.
 *   - `currentPos = 1`: `number[1]` ('5') matches `digit`. `removalIndexCandidate` becomes 1. `currentPos + 1` (2) < `number.length` (3) is true. `number[1]` ('5') < `number[2]` ('1') is false. Continue.
 *   - `currentPos = 2`: `number[2]` ('1') does not match `digit`. Continue.
 *   - Loop finishes. No early return occurred. `removalIndexCandidate` is 1.
 *     - `leadingSegment = number.slice(0, 1)` which is `"5"`.
 *     - `trailingSegment = number.slice(1 + 1)` which is `"1"`.
 *     - Return `leadingSegment + trailingSegment` = `"51"`.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var removeDigit = function (number, digit) {
  let removalIndexCandidate = -1;

  for (let currentPos = 0; currentPos < number.length; currentPos++) {
    if (number[currentPos] === digit) {
      removalIndexCandidate = currentPos;
      if (
        currentPos + 1 < number.length &&
        number[currentPos] < number[currentPos + 1]
      ) {
        let prefixString = number.slice(0, currentPos);
        let suffixString = number.slice(currentPos + 1);
        return prefixString + suffixString;
      }
    }
  }

  let finalPrefix = number.slice(0, removalIndexCandidate);
  let finalSuffix = number.slice(removalIndexCandidate + 1);
  return finalPrefix + finalSuffix;
};
