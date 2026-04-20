/**
 * Valid Word Square
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
      if (characterPosition >= totalStringCount ||
        currentStringIndex >= words[characterPosition].length ||
        currentText[characterPosition] !== words[characterPosition][currentStringIndex]) {
        return false;
      }
      characterPosition++;
    }
    currentStringIndex++;
  }

  return true;
};