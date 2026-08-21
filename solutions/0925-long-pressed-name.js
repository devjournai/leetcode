/**
 * Long Pressed Name
 * Intuition: typed is a long-press of name iff they have the same run-length characters and each typed run is at least as long as name’s.
 * Approach: 1. `createCharacterRuns` walks equal-letter streaks into [char, count] pairs. 2. If run-list lengths differ, false. 3. Zip runs: same char and nameCount ≤ typedCount. 4. Else true.
 * Dry Run: name="alex", typed="aaleex" → [a1,l1,e1,x1] vs [a2,l1,e2,x1] all typed ≥ name → true. typed="aaleexa" extra a-run → false.
 * Time Complexity: O(N + M)
 * Space Complexity: O(N + M)
 */
var isLongPressedName = function (name, typed) {
  const createCharacterRuns = (inputStringForRLE) => {
    const characterRunsList = [];
    let primaryScanIndex = 0;

    while (primaryScanIndex < inputStringForRLE.length) {
      const currentRunCharacter = inputStringForRLE[primaryScanIndex];
      let runLengthCount = 0;
      let secondaryScanIndex = primaryScanIndex;

      while (
        secondaryScanIndex < inputStringForRLE.length &&
        inputStringForRLE[secondaryScanIndex] === currentRunCharacter
      ) {
        runLengthCount++;
        secondaryScanIndex++;
      }
      characterRunsList.push([currentRunCharacter, runLengthCount]);
      primaryScanIndex = secondaryScanIndex;
    }
    return characterRunsList;
  };

  const nameRLEStructure = createCharacterRuns(name);
  const typedRLEStructure = createCharacterRuns(typed);

  const nameRLELength = nameRLEStructure.length;
  const typedRLELength = typedRLEStructure.length;

  if (nameRLELength !== typedRLELength) {
    return false;
  }

  let comparisonIndex = 0;
  while (comparisonIndex < nameRLELength) {
    const nameCurrentBlock = nameRLEStructure[comparisonIndex];
    const typedCurrentBlock = typedRLEStructure[comparisonIndex];

    const nameCharacterValue = nameCurrentBlock[0];
    const nameCountValue = nameCurrentBlock[1];

    const typedCharacterValue = typedCurrentBlock[0];
    const typedCountValue = typedCurrentBlock[1];

    if (
      nameCharacterValue !== typedCharacterValue ||
      nameCountValue > typedCountValue
    ) {
      return false;
    }
    comparisonIndex++;
  }

  return true;
};
