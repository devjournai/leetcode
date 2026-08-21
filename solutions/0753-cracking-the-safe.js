/**
 * Cracking The Safe
 * Intuition: A shortest string containing every n-digit password is a de Bruijn sequence. DFS/Hierholzer walks unused n-length windows, appending one digit at a time until `k^n` windows are seen.
 * Approach: 1. If `n === 1`, concatenate `"0"…"k-1"`. 2. Else start `finalPassword` as n zeros and put that window in `visitedSubstrings`. 3. `exploreCombinations` takes the last `n-1` chars as `nextPrefix` and tries each `nextPin` in `0..k-1`. 4. On a new window, append the digit and recurse; if `visitedSubstrings.size === totalExpectedCount`, succeed. 5. Otherwise backtrack (pop digit, unvisit). Return `finalPassword`.
 * Dry Run: n = 2, k = 2.
 *   - Start "00", visited {00}. Prefix "0", try 1 → "001", visited {00,01}.
 *   - From "01", try 1 → "0011", visited {00,01,11}; then try 0 → "00110", visited {00,01,11,10} (size 4). Return "00110".
 * Time Complexity: O(k^n * n)
 * Space Complexity: O(k^n * n)
 */
var crackSafe = function (n, k) {
  if (n === 1) {
    let singleDigitResult = "";
    for (let currentNumber = 0; currentNumber < k; currentNumber++) {
      singleDigitResult += currentNumber.toString();
    }
    return singleDigitResult;
  }

  const visitedSubstrings = new Set();
  const totalExpectedCount = k ** n;
  let finalPassword = "0".repeat(n);

  visitedSubstrings.add(finalPassword);

  function exploreCombinations(currentPasswordState) {
    if (visitedSubstrings.size === totalExpectedCount) {
      return true;
    }

    const nextPrefix = currentPasswordState.slice(-n + 1);
    for (let nextPin = 0; nextPin < k; nextPin++) {
      const candidatePassword = nextPrefix + nextPin.toString();

      if (!visitedSubstrings.has(candidatePassword)) {
        visitedSubstrings.add(candidatePassword);
        finalPassword += nextPin.toString();

        if (exploreCombinations(candidatePassword)) {
          return true;
        }

        finalPassword = finalPassword.slice(0, -1);
        visitedSubstrings.delete(candidatePassword);
      }
    }
    return false;
  }

  exploreCombinations(finalPassword);

  return finalPassword;
};
