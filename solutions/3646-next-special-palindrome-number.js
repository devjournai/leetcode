/**
 * Next Special Palindrome Number
 * Intuition: A special palindrome uses digit k exactly k times (no 0). At most one odd digit can sit in the center; even counts fill both halves. There are few such numbers (masks of {1..9}), so precompute and binary-search the next after n.
 * Approach: 1. For each nonempty subset of digits 1–9 with at most one odd count, build the multiset of half-digits. 2. Generate all unique permutations of the half, form palindromes (length ≤ 16 since n ≤ 1e15). 3. Sort and upper_bound n.
 * Dry Run: n = 2 → next is 22. n = 33 → 212.
 * Time Complexity: O(log P) after O(P) precompute, P = number of special palindromes
 * Space Complexity: O(P)
 */
var specialPalindrome = (function () {
  const nextPermutation = (arr) => {
    let i = arr.length - 2;
    while (i >= 0 && arr[i] >= arr[i + 1]) {
      i--;
    }
    if (i < 0) {
      arr.reverse();
      return false;
    }
    let j = arr.length - 1;
    while (arr[j] <= arr[i]) {
      j--;
    }
    [arr[i], arr[j]] = [arr[j], arr[i]];
    let left = i + 1;
    let right = arr.length - 1;
    while (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
    return true;
  };

  const palindromes = [];
  for (let mask = 1; mask < 1 << 9; mask++) {
    const half = [];
    let mid = "";
    let valid = true;
    for (let digitIndex = 0; digitIndex < 9; digitIndex++) {
      if ((mask & (1 << digitIndex)) === 0) {
        continue;
      }
      const digit = digitIndex + 1;
      if (digit % 2 === 1) {
        if (mid !== "") {
          valid = false;
          break;
        }
        mid = String(digit);
      }
      const halfCount = Math.floor(digit / 2);
      for (let copy = 0; copy < halfCount; copy++) {
        half.push(String(digit));
      }
    }
    if (!valid) {
      continue;
    }
    half.sort();
    while (true) {
      const left = half.join("");
      const text = left + mid + left.split("").reverse().join("");
      if (text.length > 0 && text.length <= 16) {
        palindromes.push(BigInt(text));
      }
      if (half.length === 0 || !nextPermutation(half)) {
        break;
      }
    }
  }
  palindromes.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

  return function (n) {
    const target = BigInt(n);
    let low = 0;
    let high = palindromes.length;
    while (low < high) {
      const mid = (low + high) >> 1;
      if (palindromes[mid] <= target) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return Number(palindromes[low]);
  };
})();
