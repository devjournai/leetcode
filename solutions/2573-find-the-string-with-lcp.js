/**
 * Find the String with LCP
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var findTheString = function (lcp) {
  const n = lcp.length;
  const word = new Array(n).fill("");
  let currentCharCode = "a".charCodeAt(0);

  for (let i = 0; i < n; i++) {
    if (lcp[i][i] !== n - i) {
      return "";
    }
    for (let j = i + 1; j < n; j++) {
      if (lcp[i][j] !== lcp[j][i]) {
        return "";
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (word[i] === "") {
      if (currentCharCode > "z".charCodeAt(0)) {
        return "";
      }
      word[i] = String.fromCharCode(currentCharCode);
      currentCharCode++;
    }

    for (let j = i + 1; j < n; j++) {
      if (lcp[i][j] > 0) {
        if (word[j] === "") {
          word[j] = word[i];
        } else if (word[j] !== word[i]) {
          return "";
        }
      } else {
        if (word[j] !== "" && word[j] === word[i]) {
          return "";
        }
      }
    }
  }

  const calculatedLcp = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (word[i] === word[j]) {
        if (i === n - 1 || j === n - 1) {
          calculatedLcp[i][j] = 1;
        } else {
          calculatedLcp[i][j] = 1 + calculatedLcp[i + 1][j + 1];
        }
      } else {
        calculatedLcp[i][j] = 0;
      }
    }
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (lcp[i][j] !== calculatedLcp[i][j]) {
        return "";
      }
    }
  }
  return word.join("");
};
