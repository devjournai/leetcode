/**
 * Password Strength
 * Intuition: We store each character in the input string in a hash set st, so we can quickly ensure each distinct character is counted only once.
 * Approach: We store each character in the input string in a hash set st, so we can quickly ensure each distinct character is counted only once. Then, we iterate through each character in st and compute the password strength according to the rules: - If the character is a lowercase letter ('a' to 'z'), add 1 point. - If the character is an uppercase letter ('A' to 'Z'), add 2 points. - If the character is a digit ('0' to '9'), add 3 points. - If the character is a special character (from the set "!@#$"), add 5 points.
 * Dry Run: Input: password = "aA1!". Output: 11.
 * Time Complexity: O(n)
 * Space Complexity: O(m)
 */
var passwordStrength = function (password) {
  const st = new Set(password);

  let ans = 0;

  for (const ch of st) {
    if (/[a-z]/u.test(ch)) {
      ans += 1;
    } else if (/[A-Z]/u.test(ch)) {
      ans += 2;
    } else if (/\d/u.test(ch)) {
      ans += 3;
    } else {
      ans += 5;
    }
  }

  return ans;
};
