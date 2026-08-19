/**
 * Find the Largest Palindrome Divisible by K
 * Intuition: The largest n-digit palindrome is all 9s. Divisibility rules for k in 1..9 let us change only the few digits that the rule cares about (edges, middle) and keep the rest as 9.
 * Approach: 1. Handle k = 1,3,9 as all 9s. 2. For 2/4/5/8 set the required trailing (and mirrored leading) digits to 8 or 5. 3. For 6 combine divisibility by 2 and 3 with an 8...8 or 8...77...8 pattern. 4. For 7 use a period-12 palindromic middle table wrapped in 9s.
 * Dry Run:
 *   n = 3, k = 5 -> largest palindrome ending (and starting) with 5 is 595.
 *   n = 1, k = 4 -> single digit 8.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var largestPalindrome = function (n, k) {
  switch (k) {
    case 1:
      return "9".repeat(n);
    case 2:
      return n <= 2 ? "8".repeat(n) : "8" + "9".repeat(n - 2) + "8";
    case 3:
    case 9:
      return "9".repeat(n);
    case 4:
      return n <= 4 ? "8".repeat(n) : "88" + "9".repeat(n - 4) + "88";
    case 5:
      return n <= 2 ? "5".repeat(n) : "5" + "9".repeat(n - 2) + "5";
    case 6:
      if (n <= 2) {
        return "6".repeat(n);
      }
      if (n % 2 === 1) {
        const l = Math.floor(n / 2) - 1;
        return "8" + "9".repeat(l) + "8" + "9".repeat(l) + "8";
      }
      {
        const l = n / 2 - 2;
        return "8" + "9".repeat(l) + "77" + "9".repeat(l) + "8";
      }
    case 8:
      return n <= 6 ? "8".repeat(n) : "888" + "9".repeat(n - 6) + "888";
    default: {
      const middle = [
        "",
        "7",
        "77",
        "959",
        "9779",
        "99799",
        "999999",
        "9994999",
        "99944999",
        "999969999",
        "9999449999",
        "99999499999",
      ];
      const q = Math.floor(n / 12);
      const r = n % 12;
      return "999999".repeat(q) + middle[r] + "999999".repeat(q);
    }
  }
};
