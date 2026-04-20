/**
 * Before And After Puzzle
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
