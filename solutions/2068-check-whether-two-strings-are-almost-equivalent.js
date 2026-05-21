/**
* Check Whether Two Strings Are Almost Equivalent
* Intuition: Use a frequency array to keep track of character count differences between the two strings. Since there are only 26 lowercase English letters, a fixed-size array is efficient for this purpose.
* Approach: 1. Initialize an array, `letterFrequencyDifferences`, of size 26 with all elements set to zero. Each index corresponds to a letter from 'a' to 'z'.
*           2. Iterate through both input strings, `word1` and `word2`, simultaneously using a single loop. The strings are guaranteed to have the same length.
*           3. For each character at the current index in `word1`, calculate its corresponding array index (by subtracting ASCII value of 'a') and increment the count at that index in `letterFrequencyDifferences`.
*           4. For each character at the current index in `word2`, calculate its corresponding array index and decrement the count at that index in `letterFrequencyDifferences`.
*           5. After processing all characters and populating `letterFrequencyDifferences`, initialize a boolean flag, `areStringsAlmostEquivalent`, to true.
*           6. Iterate through the `letterFrequencyDifferences` array. For each difference value:
*              a. Calculate its absolute value.
*              b. If the absolute value is greater than 3, set `areStringsAlmostEquivalent` to false and break out of the loop, as the condition is not met.
*           7. Return the final value of `areStringsAlmostEquivalent`.
* Dry Run: word1 = "abc", word2 = "bca"
*   1. letterFrequencyDifferences = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] (26 zeros)
*   2. stringLength = 3
*   3. First loop (primaryLoopIndex from 0 to 2):
*      - primaryLoopIndex = 0:
*        - word1[0] = 'a', charOneCodeValue = 97, indexForCharOne = 0
*        - letterFrequencyDifferences[0] becomes 1
*        - word2[0] = 'b', charTwoCodeValue = 98, indexForCharTwo = 1
*        - letterFrequencyDifferences[1] becomes -1
*        - letterFrequencyDifferences is now [1,-1,0,...,0]
*      - primaryLoopIndex = 1:
*        - word1[1] = 'b', charOneCodeValue = 98, indexForCharOne = 1
*        - letterFrequencyDifferences[1] becomes 0 (was -1, now -1 + 1)
*        - word2[1] = 'c', charTwoCodeValue = 99, indexForCharTwo = 2
*        - letterFrequencyDifferences[2] becomes -1
*        - letterFrequencyDifferences is now [1,0,-1,0,...,0]
*      - primaryLoopIndex = 2:
*        - word1[2] = 'c', charOneCodeValue = 99, indexForCharOne = 2
*        - letterFrequencyDifferences[2] becomes 0 (was -1, now -1 + 1)
*        - word2[2] = 'a', charTwoCodeValue = 97, indexForCharTwo = 0
*        - letterFrequencyDifferences[0] becomes 0 (was 1, now 1 - 1)
*        - letterFrequencyDifferences is now [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
*   4. After first loop, letterFrequencyDifferences = [0,0,0, ..., 0]
*   5. areStringsAlmostEquivalent = true
*   6. Second loop (for (let currentDifferenceEntry of letterFrequencyDifferences)):
*      - currentDifferenceEntry = 0: absoluteDifferenceValue = 0. 0 > 3 is false.
*      - This continues for all 26 entries, all of which are 0. No entry will cause absoluteDifferenceValue > 3.
*   7. The loop completes without `areStringsAlmostEquivalent` being set to false.
*   8. Return true.
* Time Complexity: O(N)
* Space Complexity: O(1)
*/
var checkAlmostEquivalent = function (word1, word2) {
    const letterFrequencyDifferences = new Array(26).fill(0);

    const stringLength = word1.length;
    for (let primaryLoopIndex = 0; primaryLoopIndex < stringLength; primaryLoopIndex++) {
        const charOneCodeValue = word1.charCodeAt(primaryLoopIndex);
        const indexForCharOne = charOneCodeValue - 97;
        letterFrequencyDifferences[indexForCharOne]++;

        const charTwoCodeValue = word2.charCodeAt(primaryLoopIndex);
        const indexForCharTwo = charTwoCodeValue - 97;
        letterFrequencyDifferences[indexForCharTwo]--;
    }

    let areStringsAlmostEquivalent = true;
    for (let currentDifferenceEntry of letterFrequencyDifferences) {
        const absoluteDifferenceValue = Math.abs(currentDifferenceEntry);
        if (absoluteDifferenceValue > 3) {
            areStringsAlmostEquivalent = false;
            break;
        }
    }

    return areStringsAlmostEquivalent;
};