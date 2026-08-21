/**
 * Integers With Multiple Sum of Two Cubes
 * Intuition: We observe that when $a$ or $b$ is greater than $1000$, the expression $a^3 + b^3 > 10^9$. Therefore, we only need to enumerate $1 \leq a \leq b \leq 1000$ and count the occurrences of each integer $x = a^3 + b^3$. Finally, we filter out the integers that appear more than once and sort them in ascending order to obtain all good integers. We preprocess all good integers and store them in an array $\textit{GOOD}$. For each query, we use binary search to find the index $idx$ of the first integer in $\textit{GOOD}$ that is greater than $n$, then return the first $idx$ integers in $\textit{GOOD}$. The time complexity is $O(m^2 + k \log k)$, where $m = 1000$ is the enumeration range and $k$ is the number of good integers. The space complexity is $O(k)$.
 * Approach: We observe that when $a$ or $b$ is greater than $1000$, the expression $a^3 + b^3 > 10^9$. Therefore, we only need to enumerate $1 \leq a \leq b \leq 1000$ and count the occurrences of each integer $x = a^3 + b^3$. Finally, we filter out the integers that appear more than once and sort them in ascending order to obtain all good integers. We preprocess all good integers and store them in an array $\textit{GOOD}$. For each query, we use binary search to find the index $idx$ of the first integer in $\textit{GOOD}$ that is greater than $n$, then return the first $idx$ integers in $\textit{GOOD}$. The time complexity is $O(m^2 + k \log k)$, where $m = 1000$ is the enumeration range and $k$ is the number of good integers. The space complexity is $O(k)$.
 * Dry Run: Input: n = 4104 => Output: [1729,4104]
 * Time Complexity: O(O(m^2 + k log k))
 * Space Complexity: O(O(k))
 */
var upperBound = function (arr, x) {
  let lo = 0,
    hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] <= x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
};
const LIMIT = 1e9;

const GOOD = (() => {
  const cnt = new Map();
  const cubes = Array.from({ length: 1001 }, (_, i) => i * i * i);

  for (let a = 1; a <= 1000; a++) {
    for (let b = a; b <= 1000; b++) {
      const x = cubes[a] + cubes[b];
      if (x > LIMIT) break;
      cnt.set(x, (cnt.get(x) ?? 0) + 1);
    }
  }

  const res = [];
  for (const [x, v] of cnt.entries()) {
    if (v > 1) res.push(x);
  }

  res.sort((a, b) => a - b);
  return res;
})();

var findGoodIntegers = function (n) {
  const idx = upperBound(GOOD, n);
  return GOOD.slice(0, idx);
};
