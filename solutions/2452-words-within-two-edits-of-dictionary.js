/**
 * Words Within Two Edits of Dictionary
 * Time Complexity: O(N * M * L)
 * Space Complexity: O(N * L)
 */
var twoEditWords = function (queries, dictionary) {
  const matchedWordsList = [];

  const isWithinTwoEdits = (wordA, wordB) => {
    let editDifferences = 0;
    for (
      let characterPosition = 0;
      characterPosition < wordA.length;
      characterPosition++
    ) {
      if (wordA[characterPosition] !== wordB[characterPosition]) {
        editDifferences++;
        if (editDifferences > 2) {
          return false;
        }
      }
    }
    return true;
  };

  for (
    let queryListIndex = 0;
    queryListIndex < queries.length;
    queryListIndex++
  ) {
    const currentQueryString = queries[queryListIndex];
    let foundMatchForQuery = false;

    for (
      let dictionaryListIndex = 0;
      dictionaryListIndex < dictionary.length;
      dictionaryListIndex++
    ) {
      const currentDictWord = dictionary[dictionaryListIndex];
      const canMatch = isWithinTwoEdits(currentQueryString, currentDictWord);

      if (canMatch) {
        matchedWordsList.push(currentQueryString);
        foundMatchForQuery = true;
        break;
      }
    }
  }

  return matchedWordsList;
};
