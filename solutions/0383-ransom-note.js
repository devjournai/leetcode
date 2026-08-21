/**
 * Ransom Note
 * Intuition: The note can be built only if every required character appears at least as often in the magazine, so count magazine letters then decrement while scanning the note.
 * Approach: 1. Fill a Map with magazine character frequencies. 2. For each note character, fail if the remaining count is < 1, else decrement. 3. Return true if the note is exhausted.
 * Dry Run: ransomNote = "aa", magazine = "aab". Counts a:2,b:1; consume a→1, a→0 → true.
 * Time Complexity: O(M + N)
 * Space Complexity: O(1)
 */
var canConstruct = function (ransomNote, magazine) {
  const magazineCharacters = new Map();

  for (const charFromMagazine of magazine) {
    const frequencyValue = magazineCharacters.get(charFromMagazine) || 0;
    magazineCharacters.set(charFromMagazine, frequencyValue + 1);
  }

  for (let notePosition = 0; notePosition < ransomNote.length; notePosition++) {
    const charToConstruct = ransomNote[notePosition];
    const currentMagazineCount = magazineCharacters.get(charToConstruct) || 0;

    if (currentMagazineCount < 1) {
      return false;
    }
    magazineCharacters.set(charToConstruct, currentMagazineCount - 1);
  }

  return true;
};
