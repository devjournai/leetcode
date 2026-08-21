/**
 * Largest Number After Mutating Substring
 * Intuition: `change[d]` replaces digit `d`. To maximize the number we should mutate a single contiguous substring, starting at the leftmost digit that strictly increases and stopping at the first later digit that would decrease.
 * Approach: 1. Split the number into a char array. 2. For each digit, if `change[d] > d`, write it and mark mutation started. 3. If `change[d] < d` after mutation started, break (end of substring). Equal digits may continue. 4. Join and return.
 * Dry Run: num = "132", change = [9,8,5,3,7,6,1,2,4,0] so 1→8, 3→3, 2→5.
 *   - 1→8 start; 3==3 keep; 2→5. Result "835".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maximumNumber = function (inputNumberString, digitMapArray) {
  const characterArray = inputNumberString.split("");
  let hasMutationStarted = false;

  for (
    let processingIndex = 0;
    processingIndex < characterArray.length;
    processingIndex++
  ) {
    const currentParsedDigit = parseInt(characterArray[processingIndex]);
    const mappedReplacementDigit = digitMapArray[currentParsedDigit];

    if (mappedReplacementDigit > currentParsedDigit) {
      characterArray[processingIndex] = mappedReplacementDigit.toString();
      hasMutationStarted = true;
    } else if (
      mappedReplacementDigit < currentParsedDigit &&
      hasMutationStarted
    ) {
      break;
    }
  }

  return characterArray.join("");
};
