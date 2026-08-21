/**
 * Minimum Number of Pushes to Type Word II
 * Intuition: To minimize the total pushes, characters that appear more frequently in the word should be assigned to key positions that require fewer pushes (e.g., first push on a key).
 * Approach: 1. Count the frequency of each character in the given word. 2. Sort these frequencies in descending order to prioritize the most frequent characters. 3. Iterate through the sorted frequencies, assigning the first 8 distinct characters to the first push position (1 push), the next 8 distinct characters to the second push position (2 pushes), and so on. Sum the total pushes required.
 * Dry Run: word = "aabbccddeeffgghhiii"
 *   1. Count frequencies: {a:2, b:2, c:2, d:2, e:2, f:2, g:2, h:2, i:3}
 *   2. Sorted frequencies: [3, 2, 2, 2, 2, 2, 2, 2, 2] (for 'i', 'a'...'h' in some order)
 *   3. Calculate total pushes:
 *      - letterIndex = 0 (freq 3): pushes = floor(0/8) + 1 = 1. totalPushes = 3 * 1 = 3.
 *      - letterIndex = 1 (freq 2): pushes = floor(1/8) + 1 = 1. totalPushes = 3 + (2 * 1) = 5.
 *      - letterIndex = 2 (freq 2): pushes = floor(2/8) + 1 = 1. totalPushes = 5 + (2 * 1) = 7.
 *      - letterIndex = 3 (freq 2): pushes = floor(3/8) + 1 = 1. totalPushes = 7 + (2 * 1) = 9.
 *      - letterIndex = 4 (freq 2): pushes = floor(4/8) + 1 = 1. totalPushes = 9 + (2 * 1) = 11.
 *      - letterIndex = 5 (freq 2): pushes = floor(5/8) + 1 = 1. totalPushes = 11 + (2 * 1) = 13.
 *      - letterIndex = 6 (freq 2): pushes = floor(6/8) + 1 = 1. totalPushes = 13 + (2 * 1) = 15.
 *      - letterIndex = 7 (freq 2): pushes = floor(7/8) + 1 = 1. totalPushes = 15 + (2 * 1) = 17.
 *      - letterIndex = 8 (freq 2): pushes = floor(8/8) + 1 = 2. totalPushes = 17 + (2 * 2) = 21.
 *   Result: 21
 * Time Complexity: O(L)
 * Space Complexity: O(1)
 */
var minimumPushes = function (word) {
  const letterFrequencies = new Map();
  const wordLength = word.length;

  for (
    let currentCharacterIndex = 0;
    currentCharacterIndex < wordLength;
    currentCharacterIndex++
  ) {
    const characterKey = word[currentCharacterIndex];
    letterFrequencies.set(
      characterKey,
      (letterFrequencies.get(characterKey) || 0) + 1
    );
  }

  const sortedFrequencies = Array.from(letterFrequencies.values());
  sortedFrequencies.sort((firstValue, secondValue) => secondValue - firstValue);

  let totalPushesAccumulator = 0;
  let pushAssignmentIndex = 0;
  const keyCapacity = 8;

  while (pushAssignmentIndex < sortedFrequencies.length) {
    const currentLetterCount = sortedFrequencies[pushAssignmentIndex];
    const pushCost = Math.floor(pushAssignmentIndex / keyCapacity) + 1;
    totalPushesAccumulator += currentLetterCount * pushCost;
    pushAssignmentIndex++;
  }

  return totalPushesAccumulator;
};
