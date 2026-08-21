/**
 * Search Suggestions System
 * Intuition: After sorting products, the matches for a growing prefix form a shrinking contiguous range. Take up to three products from the left of that range.
 * Approach: 1. Sort products. 2. Maintain leftPointer/rightPointer over the current prefix window. 3. For each next character, advance left while products[left] does not start with the prefix, shrink right similarly. 4. Collect up to 3 products from leftPointer. 5. Return finalSuggestions.
 * Dry Run: products=["mobile","mouse","moneypot","monitor","mousepad"], searchWord="mouse"
 *   After "m": range of m-words, first 3 mobile,moneypot,monitor.
 *   After "mo": same. After "mou": mouse,mousepad. After "mous"/"mouse": mouse,mousepad.
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
