/**
 * Vowels Of All Substrings
 * Intuition: Instead of iterating through all substrings and counting vowels within each, we can determine the contribution of each individual vowel character in the original string to the final sum. A vowel at a specific index contributes to all substrings that contain it.
 * Approach: 1. Create a hash set containing all vowel characters for efficient lookup. 2. Initialize a long integer variable to store the cumulative count of vowels across all substrings. 3. Iterate through the input string from the first character to the last, keeping track of the current character's index. 4. For each character, check if it is a vowel using the hash set. 5. If the character is a vowel, calculate its contribution to the total sum. The number of substrings that include a character at index `k` in a string of length `L` is `(k + 1) * (L - k)`. 6. Add this calculated contribution to the cumulative count. 7. After processing all characters, return the final cumulative count.
 * Dry Run: word = "aba"
 *   stringLength = 3
 *   vowelChecker = {'a', 'e', 'i', 'o', 'u'}
 *   accumulatedSum = 0
 *   characterIndex = 0, currentCharacter = 'a'
 *     'a' is a vowel.
 *     leftSubstrings = (0 + 1) = 1
 *     rightSubstrings = (3 - 0) = 3
 *     vowelContribution = 1 * 3 = 3
 *     accumulatedSum = 0 + 3 = 3
 *   characterIndex = 1, currentCharacter = 'b'
 *     'b' is not a vowel.
 *     accumulatedSum remains 3
 *   characterIndex = 2, currentCharacter = 'a'
 *     'a' is a vowel.
 *     leftSubstrings = (2 + 1) = 3
 *     rightSubstrings = (3 - 2) = 1
 *     vowelContribution = 3 * 1 = 3
 *     accumulatedSum = 3 + 3 = 6
 *   Loop finishes.
 *   Return 6.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
*/
var countVowels = function (word) {
    const vowelChecker = new Set(['a', 'e', 'i', 'o', 'u']);
    let accumulatedSum = 0;
    const stringLength = word.length;

    for (let characterIndex = 0; characterIndex < stringLength; characterIndex++) {
        const currentCharacter = word[characterIndex];
        if (vowelChecker.has(currentCharacter)) {
            const leftSubstrings = characterIndex + 1;
            const rightSubstrings = stringLength - characterIndex;
            const vowelContribution = leftSubstrings * rightSubstrings;
            accumulatedSum += vowelContribution;
        }
    }

    return accumulatedSum;
};