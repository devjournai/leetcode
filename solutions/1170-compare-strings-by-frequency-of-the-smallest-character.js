/**
 * Compare Strings By Frequency Of The Smallest Character
 * Intuition: f(s) is the count of s’s smallest letter. For each query, count how many words have strictly larger f. Sort word frequencies and binary-search the first value > f(query).
 * Approach: 1. Compute f for every word and sort. 2. For each query, compute f then lower-bound the first strictly greater word frequency. 3. Push n - that index.
 * Dry Run: queries = ["cbd"], words = ["zaaaz"].
 *   - f("cbd")=1 (one 'b'), f("zaaaz")=3 (three 'a's). 3>1 so [1].
 * Time Complexity: O(N * L_word + M * L_query + (N + M) log N)
 * Space Complexity: O(N + M)
 */
var numSmallerByFrequency = function (queriesInput, wordsInput) {
  function calculateSmallestCharacterFrequency(inputStringParam) {
    let currentMinimumCharacter = "z";
    let minimumCharacterOccurrenceCount = 0;

    for (let singleChar of inputStringParam) {
      if (singleChar < currentMinimumCharacter) {
        currentMinimumCharacter = singleChar;
        minimumCharacterOccurrenceCount = 1;
      } else if (singleChar === currentMinimumCharacter) {
        minimumCharacterOccurrenceCount++;
      }
    }
    return minimumCharacterOccurrenceCount;
  }

  const frequenciesOfWords = [];
  let wordIndex = 0;
  while (wordIndex < wordsInput.length) {
    const frequencyForCurrentWord = calculateSmallestCharacterFrequency(
      wordsInput[wordIndex]
    );
    frequenciesOfWords.push(frequencyForCurrentWord);
    wordIndex++;
  }
  frequenciesOfWords.sort((valueOne, valueTwo) => valueOne - valueTwo);

  const finalResultArray = [];
  let queryIndex = 0;
  while (queryIndex < queriesInput.length) {
    const frequencyForCurrentQuery = calculateSmallestCharacterFrequency(
      queriesInput[queryIndex]
    );

    let searchLeftPointer = 0;
    let searchRightPointer = frequenciesOfWords.length;

    while (searchLeftPointer < searchRightPointer) {
      const midValuePointer = Math.floor(
        (searchLeftPointer + searchRightPointer) / 2
      );
      if (frequenciesOfWords[midValuePointer] <= frequencyForCurrentQuery) {
        searchLeftPointer = midValuePointer + 1;
      } else {
        searchRightPointer = midValuePointer;
      }
    }
    const countOfLargerFrequencies =
      frequenciesOfWords.length - searchLeftPointer;
    finalResultArray.push(countOfLargerFrequencies);
    queryIndex++;
  }

  return finalResultArray;
};
