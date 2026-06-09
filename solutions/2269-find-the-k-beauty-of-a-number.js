/**
 * Find The K Beauty Of A Number
 * Intuition: Convert the number to a string to enable easy extraction of contiguous substrings of a specified length. Then, iterate through all possible substrings, convert each back to an integer, and check if it satisfies the divisibility condition.
 * Approach: 1. Convert the input integer `num` into its string representation to facilitate substring operations. 2. Initialize a counter, `beautyCount`, to track the number of k-beauty substrings found. 3. Determine the total length of the number's string representation. 4. Use a `for` loop to iterate through the string, starting from the first character up to the point where a `k`-length substring can still be formed (i.e., `stringLength - k`). 5. Inside the loop, extract the current substring of length `k` using `slice()`. 6. Convert this extracted substring back into an integer using `parseInt()`. 7. Implement the divisibility conditions: check if the `parsedValue` is not zero (as zero is not a divisor) AND if the original `num` is perfectly divisible by `parsedValue`. 8. If both conditions are true, increment `beautyCount`. 9. After the loop completes, return the final `beautyCount`.
 * Dry Run: num = 240, k = 2
 * numberAsString = "240"
 * beautyCount = 0
 * stringLength = 3
 * startIndex = 0:
 * currentSubstring = numberAsString.slice(0, 2) which is "24"
 * parsedValue = 24
 * Condition: (24 !== 0 && 240 % 24 === 0) -> (true && true) -> true.
 * beautyCount becomes 1.
 * startIndex = 1:
 * currentSubstring = numberAsString.slice(1, 3) which is "40"
 * parsedValue = 40
 * Condition: (40 !== 0 && 240 % 40 === 0) -> (true && true) -> true.
 * beautyCount becomes 2.
 * Loop finishes as `startIndex = 2` is not `<= stringLength - k` (which is `3 - 2 = 1`).
 * Return 2.
 * Time Complexity: O(N * k)
 * Space Complexity: O(N)
 */
var divisorSubstrings = function (num, k) {
  const numberAsString = num.toString();
  let beautyCount = 0;
  const stringLength = numberAsString.length;

  for (let startIndex = 0; startIndex <= stringLength - k; startIndex++) {
    const currentSubstring = numberAsString.slice(startIndex, startIndex + k);
    const parsedValue = parseInt(currentSubstring);

    if (parsedValue !== 0 && num % parsedValue === 0) {
      beautyCount++;
    }
  }

  return beautyCount;
};
