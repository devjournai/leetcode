/**
 * Replace All S To Avoid Consecutive Repeating Characters
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var modifyString = function (s) {
  const totalLength = s.length;
  const charParts = s.split("");

  for (
    let currentPosition = 0;
    currentPosition < totalLength;
    currentPosition++
  ) {
    if (charParts[currentPosition] === "?") {
      let substituteCharCode = 97;

      while (true) {
        const potentialChar = String.fromCharCode(substituteCharCode);

        let previousCharacterConstraint = "";
        if (currentPosition > 0) {
          previousCharacterConstraint = charParts[currentPosition - 1];
        }

        let nextCharacterConstraint = "";
        if (
          currentPosition < totalLength - 1 &&
          s[currentPosition + 1] !== "?"
        ) {
          nextCharacterConstraint = s[currentPosition + 1];
        }

        if (
          potentialChar !== previousCharacterConstraint &&
          potentialChar !== nextCharacterConstraint
        ) {
          charParts[currentPosition] = potentialChar;
          break;
        }
        substituteCharCode++;
      }
    }
  }

  return charParts.join("");
};
