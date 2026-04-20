/**
 * Search Suggestions System
 * Time Complexity: O(N * L * log N + M * N)
 * Space Complexity: O(M * L)
 */
var suggestedProducts = function (products, searchWord) {
  products.sort();

  const searchWordLength = searchWord.length;
  const finalSuggestions = new Array(searchWordLength);

  let currentPrefixBuilder = "";
  let leftPointer = 0;
  let rightPointer = products.length - 1;

  for (
    let charIteration = 0;
    charIteration < searchWordLength;
    charIteration++
  ) {
    const nextInputCharacter = searchWord[charIteration];
    currentPrefixBuilder += nextInputCharacter;

    while (
      leftPointer <= rightPointer &&
      !products[leftPointer].startsWith(currentPrefixBuilder)
    ) {
      leftPointer++;
    }

    while (
      leftPointer <= rightPointer &&
      !products[rightPointer].startsWith(currentPrefixBuilder)
    ) {
      rightPointer--;
    }

    const currentMatchResults = [];
    const maximumResults = 3;
    for (
      let resultCounter = 0;
      resultCounter < maximumResults;
      resultCounter++
    ) {
      const candidateProductIndex = leftPointer + resultCounter;
      if (candidateProductIndex <= rightPointer) {
        currentMatchResults.push(products[candidateProductIndex]);
      } else {
        break;
      }
    }
    finalSuggestions[charIteration] = currentMatchResults;
  }

  return finalSuggestions;
};
