/**
 * Before And After Puzzle
 * Intuition: Two phrases form a puzzle when the last word of one equals the first word of the other; the shared word is written once in the merge.
 * Approach: 1. For every ordered pair of distinct phrases, split each on spaces. 2. If the last word of the first equals the first word of the second, concatenate first's words with the rest of the second. 3. Collect unique merges in a Set and return them sorted.
 * Dry Run: phrases = ["a b", "b c"]. Pair (0,1): last of first is "b", first of second is "b" → "a b c". Pair (1,0): "c" vs "a" — skip. Sorted unique: ["a b c"].
 * Time Complexity: O(N^2 * L)
 * Space Complexity: O(N^2 * L)
 */
var beforeAndAfterPuzzles = function (phrases) {
  const collectedPuzzles = new Set();

  phrases.forEach((currentPhrase, firstIndex) => {
    phrases.forEach((otherPhrase, secondIndex) => {
      if (firstIndex !== secondIndex) {
        const currentWords = currentPhrase.split(" ");
        const otherWords = otherPhrase.split(" ");

        const currentLastWord = currentWords[currentWords.length - 1];
        const otherFirstWord = otherWords[0];

        if (currentLastWord === otherFirstWord) {
          const combinedPuzzle = currentWords
            .concat(otherWords.slice(1))
            .join(" ");
          collectedPuzzles.add(combinedPuzzle);
        }
      }
    });
  });

  return Array.from(collectedPuzzles).sort();
};
