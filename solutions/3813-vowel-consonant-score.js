/**
 * Vowel-Consonant Score
 * Intuition: We iterate through the string to count the number of vowels and consonants, denoted as $v$ and $c$, respectively. Finally, we calculate the score based on the problem description. The time complexity is $O(n)$, where $n$ is the length of the string. The space complexity is $O(1)$.
 * Approach: We iterate through the string to count the number of vowels and consonants, denoted as $v$ and $c$, respectively. Finally, we calculate the score based on the problem description. The time complexity is $O(n)$, where $n$ is the length of the string. The space complexity is $O(1)$.
 * Dry Run: Input: s = &quot;cooear&quot; => Output: 2
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(1))
 */
var vowelConsonantScore = function (s) {
    let [v, c] = [0, 0];
    for (const ch of s) {
        if (/[a-zA-Z]/.test(ch)) {
            c++;
            if ('aeiou'.includes(ch)) {
                v++;
            }
        }
    }
    c -= v;
    return c === 0 ? 0 .floor(v / c);
}
