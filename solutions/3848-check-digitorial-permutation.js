/**
 * Check Digitorial Permutation
 * Intuition: According to the problem description, no matter how the digits of number $n$ are rearranged, the sum of factorials of the digitorial number remains unchanged. Therefore, we only need to calculate the sum of factorials of each digit of number $n$, and check whether the permutation of digits of this sum equals the permutation of digits of $n$. The time complexity is $O(\log n)$, where $n$ is the integer given in the problem. The space complexity is $O(d)$, where $d = 10$ is the length of the factorial preprocessing array.
 * Approach: According to the problem description, no matter how the digits of number $n$ are rearranged, the sum of factorials of the digitorial number remains unchanged. Therefore, we only need to calculate the sum of factorials of each digit of number $n$, and check whether the permutation of digits of this sum equals the permutation of digits of $n$. The time complexity is $O(\log n)$, where $n$ is the integer given in the problem. The space complexity is $O(d)$, where $d = 10$ is the length of the factorial preprocessing array.
 * Dry Run: Input: n = 145 => Output: true
 * Time Complexity: O(O(log n))
 * Space Complexity: O(O(d))
 */
var isDigitorialPermutation = function (n) {
  const f = new Array(10);
  f[0] = 1;
  for (let i = 1; i < 10; i++) {
    f[i] = f[i - 1] * i;
  }

  let x = 0;
  let y = n;

  while (y > 0) {
    x += f[y % 10];
    y = Math.floor(y / 10);
  }

  const a = x.toString().split("").sort().join("");
  const b = n.toString().split("").sort().join("");

  return a === b;
};
