/**
 * Minimum Insertions To Balance A Parentheses String
 * Time Complexity: O(N)
 * Space Complexity: O(1)
*/
var minInsertions = function (s) {
    let totalInsertionsNeeded = 0;
    let unmatchedOpenParentheses = 0;

    let stringScanIndex = 0;
    while (stringScanIndex < s.length) {
        if (s[stringScanIndex] === "(") {
            unmatchedOpenParentheses++;
            stringScanIndex++;
        } else { // Current character is ')'
            // Check if there is a second consecutive ')'
            if (stringScanIndex + 1 < s.length && s[stringScanIndex + 1] === ")") {
                stringScanIndex += 2; // Consume both ')' characters
            } else {
                totalInsertionsNeeded++; // Missing a second ')'
                stringScanIndex++; // Consume the single ')'
            }

            // After handling the ')' or '))' pair, try to match it with an open parenthesis
            if (unmatchedOpenParentheses > 0) {
                unmatchedOpenParentheses--;
            } else {
                totalInsertionsNeeded++; // Missing a '(' to match the ')' or '))'
            }
        }
    }

    // Any remaining unmatched open parentheses each require two ')' insertions
    totalInsertionsNeeded += unmatchedOpenParentheses * 2;

    return totalInsertionsNeeded;
};