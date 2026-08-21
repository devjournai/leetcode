/**
 * Lexicographically Smallest Generated String
 * Intuition: True positions in str1 force str2 to appear as a substring; False positions forbid an exact copy. Fill forced T-windows first, then try 'a'..'z' on free cells without completing a forbidden match.
 * Approach: 1. Write str2 into every T-window, aborting on conflicts. 2. Precompute next unfixed index and whether each T-window's suffix already matches str2. 3. Track first mismatch for each F-window. 4. For each empty cell try letters in order; reject a letter if it would complete some F-window with no remaining unfixed cells and a matching T-fixed suffix. 5. Join the filled array.
 * Dry Run: str1="T", str2="a" forces word "a".
 * Time Complexity: O(N * M + L * M)
 * Space Complexity: O(N * M + L)
 */
var generateString = function (str1, str2) {
  const n = str1.length;
  const m = str2.length;
  const L = n + m - 1;

  const finalWord = new Array(L).fill("");

  for (let i = 0; i < n; i++) {
    if (str1[i] === "T") {
      for (let k = 0; k < m; k++) {
        const wordIdx = i + k;
        if (wordIdx >= L) {
          return "";
        }
        if (finalWord[wordIdx] !== "" && finalWord[wordIdx] !== str2[k]) {
          return "";
        }
        finalWord[wordIdx] = str2[k];
      }
    }
  }

  const nextUnfixed = new Array(L + 1);
  nextUnfixed[L] = L;
  for (let k = L - 1; k >= 0; k--) {
    if (finalWord[k] === "") {
      nextUnfixed[k] = k;
    } else {
      nextUnfixed[k] = nextUnfixed[k + 1];
    }
  }

  const checkTFixedSuffixMatch = Array(n)
    .fill(0)
    .map(() => Array(m + 1).fill(false));
  for (let i = 0; i < n; i++) {
    checkTFixedSuffixMatch[i][m] = true;
    for (let p = m - 1; p >= 0; p--) {
      const k = i + p;
      if (k >= L || finalWord[k] === "" || finalWord[k] !== str2[p]) {
        checkTFixedSuffixMatch[i][p] = false;
      } else {
        checkTFixedSuffixMatch[i][p] = checkTFixedSuffixMatch[i][p + 1];
      }
    }
  }

  const firstMismatchPosition = new Array(n).fill(L);

  for (let j = 0; j < L; j++) {
    if (finalWord[j] !== "") {
      const startI = Math.max(0, j - m + 1);
      const endI = Math.min(n - 1, j);
      for (let i = startI; i <= endI; i++) {
        if (str1[i] === "F" && firstMismatchPosition[i] === L) {
          if (finalWord[j] !== str2[j - i]) {
            firstMismatchPosition[i] = j;
          }
        }
      }
      continue;
    }

    for (let charCode = 97; charCode <= 122; charCode++) {
      const c = String.fromCharCode(charCode);
      let isPossible = true;

      const startI = Math.max(0, j - m + 1);
      const endI = Math.min(n - 1, j);

      for (let i = startI; i <= endI; i++) {
        if (str1[i] === "F") {
          if (firstMismatchPosition[i] < j) {
            continue;
          }

          if (c !== str2[j - i]) {
            continue;
          }

          if (nextUnfixed[j + 1] <= i + m - 1) {
            continue;
          }

          if (!checkTFixedSuffixMatch[i][j + 1 - i]) {
            continue;
          }

          isPossible = false;
          break;
        }
      }

      if (isPossible) {
        finalWord[j] = c;

        nextUnfixed[j] = nextUnfixed[j + 1];
        const updateStartI = Math.max(0, j - m + 1);
        const updateEndI = Math.min(n - 1, j);
        for (let i = updateStartI; i <= updateEndI; i++) {
          if (str1[i] === "F" && firstMismatchPosition[i] === L) {
            if (finalWord[j] !== str2[j - i]) {
              firstMismatchPosition[i] = j;
            }
          }
        }
        break;
      }
    }

    if (finalWord[j] === "") {
      return "";
    }
  }

  return finalWord.join("");
};
