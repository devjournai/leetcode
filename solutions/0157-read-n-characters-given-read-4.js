/**
 * Read N Characters Given Read 4
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var solution = function (read4) {
  let internalBuffer = [];
  let internalBufferPointer = 0;
  let internalBufferLength = 0;

  return function (buf, n) {
    let charactersObtained = 0;

    while (charactersObtained < n) {
      if (internalBufferPointer === internalBufferLength) {
        let tempReadBuffer = new Array(4);
        let charsFromRead4 = read4(tempReadBuffer);

        internalBuffer = tempReadBuffer;
        internalBufferLength = charsFromRead4;
        internalBufferPointer = 0;

        if (internalBufferLength === 0) {
          break;
        }
      }

      let charactersToCopy = Math.min(
        n - charactersObtained,
        internalBufferLength - internalBufferPointer,
      );

      for (let batchIndex = 0; batchIndex < charactersToCopy; batchIndex++) {
        buf[charactersObtained + batchIndex] =
          internalBuffer[internalBufferPointer + batchIndex];
      }

      charactersObtained += charactersToCopy;
      internalBufferPointer += charactersToCopy;
    }

    return charactersObtained;
  };
};
