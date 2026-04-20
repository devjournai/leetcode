/**
 * Read N Characters Given Read 4 II Call Multiple Times
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var solution = function (read4) {
  let charactersLeftover = [];
  let leftoverPointer = 0;
  let leftoverCount = 0;

  return function (destinationBuffer, charsToRead) {
    let totalCharsObtained = 0;

    while (totalCharsObtained < charsToRead) {
      if (leftoverPointer >= leftoverCount) {
        let tempReadFourBuffer = new Array(4);
        let charsFromReadFour = read4(tempReadFourBuffer);

        charactersLeftover = tempReadFourBuffer;
        leftoverCount = charsFromReadFour;
        leftoverPointer = 0;

        if (leftoverCount === 0) {
          break;
        }
      }

      destinationBuffer[totalCharsObtained] =
        charactersLeftover[leftoverPointer];
      totalCharsObtained++;
      leftoverPointer++;
    }

    return totalCharsObtained;
  };
};
