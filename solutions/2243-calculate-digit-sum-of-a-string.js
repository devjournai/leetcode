/**
 * Calculate Digit Sum Of A String
 * Intuition: The problem describes an iterative transformation process. We must simulate rounds of grouping digits, summing them, and merging the results until the string length falls below a threshold.
 * Approach: 1. Implement a `while` loop that continues as long as the string `s`'s length is greater than `k`. This loop represents each "round". 2. Inside the `while` loop, initialize an empty string `currentRoundResultBuilder` to accumulate the transformed segments. 3. Use a `for` loop to iterate through the current string `s` in steps of `k`, effectively creating consecutive groups. 4. For each group, extract the substring. Calculate the sum of its digits by converting each character to a number and accumulating. 5. Convert the calculated sum back into a string. 6. Append this sum string to `currentRoundResultBuilder`. 7. After the `for` loop completes, update the main string `s` with the `currentRoundResultBuilder` for the next round. 8. Once the `while` loop terminates, return the final string `s`.
 * Dry Run: s = "11111222223", k = 3
 * Round 1:
 *   currentStringState = "11111222223", k = 3. currentStringState.length (11) > k (3).
 *   currentRoundResultBuilder = ""
 *   segmentStartOffset = 0: currentSegment = "111". Sum digits: 1+1+1 = 3. sumRepresentation = "3". currentRoundResultBuilder = "3".
 *   segmentStartOffset = 3: currentSegment = "112". Sum digits: 1+1+2 = 4. sumRepresentation = "4". currentRoundResultBuilder = "34".
 *   segmentStartOffset = 6: currentSegment = "222". Sum digits: 2+2+2 = 6. sumRepresentation = "6". currentRoundResultBuilder = "346".
 *   segmentStartOffset = 9: currentSegment = "23".  Sum digits: 2+3 = 5. sumRepresentation = "5". currentRoundResultBuilder = "3465".
 *   Update currentStringState = "3465".
 * Round 2:
 *   currentStringState = "3465", k = 3. currentStringState.length (4) > k (3).
 *   currentRoundResultBuilder = ""
 *   segmentStartOffset = 0: currentSegment = "346". Sum digits: 3+4+6 = 13. sumRepresentation = "13". currentRoundResultBuilder = "13".
 *   segmentStartOffset = 3: currentSegment = "5".   Sum digits: 5 = 5. sumRepresentation = "5". currentRoundResultBuilder = "135".
 *   Update currentStringState = "135".
 * Round 3:
 *   currentStringState = "135", k = 3. currentStringState.length (3) > k (3) is false.
 * Loop terminates. Return "135".
 * Time Complexity: O(N * R)
 * Space Complexity: O(N)
 */
var digitSum = function (s, k) {
  let currentStringState = s;

  while (currentStringState.length > k) {
    let currentRoundResultBuilder = "";

    for (
      let segmentStartOffset = 0;
      segmentStartOffset < currentStringState.length;
      segmentStartOffset += k
    ) {
      let segmentEndOffset = Math.min(
        segmentStartOffset + k,
        currentStringState.length
      );
      let currentSegment = currentStringState.substring(
        segmentStartOffset,
        segmentEndOffset
      );

      let segmentDigitsSum = 0;
      for (let individualDigitChar of currentSegment) {
        let numericDigitValue = parseInt(individualDigitChar, 10);
        segmentDigitsSum += numericDigitValue;
      }

      let sumRepresentation = String(segmentDigitsSum);
      currentRoundResultBuilder += sumRepresentation;
    }

    currentStringState = currentRoundResultBuilder;
  }

  return currentStringState;
};
