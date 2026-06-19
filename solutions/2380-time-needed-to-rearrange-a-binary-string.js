/**
 * Time Needed To Rearrange A Binary String
 * Intuition: The '0' characters effectively bubble to the right by swapping with adjacent '1's. Each second, all '01' pairs swap to '10'. This implies a single pass through the string is sufficient per second to enact all changes, provided the iteration correctly accounts for the new state. Specifically, if '01' at `i, i+1` becomes '10', the new '1' at `i` cannot participate in a '01' pair with `s[i-1]` in the same second, and the new '0' at `i+1` cannot participate in a '01' pair with `s[i+2]` for the same reason. Incrementing the loop index by an additional step after a swap ensures the algorithm effectively processes this simultaneous change correctly.
 * Approach:
 * 1. Initialize a counter, `totalElapsedSeconds`, to track the time.
 * 2. Convert the input string `s` into a mutable character array, `characterArray`.
 * 3. Enter a main loop that continues as long as a '01' pair is found within the `characterArray` during a second's pass. A boolean flag, `swapOccurredInPass`, tracks if any swaps happened in the current second.
 * 4. Inside the main loop, reset `swapOccurredInPass` to `false`.
 * 5. Iterate through the `characterArray` using an index, `scanningIndex`, from the beginning up to the second-to-last character.
 * 6. If `characterArray[scanningIndex]` is '0' and `characterArray[scanningIndex + 1]` is '1':
 *    a. Swap `characterArray[scanningIndex]` and `characterArray[scanningIndex + 1]`.
 *    b. Set `swapOccurredInPass` to `true`.
 *    c. Increment `scanningIndex` by an additional step to correctly simulate simultaneous swaps (skipping the new '1' that just moved left).
 * 7. After the inner iteration, if `swapOccurredInPass` is `true`, increment `totalElapsedSeconds`.
 * 8. If `swapOccurredInPass` is `false`, it means no '01' pairs were found, so exit the main loop.
 * 9. Return `totalElapsedSeconds`.
 * Dry Run: s = "0011"
 * Initial: totalElapsedSeconds = 0, characterArray = ['0', '0', '1', '1']
 *
 * Loop 1 (totalElapsedSeconds = 0):
 *   swapOccurredInPass = false
 *   scanningIndex = 0: charArray[0]='0', charArray[1]='0'. No swap.
 *   scanningIndex = 1: charArray[1]='0', charArray[2]='1'. Match!
 *     Swap: charArray becomes ['0', '1', '0', '1']
 *     swapOccurredInPass = true
 *     scanningIndex becomes 2 (1 + 1)
 *   scanningIndex = 2: charArray[2]='0', charArray[3]='1'. Match!
 *     Swap: charArray becomes ['0', '1', '1', '0']
 *     swapOccurredInPass = true
 *     scanningIndex becomes 3 (2 + 1)
 *   Inner loop ends.
 *   `swapOccurredInPass` is true. Increment `totalElapsedSeconds`.
 *   totalElapsedSeconds = 1.
 *
 * Loop 2 (totalElapsedSeconds = 1):
 *   swapOccurredInPass = false
 *   scanningIndex = 0: charArray[0]='0', charArray[1]='1'. Match!
 *     Swap: charArray becomes ['1', '0', '1', '0']
 *     swapOccurredInPass = true
 *     scanningIndex becomes 1 (0 + 1)
 *   scanningIndex = 1: charArray[1]='0', charArray[2]='1'. Match!
 *     Swap: charArray becomes ['1', '1', '0', '0']
 *     swapOccurredInPass = true
 *     scanningIndex becomes 2 (1 + 1)
 *   Inner loop ends.
 *   `swapOccurredInPass` is true. Increment `totalElapsedSeconds`.
 *   totalElapsedSeconds = 2.
 *
 * Loop 3 (totalElapsedSeconds = 2):
 *   swapOccurredInPass = false
 *   scanningIndex = 0: charArray[0]='1', charArray[1]='1'. No swap.
 *   scanningIndex = 1: charArray[1]='1', charArray[2]='0'. No swap.
 *   scanningIndex = 2: charArray[2]='0', charArray[3]='0'. No swap.
 *   Inner loop ends.
 *   `swapOccurredInPass` is false. Exit main loop.
 *
 * Return `totalElapsedSeconds` = 2.
 * Time Complexity: O(N * S)
 * Space Complexity: O(N)
 */
var secondsToRemoveOccurrences = function (s) {
  const characterArray = s.split("");
  let totalElapsedSeconds = 0;
  const lengthOfSequence = characterArray.length;

  let swapOccurredInPass = true;
  while (swapOccurredInPass) {
    swapOccurredInPass = false;
    for (
      let scanningIndex = 0;
      scanningIndex < lengthOfSequence - 1;
      scanningIndex++
    ) {
      if (
        characterArray[scanningIndex] === "0" &&
        characterArray[scanningIndex + 1] === "1"
      ) {
        characterArray[scanningIndex] = "1";
        characterArray[scanningIndex + 1] = "0";
        swapOccurredInPass = true;
        scanningIndex++;
      }
    }
    if (swapOccurredInPass) {
      totalElapsedSeconds++;
    }
  }

  return totalElapsedSeconds;
};
