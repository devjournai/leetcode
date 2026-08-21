/**
 * Backspace String Compare
 * Intuition: Walk both strings from the right. Skip characters cancelled by '#" (a skip counter). Compare the next "surviving" pair of characters.
 * Approach: 1. Pointers at ends. 2. For each string, while '#" increment skip and move left; if skip>0 consume a letter. 3. Compare resolved chars (or null). 4. Step both left. Equal through both ends → true.
 * Dry Run: s="ab#c", t="ad#c". From right: both resolve 'c', then 'a'. Equal → true. "ab##" vs "c#d#" both empty → true.
 * Time Complexity: O(lengthS + lengthT)
 * Space Complexity: O(1)
 */
var backspaceCompare = function (stringOne, stringTwo) {
  let currentPointerOne = stringOne.length - 1;
  let currentPointerTwo = stringTwo.length - 1;

  while (currentPointerOne >= 0 || currentPointerTwo >= 0) {
    let backspaceCountOne = 0;
    while (currentPointerOne >= 0) {
      if (stringOne[currentPointerOne] === "#") {
        backspaceCountOne++;
        currentPointerOne--;
      } else if (backspaceCountOne > 0) {
        backspaceCountOne--;
        currentPointerOne--;
      } else {
        break;
      }
    }

    let backspaceCountTwo = 0;
    while (currentPointerTwo >= 0) {
      if (stringTwo[currentPointerTwo] === "#") {
        backspaceCountTwo++;
        currentPointerTwo--;
      } else if (backspaceCountTwo > 0) {
        backspaceCountTwo--;
        currentPointerTwo--;
      } else {
        break;
      }
    }

    const resolvedCharOne =
      currentPointerOne >= 0 ? stringOne[currentPointerOne] : null;
    const resolvedCharTwo =
      currentPointerTwo >= 0 ? stringTwo[currentPointerTwo] : null;

    if (resolvedCharOne !== resolvedCharTwo) {
      return false;
    }

    if (currentPointerOne >= 0) {
      currentPointerOne--;
    }
    if (currentPointerTwo >= 0) {
      currentPointerTwo--;
    }
  }

  return true;
};
