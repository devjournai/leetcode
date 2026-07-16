/**
 * Find Maximum Number Of String Pairs
 * Intuition: To find pairs of strings where one is the reverse of the other, we can iterate through the array, keeping track of words encountered so far. When we encounter a word, we check if its reversed form has been seen. If so, we've found a pair; otherwise, we add the current word to our collection of seen words.
 * Approach: 1. Initialize a Set to store unique words encountered that haven't yet formed a pair. 2. Initialize a counter for the number of pairs found. 3. Iterate through each string in the input array using an index-based for loop. 4. For each string, generate its reversed version (assuming strings are always 2 characters long as per common problem constraints and reference solution hint). 5. Check if the Set contains the reversed version of the current string. 6. If it does, increment the pair counter and remove the reversed string from the Set to mark it as used. 7. If it does not, add the current string to the Set. 8. After iterating through all strings, return the total pair count.
 * Dry Run: words = ["cd", "ac", "dc", "ca", "jk"]
 * encounteredWordsSet = {}
 * pairCount = 0
 * - currentIdx = 0, currentWord = "cd", reversedForm = "dc". "dc" not in encounteredWordsSet. Add "cd". encounteredWordsSet = {"cd"}
 * - currentIdx = 1, currentWord = "ac", reversedForm = "ca". "ca" not in encounteredWordsSet. Add "ac". encounteredWordsSet = {"cd", "ac"}
 * - currentIdx = 2, currentWord = "dc", reversedForm = "cd". "cd" IS in encounteredWordsSet. pairCount = 1. Remove "cd". encounteredWordsSet = {"ac"}
 * - currentIdx = 3, currentWord = "ca", reversedForm = "ac". "ac" IS in encounteredWordsSet. pairCount = 2. Remove "ac". encounteredWordsSet = {}
 * - currentIdx = 4, currentWord = "jk", reversedForm = "kj". "kj" not in encounteredWordsSet. Add "jk". encounteredWordsSet = {"jk"}
 * Final pairCount = 2.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maximumNumberOfStringPairs = function (words) {
  const encounteredWordsSet = new Set();
  let pairCount = 0;

  for (let currentIdx = 0; currentIdx < words.length; currentIdx++) {
    const currentWord = words[currentIdx];
    const reversedForm = currentWord[1] + currentWord[0];

    if (encounteredWordsSet.has(reversedForm)) {
      pairCount++;
      encounteredWordsSet.delete(reversedForm);
    } else {
      encounteredWordsSet.add(currentWord);
    }
  }

  return pairCount;
};
