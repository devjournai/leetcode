/**
* Number of Substrings Containing All Three Characters
* Intuition: Use a sliding window to efficiently count valid substrings. When a window contains 'a', 'b', and 'c', all substrings starting from the window's left edge and ending at or after the window's right edge are valid.
* Approach: 1. Initialize an array `characterFrequencies` to track counts of 'a', 'b', 'c', a `totalSubstringsFound` counter, and a `windowStart` pointer. 2. Iterate a `windowEnd` pointer from the beginning to the end of the string. 3. For each `windowEnd`, increment the frequency of `s[windowEnd]`. 4. While the `characterFrequencies` array indicates that all three characters ('a', 'b', 'c') are present in the current window: a. Add `s.length - windowEnd` to `totalSubstringsFound` (representing all valid substrings starting at `windowStart` and ending at `windowEnd` or later). b. Decrement the frequency of `s[windowStart]` and advance `windowStart` to shrink the window. 5. Return `totalSubstringsFound`.
* Dry Run: s = "abcabc"
    - `s.length = 6`, `characterFrequencies = [0,0,0]`, `totalSubstringsFound = 0`, `windowStart = 0`
    - `windowEnd = 0`, `s[0] = 'a'`: `characterFrequencies = [1,0,0]`. Window `abc` not valid.
    - `windowEnd = 1`, `s[1] = 'b'`: `characterFrequencies = [1,1,0]`. Window `abc` not valid.
    - `windowEnd = 2`, `s[2] = 'c'`: `characterFrequencies = [1,1,1]`. Window `abc` is valid.
        - `totalSubstringsFound += (6 - 2) = 4`. (`totalSubstringsFound = 4`)
        - `characterFrequencies['a']--` (`characterFrequencies = [0,1,1]`). `windowStart = 1`. Window `bc` not valid.
    - `windowEnd = 3`, `s[3] = 'a'`: `characterFrequencies = [1,1,1]`. Window `bca` is valid.
        - `totalSubstringsFound += (6 - 3) = 3`. (`totalSubstringsFound = 4 + 3 = 7`)
        - `characterFrequencies['b']--` (`characterFrequencies = [1,0,1]`). `windowStart = 2`. Window `ca` not valid.
    - `windowEnd = 4`, `s[4] = 'b'`: `characterFrequencies = [1,1,1]`. Window `cab` is valid.
        - `totalSubstringsFound += (6 - 4) = 2`. (`totalSubstringsFound = 7 + 2 = 9`)
        - `characterFrequencies['c']--` (`characterFrequencies = [1,1,0]`). `windowStart = 3`. Window `ab` not valid.
    - `windowEnd = 5`, `s[5] = 'c'`: `characterFrequencies = [1,1,1]`. Window `abc` is valid.
        - `totalSubstringsFound += (6 - 5) = 1`. (`totalSubstringsFound = 9 + 1 = 10`)
        - `characterFrequencies['a']--` (`characterFrequencies = [0,1,1]`). `windowStart = 4`. Window `bc` not valid.
    - Loop ends. Return `totalSubstringsFound = 10`.
* Time Complexity: O(N)
* Space Complexity: O(1)
*/
var numberOfSubstrings = function (s) {
  const characterFrequencies = [0, 0, 0];
  let totalSubstringsFound = 0;
  let windowStart = 0;

  for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
    characterFrequencies[s[windowEnd].charCodeAt(0) - 97]++;

    while (
      characterFrequencies[0] > 0 &&
      characterFrequencies[1] > 0 &&
      characterFrequencies[2] > 0
    ) {
      totalSubstringsFound += s.length - windowEnd;
      characterFrequencies[s[windowStart].charCodeAt(0) - 97]--;
      windowStart++;
    }
  }

  return totalSubstringsFound;
};
