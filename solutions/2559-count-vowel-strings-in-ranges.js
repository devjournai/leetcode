/**
 * Count Vowel Strings In Ranges
 * Intuition: This problem requires efficiently counting qualifying strings within multiple given ranges. A prefix sum array is ideal for range queries as it allows O(1) retrieval after an initial O(N) precomputation. We first determine which strings qualify (start and end with a vowel) and then build a prefix sum array from these qualifications.
 * Approach: 1. Initialize a Set for efficient vowel lookup. 2. Create a boolean array, `vowelFlags`, where each element indicates if the corresponding word is a vowel string. 3. Construct a prefix sum array, `prefixSumArray`, based on `vowelFlags`, where `prefixSumArray[i]` stores the count of vowel strings up to `words[i-1]`. 4. For each query `[li, ri]`, calculate the answer as `prefixSumArray[ri + 1] - prefixSumArray[li]`. 5. Collect these answers into a result array.
 * Dry Run:
 * words = ["aba","bcb","ece","ada","ssa"], queries = [[0,2],[1,4],[1,1]]
 * 1. vowelLetters = {'a', 'e', 'i', 'o', 'u'}
 * 2. `vowelFlags` construction (for words.length = 5):
 *    - words[0]="aba": 'a' (vowel), 'a' (vowel) -> true. `vowelFlags[0]=true`
 *    - words[1]="bcb": 'b' (consonant), 'b' (consonant) -> false. `vowelFlags[1]=false`
 *    - words[2]="ece": 'e' (vowel), 'e' (vowel) -> true. `vowelFlags[2]=true`
 *    - words[3]="ada": 'a' (vowel), 'a' (vowel) -> true. `vowelFlags[3]=true`
 *    - words[4]="ssa": 's' (consonant), 'a' (vowel) -> false. `vowelFlags[4]=false`
 *    `vowelFlags` = [true, false, true, true, false]
 * 3. `prefixSumArray` construction (size 6):
 *    - `prefixSumArray[0] = 0`
 *    - `prefixSumArray[1] = prefixSumArray[0] + (vowelFlags[0]?1:0) = 0 + 1 = 1`
 *    - `prefixSumArray[2] = prefixSumArray[1] + (vowelFlags[1]?1:0) = 1 + 0 = 1`
 *    - `prefixSumArray[3] = prefixSumArray[2] + (vowelFlags[2]?1:0) = 1 + 1 = 2`
 *    - `prefixSumArray[4] = prefixSumArray[3] + (vowelFlags[3]?1:0) = 2 + 1 = 3`
 *    - `prefixSumArray[5] = prefixSumArray[4] + (vowelFlags[4]?1:0) = 3 + 0 = 3`
 *    `prefixSumArray` = [0, 1, 1, 2, 3, 3]
 * 4. Process `queries` (for queries.length = 3):
 *    - `queryIndex=0`, `currentQuery=[0,2]`: `leftBound=0`, `rightBound=2`. Result = `prefixSumArray[2+1] - prefixSumArray[0] = prefixSumArray[3] - prefixSumArray[0] = 2 - 0 = 2`.
 *    - `queryIndex=1`, `currentQuery=[1,4]`: `leftBound=1`, `rightBound=4`. Result = `prefixSumArray[4+1] - prefixSumArray[1] = prefixSumArray[5] - prefixSumArray[1] = 3 - 1 = 2`.
 *    - `queryIndex=2`, `currentQuery=[1,1]`: `leftBound=1`, `rightBound=1`. Result = `prefixSumArray[1+1] - prefixSumArray[1] = prefixSumArray[2] - prefixSumArray[1] = 1 - 1 = 0`.
 * 5. `resultsArray` = [2, 2, 0]
 * Time Complexity: O(N + Q)
 * Space Complexity: O(N + Q)
 */
var vowelStrings = function (words, queries) {
  const vowelLetters = new Set(["a", "e", "i", "o", "u"]);
  const wordCount = words.length;
  const vowelFlags = new Array(wordCount);

  for (let wordIndex = 0; wordIndex < wordCount; wordIndex++) {
    const currentWord = words[wordIndex];
    const firstCharacter = currentWord[0];
    const lastCharacter = currentWord.at(-1);
    const isVowelStart = vowelLetters.has(firstCharacter);
    const isVowelEnd = vowelLetters.has(lastCharacter);
    vowelFlags[wordIndex] = isVowelStart && isVowelEnd;
  }

  const prefixSumArray = new Array(wordCount + 1).fill(0);
  for (let prefixIndex = 0; prefixIndex < wordCount; prefixIndex++) {
    const currentAddition = vowelFlags[prefixIndex] ? 1 : 0;
    prefixSumArray[prefixIndex + 1] =
      prefixSumArray[prefixIndex] + currentAddition;
  }

  const queryCount = queries.length;
  const resultsArray = new Array(queryCount);

  for (let queryIndex = 0; queryIndex < queryCount; queryIndex++) {
    const currentQuery = queries[queryIndex];
    const leftBound = currentQuery[0];
    const rightBound = currentQuery[1];
    const calculatedResult =
      prefixSumArray[rightBound + 1] - prefixSumArray[leftBound];
    resultsArray[queryIndex] = calculatedResult;
  }

  return resultsArray;
};
