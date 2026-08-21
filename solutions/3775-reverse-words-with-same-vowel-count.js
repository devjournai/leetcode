/**
 * Reverse Words With Same Vowel Count
 * Intuition: We first split the string by spaces into a word list \textit{words}. Then we calculate the number of vowels \textit{cnt} in the first word. Next, we iterate through each subsequent word, calculate its number of vowels, and if it equals \textit{cnt}, reverse the word. Finally, we rejoin the processed word list into a string and return it.
 * Approach: The time complexity is O(n), and the space complexity is O(n), where n is the length of the string s.
 * Dry Run: Input s = "cat and mice". Output "cat dna mice".
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var reverseWords = function (s) {
  const words = s.split(/\s+/);

  const calc = (w) => {
    let cnt = 0;
    for (const c of w) {
      if ("aeiou".includes(c)) cnt++;
    }
    return cnt;
  };

  const cnt = calc(words[0]);
  const ans = [words[0]];

  for (let i = 1; i < words.length; i++) {
    let w = words[i];
    if (calc(w) === cnt) {
      w = w.split("").reverse().join("");
    }
    ans.push(w);
  }

  return ans.join(" ");
};
