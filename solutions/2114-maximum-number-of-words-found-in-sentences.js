/**
 * Maximum Number Of Words Found In Sentences
 * Intuition: To find the maximum number of words across all sentences, we must determine the word count for each individual sentence and keep track of the highest count encountered.
 * Approach: 1. Initialize a variable, `maximumWordCount`, to zero to store the highest word count found. 2. Iterate through each `currentSentence` in the input `sentences` array. 3. For each `currentSentence`, split it by the space character to obtain an `arrayOfWords`. 4. Calculate the `wordCountForCurrentSentence` by getting the length of `arrayOfWords`. 5. Update `maximumWordCount` by comparing it with `wordCountForCurrentSentence` and taking the larger value. 6. After iterating through all sentences, return the final `maximumWordCount`.
 * Dry Run: sentences = ["hello world", "i am an engineer"]
 * 1. Initialize maximumWordCount = 0.
 * 2. First iteration (currentSentence = "hello world"):
 *    arrayOfWords = "hello world".split(' ') => ["hello", "world"]
 *    wordCountForCurrentSentence = arrayOfWords.length => 2
 *    maximumWordCount = Math.max(0, 2) => 2
 * 3. Second iteration (currentSentence = "i am an engineer"):
 *    arrayOfWords = "i am an engineer".split(' ') => ["i", "am", "an", "engineer"]
 *    wordCountForCurrentSentence = arrayOfWords.length => 4
 *    maximumWordCount = Math.max(2, 4) => 4
 * 4. Loop finishes.
 * 5. Return maximumWordCount => 4.
 * Time Complexity: O(S)
 * Space Complexity: O(L_max)
 */
var mostWordsFound = function (sentences) {
  let maximumWordCount = 0;

  for (const currentSentence of sentences) {
    const arrayOfWords = currentSentence.split(" ");
    const wordCountForCurrentSentence = arrayOfWords.length;
    maximumWordCount = Math.max(maximumWordCount, wordCountForCurrentSentence);
  }

  return maximumWordCount;
};
