/**
 * Longest Happy String
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
