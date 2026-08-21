/**
 * Unique Substrings With Equal Digit Frequency
 * Intuition: To count unique substrings where all digits appear with the same frequency, we can iterate through all possible substrings, maintain a count of digit occurrences for each substring, and then check if all present digits have an identical frequency. A set is used to store unique valid substrings.
 * Approach: 1. Initialize an empty Set, `foundSubstrings`, to store valid unique substrings. 2. Iterate with an outer loop using `startPosition` from `0` to `stringLength - 1` to mark the beginning of a substring. 3. Inside, initialize a `Map`, `digitTally`, to store digit frequencies for the current substring. 4. Iterate with an inner loop using `endPosition` from `startPosition` to `stringLength - 1` to extend the current substring. 5. For each `endPosition`, increment the count of `s[endPosition]` in `digitTally`. 6. Call a helper function `areFrequenciesBalanced` with `digitTally`. 7. If `areFrequenciesBalanced` returns true, extract the current substring `s.substring(startPosition, endPosition + 1)` and add it to `foundSubstrings`. 8. After iterating through all possible substrings, return the size of `foundSubstrings`. 9. The `areFrequenciesBalanced` helper function iterates through the values (frequencies) in the provided map. It captures the frequency of the first digit encountered and then checks if all subsequent digit frequencies match this initial frequency. If any mismatch occurs, it returns false; otherwise, it returns true.
 * Dry Run: s = "1212"
 *   foundSubstrings = Set()
 *   stringLength = 4
 *
 *   startPosition = 0:
 *     digitTally = Map()
 *     endPosition = 0 ('1'): digitTally = {'1': 1}. areFrequenciesBalanced -> true. foundSubstrings.add("1") -> {"1"}
 *     endPosition = 1 ('2'): digitTally = {'1': 1, '2': 1}. areFrequenciesBalanced -> true. foundSubstrings.add("12") -> {"1", "12"}
 *     endPosition = 2 ('1'): digitTally = {'1': 2, '2': 1}. areFrequenciesBalanced -> false.
 *     endPosition = 3 ('2'): digitTally = {'1': 2, '2': 2}. areFrequenciesBalanced -> true. foundSubstrings.add("1212") -> {"1", "12", "1212"}
 *
 *   startPosition = 1:
 *     digitTally = Map()
 *     endPosition = 1 ('2'): digitTally = {'2': 1}. areFrequenciesBalanced -> true. foundSubstrings.add("2") -> {"1", "12", "1212", "2"}
 *     endPosition = 2 ('1'): digitTally = {'2': 1, '1': 1}. areFrequenciesBalanced -> true. foundSubstrings.add("21") -> {"1", "12", "1212", "2", "21"}
 *     endPosition = 3 ('2'): digitTally = {'2': 2, '1': 1}. areFrequenciesBalanced -> false.
 *
 *   startPosition = 2:
 *     digitTally = Map()
 *     endPosition = 2 ('1'): digitTally = {'1': 1}. areFrequenciesBalanced -> true. foundSubstrings.add("1") (no change)
 *     endPosition = 3 ('2'): digitTally = {'1': 1, '2': 1}. areFrequenciesBalanced -> true. foundSubstrings.add("12") (no change)
 *
 *   startPosition = 3:
 *     digitTally = Map()
 *     endPosition = 3 ('2'): digitTally = {'2': 1}. areFrequenciesBalanced -> true. foundSubstrings.add("2") (no change)
 *
 *   Return foundSubstrings.size = 5.
 * Time Complexity: O(N^3)
 * Space Complexity: O(N^2)
 */
var equalDigitFrequency = function (s) {
  const foundSubstrings = new Set();
  const stringLength = s.length;

  for (let startPosition = 0; startPosition < stringLength; startPosition++) {
    const digitTally = new Map();

    for (
      let endPosition = startPosition;
      endPosition < stringLength;
      endPosition++
    ) {
      const currentDigitChar = s[endPosition];
      digitTally.set(
        currentDigitChar,
        (digitTally.get(currentDigitChar) || 0) + 1
      );

      if (areFrequenciesBalanced(digitTally)) {
        foundSubstrings.add(s.substring(startPosition, endPosition + 1));
      }
    }
  }

  return foundSubstrings.size;

  function areFrequenciesBalanced(occurrencesMap) {
    if (occurrencesMap.size === 0) {
      return false;
    }

    let initialFrequency = -1;
    let firstValueProcessed = false;

    for (const valueCount of occurrencesMap.values()) {
      if (!firstValueProcessed) {
        initialFrequency = valueCount;
        firstValueProcessed = true;
      } else if (valueCount !== initialFrequency) {
        return false;
      }
    }
    return true;
  }
};
