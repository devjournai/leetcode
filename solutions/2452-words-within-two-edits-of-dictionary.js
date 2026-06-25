/**
 * Words Within Two Edits Of Dictionary
 * Intuition: For each word in the 'queries' list, we need to check if it is within two edits of *any* word in the 'dictionary'. If such a dictionary word is found, the query word is a match and should be added to our result.
 * Approach: 1. Initialize an empty list to store the matching query words. 2. Iterate through each query word in the 'queries' array. 3. For each query word, iterate through every word in the 'dictionary' array. 4. Inside this nested loop, compare the current query word character by character with the current dictionary word, counting the number of differing characters (edits). 5. If the number of edits exceeds 2 at any point during character comparison, we can stop comparing characters for the current pair of words and move to the next dictionary word, as it cannot be a match. 6. If, after comparing all characters, the total edits for the current query word and dictionary word is 2 or less, then the query word is a match. Add it to our result list and break out of the dictionary iteration for the current query word (since we only need one dictionary word to satisfy the condition). 7. After checking all query words, return the accumulated list of matching words.
 * Dry Run:
 * queries = ["qwe", "rty"]
 * dictionary = ["qaz", "wsx", "rdx"]
 *
 * resultantWordsArray = []
 * commonWordLength = 3
 *
 * --- Processing query "qwe" (currentQueryString) ---
 *   --- Comparing "qwe" with "qaz" (currentDictionaryWord) ---
 *     editCounter = 0
 *     characterPointer = 0: 'q' === 'q' (editCounter = 0)
 *     characterPointer = 1: 'w' !== 'a' (editCounter = 1)
 *     characterPointer = 2: 'e' !== 'z' (editCounter = 2)
 *     Loop ends. editCounter (2) <= 2.
 *     Add "qwe" to resultantWordsArray. resultantWordsArray = ["qwe"]
 *     Break from dictionary loop for "qwe".
 *
 * --- Processing query "rty" (currentQueryString) ---
 *   --- Comparing "rty" with "qaz" (currentDictionaryWord) ---
 *     editCounter = 0
 *     characterPointer = 0: 'r' !== 'q' (editCounter = 1)
 *     characterPointer = 1: 't' !== 'a' (editCounter = 2)
 *     characterPointer = 2: 'y' !== 'z' (editCounter = 3)
 *     Loop ends. editCounter (3) > 2. Not a match.
 *
 *   --- Comparing "rty" with "wsx" (currentDictionaryWord) ---
 *     editCounter = 0
 *     characterPointer = 0: 'r' !== 'w' (editCounter = 1)
 *     characterPointer = 1: 't' !== 's' (editCounter = 2)
 *     characterPointer = 2: 'y' !== 'x' (editCounter = 3)
 *     Loop ends. editCounter (3) > 2. Not a match.
 *
 *   --- Comparing "rty" with "rdx" (currentDictionaryWord) ---
 *     editCounter = 0
 *     characterPointer = 0: 'r' === 'r' (editCounter = 0)
 *     characterPointer = 1: 't' !== 'd' (editCounter = 1)
 *     characterPointer = 2: 'y' !== 'x' (editCounter = 2)
 *     Loop ends. editCounter (2) <= 2.
 *     Add "rty" to resultantWordsArray. resultantWordsArray = ["qwe", "rty"]
 *     Break from dictionary loop for "rty".
 *
 * All queries processed.
 * Return ["qwe", "rty"].
 * Time Complexity: O(N * M * L)
 * Space Complexity: O(N * L)
 */
var twoEditWords = function (queries, dictionary) {
  const resultantWordsArray = [];
  const commonWordLength = queries[0].length;

  for (let queryIterator = 0; queryIterator < queries.length; queryIterator++) {
    const currentQueryString = queries[queryIterator];
    let foundMatchForQuery = false;

    for (
      let dictionaryIterator = 0;
      dictionaryIterator < dictionary.length;
      dictionaryIterator++
    ) {
      const currentDictionaryWord = dictionary[dictionaryIterator];
      let editCounter = 0;

      for (
        let characterPointer = 0;
        characterPointer < commonWordLength;
        characterPointer++
      ) {
        if (
          currentQueryString[characterPointer] !==
          currentDictionaryWord[characterPointer]
        ) {
          editCounter++;
          if (editCounter > 2) {
            break;
          }
        }
      }

      if (editCounter <= 2) {
        resultantWordsArray.push(currentQueryString);
        foundMatchForQuery = true;
        break;
      }
    }
  }

  return resultantWordsArray;
};
