/**
 * Longest Happy String
 * Intuition: Always append the currently most frequent letter unless that would make three in a row; then use the second-most frequent.
 * Approach: 1. Keep {a,b,c} counts. 2. Sort by remaining count. 3. Prefer the top letter if it would not create a triple at the end; else try the second. 4. Stop when neither is safe. 5. Join the built characters.
 * Dry Run: a=1, b=1, c=7.
 *   - Prefer c,c then b (cannot ccc), then c,c, a, then c,c. Result like "ccaccbcc" / "ccbccacc".
 * Time Complexity: O(a + b + c)
 * Space Complexity: O(a + b + c)
 */
var longestDiverseString = function (a, b, c) {
  const characterDataArray = [
    { charIdentifier: "a", countValue: a },
    { charIdentifier: "b", countValue: b },
    { charIdentifier: "c", countValue: c },
  ];
  const stringOutputCollector = [];

  let continueLooping = true;
  while (continueLooping) {
    characterDataArray.sort((valX, valY) => valY.countValue - valX.countValue);

    const firstCandidateChar = characterDataArray[0].charIdentifier;
    const firstCandidateCount = characterDataArray[0].countValue;

    const secondCandidateChar = characterDataArray[1].charIdentifier;
    const secondCandidateCount = characterDataArray[1].countValue;

    const currentStringLength = stringOutputCollector.length;
    let potentialAddedCharacter = null;
    let updateDataIndex = -1;

    const isFirstCandidateAvailable = firstCandidateCount > 0;
    const isFirstCandidateSafe = !(
      currentStringLength >= 2 &&
      stringOutputCollector[currentStringLength - 1] === firstCandidateChar &&
      stringOutputCollector[currentStringLength - 2] === firstCandidateChar
    );

    if (isFirstCandidateAvailable && isFirstCandidateSafe) {
      potentialAddedCharacter = firstCandidateChar;
      updateDataIndex = 0;
    } else {
      const isSecondCandidateAvailable = secondCandidateCount > 0;
      const isSecondCandidateSafe = !(
        currentStringLength >= 2 &&
        stringOutputCollector[currentStringLength - 1] ===
          secondCandidateChar &&
        stringOutputCollector[currentStringLength - 2] === secondCandidateChar
      );

      if (isSecondCandidateAvailable && isSecondCandidateSafe) {
        potentialAddedCharacter = secondCandidateChar;
        updateDataIndex = 1;
      }
    }

    if (potentialAddedCharacter !== null) {
      stringOutputCollector.push(potentialAddedCharacter);
      characterDataArray[updateDataIndex].countValue--;
    } else {
      continueLooping = false;
    }
  }

  return stringOutputCollector.join("");
};
