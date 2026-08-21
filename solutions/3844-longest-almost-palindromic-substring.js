/**
 * Longest Almost-Palindromic Substring
 * Intuition: Let's denote the length of string $s$ as $n$. We define a function $f(l, r)$, which represents calculating the length of the longest almost-palindromic substring that can be obtained by starting from $l$ and $r$, expanding towards both sides of the string, and deleting one character. In the function $f(l, r)$, we first expand towards both sides until the conditions $l \geq 0$, $r \lt n$, and $s[l] = s[r]$ are no longer satisfied. At this point, we can choose to skip $l$ or skip $r$. If we skip $l$, then we continue to expand from $(l - 1, r)$ towards both sides; if we skip $r$, then we continue to expand from $(l, r + 1)$ towards both sides. We calculate the length of the longest almost-palindromic substring for both cases and take the maximum value. Note that the length of the longest almost-palindromic substring cannot exceed $n$. Finally, we enumerate the center position $i$ of the pa...
 * Approach: Let's denote the length of string $s$ as $n$. We define a function $f(l, r)$, which represents calculating the length of the longest almost-palindromic substring that can be obtained by starting from $l$ and $r$, expanding towards both sides of the string, and deleting one character. In the function $f(l, r)$, we first expand towards both sides until the conditions $l \geq 0$, $r \lt n$, and $s[l] = s[r]$ are no longer satisfied. At this point, we can choose to skip $l$ or skip $r$. If we skip $l$, then we continue to expand from $(l - 1, r)$ towards both sides; if we skip $r$, then we continue to expand from $(l, r + 1)$ towards both sides. We calculate the length of the longest almost-palindromic substring for both cases and take the maximum value. Note that the length of the longest almost-palindromic substring cannot exceed $n$. Finally, we enumerate the center position $i$ of the pa...
 * Dry Run: Input: s = &quot;abca&quot; => Output: 4
 * Time Complexity: O(O(n^2))
 * Space Complexity: O(O(1))
 */
var almostPalindromic = function (s) {
  const n = s.length;

  const f = (l, r) => {
    while (l >= 0 && r < n && s[l] === s[r]) {
      l--;
      r++;
    }

    let l1 = l - 1,
      r1 = r;
    let l2 = l,
      r2 = r + 1;

    while (l1 >= 0 && r1 < n && s[l1] === s[r1]) {
      l1--;
      r1++;
    }
    while (l2 >= 0 && r2 < n && s[l2] === s[r2]) {
      l2--;
      r2++;
    }

    return Math.min(n, Math.max(r1 - l1 - 1, r2 - l2 - 1));
  };

  let ans = 0;
  for (let i = 0; i < n; i++) {
    ans = Math.max(ans, f(i, i));
    ans = Math.max(ans, f(i, i + 1));
  }

  return ans;
};
