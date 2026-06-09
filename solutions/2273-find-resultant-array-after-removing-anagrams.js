/**
 * Find Resultant Array After Removing Anagrams
 * Intuition: To identify anagrams, we can sort the characters of each word to create a canonical representation. We want to construct a new array by iterating through the original words, keeping a word only if it's not an anagram of the immediately preceding word that was added to our new array.
 * Approach: 1. Initialize a list called `finalSequence` with the first element from the input `wordCollection`.
 * 2. Iterate through `wordCollection` starting from the second element using an index `idx`.
 * 3. For each element `wordCollection[idx]`, compute its sorted character string `currentWordKey`.
 * 4. Retrieve the last element currently in `finalSequence`, and compute its sorted character string `previousWordKey`.
 * 5. Compare `currentWordKey` and `previousWordKey`. If they are not identical, it means `wordCollection[idx]` is not an anagram of the last word kept in `finalSequence`. Add `wordCollection[idx]` to `finalSequence`.
 * 6. After iterating through all elements, return `finalSequence`.
 * Dry Run:
 * Input: wordCollection = ["abba", "baba", "abca", "caba"]
 * 1. finalSequence = ["abba"] (initialized with wordCollection[0])
 * 2. idx = 1:
 *    - lastKept = "abba" (from finalSequence[finalSequence.length - 1])
 *    - previousWordKey = "aabb" (from "abba".split('').sort().join(''))
 *    - currentWord = "baba" (from wordCollection[1])
 *    - currentWordKey = "aabb" (from "baba".split('').sort().join(''))
 *    - currentWordKey ("aabb") === previousWordKey ("aabb"). Condition (currentWordKey !== previousWordKey) is false. Skip adding.
 *    - finalSequence remains ["abba"]
 * 3. idx = 2:
 *    - lastKept = "abba"
 *    - previousWordKey = "aabb"
 *    - currentWord = "abca"
 *    - currentWordKey = "aabc"
 *    - currentWordKey ("aabc") !== previousWordKey ("aabb"). Condition is true.
 *    - finalSequence.push("abca"). finalSequence becomes ["abba", "abca"]
 * 4. idx = 3:
 *    - lastKept = "abca"
 *    - previousWordKey = "aabc"
 *    - currentWord = "caba"
 *    - currentWordKey = "aabc"
 *    - currentWordKey ("aabc") === previousWordKey ("aabc"). Condition is false. Skip adding.
 *    - finalSequence remains ["abba", "abca"]
 * Loop finishes.
 * Return finalSequence = ["abba", "abca"].
 * Time Complexity: O(N * L log L)
 * Space Complexity: O(N * L)
 */
const removeAnagrams = (wordCollection) => {
  const finalSequence = [wordCollection[0]];

  for (let idx = 1; idx < wordCollection.length; idx++) {
    const lastKept = finalSequence[finalSequence.length - 1];
    const previousWordKey = lastKept.split("").sort().join("");

    const currentWord = wordCollection[idx];
    const currentWordKey = currentWord.split("").sort().join("");

    if (currentWordKey !== previousWordKey) {
      finalSequence.push(currentWord);
    }
  }

  return finalSequence;
};
