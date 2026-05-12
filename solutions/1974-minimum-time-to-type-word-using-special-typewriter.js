/**
 * Minimum Time To Type Word Using Special Typewriter
 * Intuition: To minimize time, for each character, choose the shortest path (clockwise or counter-clockwise) from the current pointer position to the target character, then add one second for typing.
 * Approach: 1. Initialize current pointer to 'a' and total time to zero. 2. Iterate through each character of the input word. 3. For each target character, calculate the absolute difference in ASCII values with the current pointer character. This gives the "straight" distance. 4. Calculate the "circular" distance as 26 minus the straight distance. 5. The minimum rotation time is the smaller of these two distances. 6. Add this minimum rotation time plus one (for typing) to the total time. 7. Update the current pointer character to the newly typed character. 8. Return the accumulated total time.
 * Dry Run: word = "cba"
 *   1. currentPointerCharacter = 'a', totalSecondsTaken = 0
 *   2. nextCharacterToType = 'c'
 *      - charCurrentCode = 97 ('a')
 *      - charTargetCode = 99 ('c')
 *      - straightDistance = Math.abs(99 - 97) = 2
 *      - circularDistance = 26 - 2 = 24
 *      - minimumMovesNeeded = Math.min(2, 24) = 2
 *      - totalSecondsTaken = 0 + 2 + 1 = 3
 *      - currentPointerCharacter = 'c'
 *   3. nextCharacterToType = 'b'
 *      - charCurrentCode = 99 ('c')
 *      - charTargetCode = 98 ('b')
 *      - straightDistance = Math.abs(98 - 99) = 1
 *      - circularDistance = 26 - 1 = 25
 *      - minimumMovesNeeded = Math.min(1, 25) = 1
 *      - totalSecondsTaken = 3 + 1 + 1 = 5
 *      - currentPointerCharacter = 'b'
 *   4. nextCharacterToType = 'a'
 *      - charCurrentCode = 98 ('b')
 *      - charTargetCode = 97 ('a')
 *      - straightDistance = Math.abs(97 - 98) = 1
 *      - circularDistance = 26 - 1 = 25
 *      - minimumMovesNeeded = Math.min(1, 25) = 1
 *      - totalSecondsTaken = 5 + 1 + 1 = 7
 *      - currentPointerCharacter = 'a'
 *   5. Return 7.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minTimeToType = function (word) {
  let currentPointerCharacter = "a";
  let totalSecondsTaken = 0;

  for (let charIndex = 0; charIndex < word.length; charIndex++) {
    const nextCharacterToType = word[charIndex];
    const charCurrentCode = currentPointerCharacter.charCodeAt(0);
    const charTargetCode = nextCharacterToType.charCodeAt(0);

    const straightDistance = Math.abs(charTargetCode - charCurrentCode);
    const circularDistance = 26 - straightDistance;

    const minimumMovesNeeded = Math.min(straightDistance, circularDistance);

    totalSecondsTaken += minimumMovesNeeded + 1;
    currentPointerCharacter = nextCharacterToType;
  }

  return totalSecondsTaken;
};
