/**
 * Ransom Note
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