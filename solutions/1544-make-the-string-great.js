/**
 * Make The String Great
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var makeGood = function (s) {
  let currentResultChars = s.split("");
  let changedInPass;

  while (true) {
    changedInPass = false;
    let buildArray = [];
    let scanIndex = 0;

    while (scanIndex < currentResultChars.length) {
      let firstChar = currentResultChars[scanIndex];
      let nextScanIndex = scanIndex + 1;

      if (nextScanIndex < currentResultChars.length) {
        let secondChar = currentResultChars[nextScanIndex];

        const isOppositeCaseSameLetter =
          firstChar.toLowerCase() === secondChar.toLowerCase() &&
          firstChar !== secondChar;

        if (isOppositeCaseSameLetter) {
          changedInPass = true;
          scanIndex += 2;
        } else {
          buildArray.push(firstChar);
          scanIndex += 1;
        }
      } else {
        buildArray.push(firstChar);
        scanIndex += 1;
      }
    }

    currentResultChars = buildArray;
    if (!changedInPass) {
      break;
    }
  }

  return currentResultChars.join("");
};
