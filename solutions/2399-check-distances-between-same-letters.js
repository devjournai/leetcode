/**
 * Check Distances Between Same Letters
 * Intuition: Since each letter in the input string 's' appears exactly twice, we can efficiently verify spacing by tracking the first occurrence of each letter. When a letter appears for the second time, we instantly have both indices and can check if the calculated distance between them matches the required distance from the 'distance' array.
 * Approach: 1. Initialize an array 'firstSeenPositions' of size 26 with a sentinel value (-1) to record the initial index of each character ('a' through 'z'). 2. Iterate through the input string 's' using an index 'currentStringIndex'. 3. For each character 'characterAtCurrentIndex': a. Convert the character to its 0-25 'alphabeticalReference'. b. If 'firstSeenPositions[alphabeticalReference]' is -1, it indicates this is the first encounter of this character, so store 'currentStringIndex' in 'firstSeenPositions[alphabeticalReference]'. c. If 'firstSeenPositions[alphabeticalReference]' is not -1, it signifies the second encounter. Retrieve the 'initialPosition' from 'firstSeenPositions[alphabeticalReference]'. Calculate the 'measuredDistance' as 'currentStringIndex - initialPosition - 1'. Compare 'measuredDistance' with 'distance[alphabeticalReference]' (the 'requiredDistance'). If they do not match, return 'false'. 4. If the loop completes without returning 'false', it means all letters have correct spacing, so return 'true'.
 * Dry Run: s = "aa", distance = [0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
 * 1. `firstSeenPositions` = `[-1, -1, ..., -1]` (length 26).
 * 2. `alphabetOffset` = 'a'.charCodeAt(0) (97).
 * 3. `stringLengthIdentifier` = 2.
 * 4. Loop from `currentStringIndex` = 0 to 1:
 *    - `currentStringIndex` = 0:
 *      - `characterAtCurrentIndex` = 'a'
 *      - `alphabeticalReference` = 'a'.charCodeAt(0) - 97 = 0.
 *      - `firstSeenPositions[0]` is -1 (true).
 *      - Set `firstSeenPositions[0] = 0`.
 *      - `firstSeenPositions` is now `[0, -1, ..., -1]`.
 *    - `currentStringIndex` = 1:
 *      - `characterAtCurrentIndex` = 'a'
 *      - `alphabeticalReference` = 'a'.charCodeAt(0) - 97 = 0.
 *      - `firstSeenPositions[0]` is 0 (not -1, false branch taken).
 *      - `initialPosition` = `firstSeenPositions[0]` which is 0.
 *      - `measuredDistance` = `1 - 0 - 1 = 0`.
 *      - `requiredDistance` = `distance[0]` which is 0.
 *      - `measuredDistance` (0) !== `requiredDistance` (0) is false. Continue.
 * 5. Loop finishes. All checks passed. Return `true`.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var checkDistances = function (s, distance) {
  const firstSeenPositions = new Array(26).fill(-1);
  const alphabetOffset = "a".charCodeAt(0);
  const stringLengthIdentifier = s.length;

  for (
    let currentStringIndex = 0;
    currentStringIndex < stringLengthIdentifier;
    currentStringIndex++
  ) {
    const characterAtCurrentIndex = s[currentStringIndex];
    const alphabeticalReference =
      characterAtCurrentIndex.charCodeAt(0) - alphabetOffset;

    if (firstSeenPositions[alphabeticalReference] === -1) {
      firstSeenPositions[alphabeticalReference] = currentStringIndex;
    } else {
      const initialPosition = firstSeenPositions[alphabeticalReference];
      const measuredDistance = currentStringIndex - initialPosition - 1;
      const requiredDistance = distance[alphabeticalReference];

      if (measuredDistance !== requiredDistance) {
        return false;
      }
    }
  }

  return true;
};
