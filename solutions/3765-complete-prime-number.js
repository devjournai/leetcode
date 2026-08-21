/**
 * Complete Prime Number
 * Intuition: We define a function \text{is\_prime}(x) to determine whether a number x is prime. Specifically, if x < 2, then x is not prime; otherwise, we check all integers i from 2 to \sqrt{x}. If there exists some i that divides x, then x is not prime; otherwise, x is prime.
 * Approach: Next, we convert the integer \textit{num} to a string s, and sequentially check whether the integer corresponding to each prefix and suffix of s is prime. For prefixes, we construct the integer x from left to right; for suffixes, we construct the integer x from right to left. If during the checking process we find that the integer corresponding to some prefix or suffix is not prime, we return \text{false}; if all integers corresponding to prefixes and suffixes are prime, we return \text{true}. The time complexity is O(\sqrt{n} \times \log n), and the space complexity is O(\log n), where n is the value of the integer \textit{num}.
 * Dry Run: Input num = 23. Output true.
 * Time Complexity: O(\sqrt{n} \times \log n)
 * Space Complexity: O(\log n)
 */
var completePrime = function (num) {
  const isPrime = (x) => {
    if (x < 2) return false;
    for (let i = 2; i * i <= x; i++) {
      if (x % i === 0) {
        return false;
      }
    }
    return true;
  };

  const s = String(num);

  let x = 0;
  for (let i = 0; i < s.length; i++) {
    x = x * 10 + (s.charCodeAt(i) - 48);
    if (!isPrime(x)) {
      return false;
    }
  }

  x = 0;
  let p = 1;
  for (let i = s.length - 1; i >= 0; i--) {
    x = p * (s.charCodeAt(i) - 48) + x;
    p *= 10;
    if (!isPrime(x)) {
      return false;
    }
  }

  return true;
};
