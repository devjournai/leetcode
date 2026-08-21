/**
 * Valid Word Square
 * Intuition: A word square needs `words[i][j] === words[j][i]` for every character that exists, including when rows have different lengths.
 * Approach: 1. For each row `i` and column `j` in that row, fail if `j` is past the number of words, if `i` is past `words[j].length`, or if the two characters differ. 2. Otherwise return true.
 * Dry Run: ["abcd","bnrt","crmy","dtye"].
 *   - a b c d vs column 0 a,b,c,d match; similarly other rows. Return true.
 * Time Complexity: O(R * C_max)
 * Space Complexity: O(1)
 */
var validWordSquare = function (words) {
  const totalStringCount = words.length;

  let currentStringIndex = 0;
  while (currentStringIndex < totalStringCount) {
    const currentText = words[currentStringIndex];
    let characterPosition = 0;
    while (characterPosition < currentText.length) {
      if (
        characterPosition >= totalStringCount ||
        currentStringIndex >= words[characterPosition].length ||
        currentText[characterPosition] !==
          words[characterPosition][currentStringIndex]
      ) {
        return false;
      }
      characterPosition++;
    }
    currentStringIndex++;
  }

  return true;
};
