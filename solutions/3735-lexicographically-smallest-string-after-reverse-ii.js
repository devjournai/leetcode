/**
 * Lexicographically Smallest String After Reverse II
 * Intuition: Exactly one prefix or suffix reverse is allowed. Comparing all 2n candidates naively is too slow, so rolling hashes compare two virtual strings in O(log N) by binary-searching the first mismatch.
 * Approach: 1. Precompute prefix, reverse-substring (suffix), and base hashes. 2. Track the best (k, type). 3. For prefix reverses whose new first char is the global minimum, and suffix reverses that can improve the tail, hash-compare against the current best and keep the smaller string.
 * Dry Run: s = "dcab". Prefix k=3 yields "acdb", which starts with 'a' and is the minimum among all prefix/suffix reversals.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var lexSmallest = function (s) {
  const MOD = 1e9 + 7;
  const B = 29;
  const n = s.length;
  const mod = (x) => {
    x %= MOD;
    if (x < 0) {
      x += MOD;
    }
    return x;
  };

  const prefix = Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    prefix[i + 1] = (prefix[i] * B + (s.charCodeAt(i) - 96)) % MOD;
  }
  const suffix = Array(n + 1).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    suffix[i] = (suffix[i + 1] * B + (s.charCodeAt(i) - 96)) % MOD;
  }
  const base = Array(n + 1).fill(1);
  for (let i = 0; i < n; i++) {
    base[i + 1] = (base[i] * B) % MOD;
  }

  const getPrefixHash = (l, r) =>
    l <= r ? mod(prefix[r + 1] - ((prefix[l] * base[r - l + 1]) % MOD)) : 0;
  const getSuffixHash = (l, r) =>
    l <= r ? mod(suffix[l] - ((suffix[r + 1] * base[r - l + 1]) % MOD)) : 0;

  const getTotalHash = (k, t, l) => {
    if (!t) {
      return l <= k
        ? getSuffixHash(k - l, k - 1)
        : mod(getSuffixHash(0, k - 1) * base[l - k] + getPrefixHash(k, l - 1));
    }
    const nk = n - k;
    return l <= nk
      ? getPrefixHash(0, l - 1)
      : mod(
          getPrefixHash(0, nk - 1) * base[l - nk] +
            getSuffixHash(n - (l - nk), n - 1)
        );
  };

  const getChar = (k, t, idx) => {
    if (!t) {
      return idx < k ? s[k - 1 - idx] : s[idx];
    }
    return idx < n - k ? s[idx] : s[n - 1 - (idx - (n - k))];
  };

  let bestK = 1;
  let bestT = 0;
  const isLess = (k, t) => {
    let left = 0;
    let right = n - 1;
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (getTotalHash(k, t, mid + 1) !== getTotalHash(bestK, bestT, mid + 1)) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return left !== n && getChar(k, t, left) < getChar(bestK, bestT, left);
  };

  let mn = "z";
  for (const ch of s) {
    if (ch < mn) {
      mn = ch;
    }
  }
  for (let k = 1; k <= n; k++) {
    if (s[k - 1] !== mn) {
      continue;
    }
    if (isLess(k, 0)) {
      bestK = k;
      bestT = 0;
    }
  }
  for (let k = 1; k <= n; k++) {
    if (s[n - k] < s[n - 1]) {
      continue;
    }
    if (isLess(k, 1)) {
      bestK = k;
      bestT = 1;
    }
  }

  if (!bestT) {
    return s.slice(0, bestK).split("").reverse().join("") + s.slice(bestK);
  }
  return (
    s.slice(0, n - bestK) +
    s
      .slice(n - bestK)
      .split("")
      .reverse()
      .join("")
  );
};
