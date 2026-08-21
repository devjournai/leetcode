/**
 * Read N Characters Given Read 4
 * Intuition: `read4` fills at most four characters. An internal buffer plus a pointer can stash a leftover chunk so the outer `read` can copy exactly `n` characters (or until EOF) without calling `read4` more than needed.
 * Approach: 1. Close over `internalBuffer`, `internalBufferPointer`, and `internalBufferLength`. 2. While `charactersObtained < n`, if the pointer is at the buffer end, call `read4` into a 4-slot array and reset pointer/length; break if 0 chars. 3. Copy `min(need, remaining in buffer)` into `buf`. 4. Advance obtained count and pointer. 5. Return `charactersObtained`.
 * Dry Run: file = "abc", n = 4
 * read4 fills ['a','b','c',_] length 3; copy 3 chars; next read4 returns 0; return 3
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
        internalBufferLength - internalBufferPointer
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
