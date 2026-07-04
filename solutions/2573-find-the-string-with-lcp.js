/**
 * Find the String with LCP
 *
 * Intuition:
 * The LCP matrix tells us how many characters two suffixes share.
 *
 * If:
 *
 *      lcp[i][j] > 0
 *
 * then
 *
 *      word[i] == word[j]
 *
 * because the first character of both suffixes must be identical.
 *
 * We greedily assign the smallest possible characters ('a' to 'z') while
 * satisfying these equality constraints.
 *
 * After constructing the string, we recompute its LCP matrix. If it matches
 * the given matrix, the constructed string is valid; otherwise, no valid
 * string exists.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Let:
 *
 *      n = lcp.length
 *
 * 2. Validate the given LCP matrix.
 *
 *      a. Every diagonal must satisfy:
 *
 *             lcp[i][i] = n - i
 *
 *      b. The matrix must be symmetric:
 *
 *             lcp[i][j] == lcp[j][i]
 *
 *      If either condition fails,
 *      return "".
 *
 * 3. Construct the answer string.
 *
 *      Traverse every position.
 *
 *      If a position has not been assigned,
 *      assign the next available character.
 *
 *      For every later position:
 *
 *          If
 *
 *              lcp[i][j] > 0
 *
 *          both positions must contain the same character.
 *
 *          Otherwise,
 *          they must contain different characters.
 *
 *      If more than 26 different characters are required,
 *      return "".
 *
 * 4. Recompute the LCP matrix.
 *
 *      Process from bottom-right.
 *
 *      If
 *
 *          word[i] == word[j]
 *
 *      then
 *
 *          lcp[i][j]
 *              =
 *              1 + lcp[i+1][j+1]
 *
 *      otherwise
 *
 *          lcp[i][j] = 0.
 *
 * 5. Compare the recomputed matrix with the given matrix.
 *
 *      If any value differs,
 *      return "".
 *
 * 6. Otherwise,
 *      return the constructed string.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * Input:
 *
 * lcp =
 *
 * [
 *  [3,0,1],
 *  [0,2,0],
 *  [1,0,1]
 * ]
 *
 * n = 3
 *
 * Assign:
 *
 * index0 -> 'a'
 *
 * index1 -> 'b'
 *
 * Since
 *
 * lcp[0][2] > 0
 *
 * index2 also becomes
 *
 * 'a'
 *
 * Constructed string:
 *
 * "aba"
 *
 * Recompute LCP:
 *
 * [
 *  [3,0,1],
 *  [0,2,0],
 *  [1,0,1]
 * ]
 *
 * Matches input.
 *
 * Return:
 *
 * "aba"
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N²)
 * Space Complexity: O(N²)
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

  const calculatedLcp = Array.from({ length: n }, () => Array(n).fill(0));

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
      if (calculatedLcp[i][j] !== lcp[i][j]) {
        return "";
      }
    }
  }
  return word.join("");
};
