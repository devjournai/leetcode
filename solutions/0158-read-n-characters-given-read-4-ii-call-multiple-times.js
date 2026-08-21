/**
 * Read N Characters Given Read 4 II Call Multiple Times
 * Intuition: Multiple `read` calls must not discard unused bytes from the last `read4`. Leftover buffer, count, and pointer persist in the closure across calls.
 * Approach: 1. Close over `charactersLeftover`, `leftoverPointer`, `leftoverCount`. 2. While `totalCharsObtained < charsToRead`, if leftover is exhausted, `read4` into a 4-slot array and reset pointer/count; break on 0. 3. Copy one leftover char into `destinationBuffer`, increment both counters. 4. Return `totalCharsObtained`.
 * Dry Run: file = "abc", read(1) then read(2)
 * First: read4 loads a,b,c; copy 'a'; leftover pointer at 1
 * Second: copy 'b' then 'c' without another full refill if leftover remains; return 2
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
