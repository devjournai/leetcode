/**
 * Find Nth Smallest Integer With K One Bits
 * Intuition: We need to find the $n$-th smallest positive integer that contains exactly $k$ ones in its binary representation. We can determine each bit from the most significant to the least significant, deciding whether it is $0$ or $1$. Suppose we are currently processing the $i$-th bit (from $49$ down to $0$). If we set this bit to $0$, then the remaining $k$ ones need to be chosen from the lower $i$ bits, and the number of possible combinations is $C(i, k)$. If $n$ is greater than $C(i, k)$, it implies that the $i$-th bit of the $n$-th number must be $1$. In this case, we set this bit to $1$, subtract $C(i, k)$ from $n$, and decrement $k$ by $1$ (since we have already used one $1$). Otherwise, we set this bit to $0$. We repeat the above process until all bits are processed or $k$ becomes $0$. The time complexity is $O(\log^2 M)$, and the space complexity is $O(\log^2 M)$, where $M$ is the upper ...
 * Approach: We need to find the $n$-th smallest positive integer that contains exactly $k$ ones in its binary representation. We can determine each bit from the most significant to the least significant, deciding whether it is $0$ or $1$. Suppose we are currently processing the $i$-th bit (from $49$ down to $0$). If we set this bit to $0$, then the remaining $k$ ones need to be chosen from the lower $i$ bits, and the number of possible combinations is $C(i, k)$. If $n$ is greater than $C(i, k)$, it implies that the $i$-th bit of the $n$-th number must be $1$. In this case, we set this bit to $1$, subtract $C(i, k)$ from $n$, and decrement $k$ by $1$ (since we have already used one $1$). Otherwise, we set this bit to $0$. We repeat the above process until all bits are processed or $k$ becomes $0$. The time complexity is $O(\log^2 M)$, and the space complexity is $O(\log^2 M)$, where $M$ is the upper ...
 * Dry Run: Input: n = 4, k = 2 => Output: 9
 * Time Complexity: O(O(log^2 M))
 * Space Complexity: O(O(log^2 M))
 */
const MX = 50;
const c = Array.from({ length }, () => Array(MX + 1).fill(0n));

for (let i = 0; i < MX; i++) {
  c[i][0] = 1n;
  for (let j = 1; j <= i; j++) {
    c[i][j] = c[i - 1][j - 1] + c[i - 1][j];
  }
}

var nthSmallest = function (n, k) {
  let nn = BigInt(n);
  let ans = 0n;
  for (let i = 49; i >= 0; i--) {
    if (nn > c[i][k]) {
      nn -= c[i][k];
      ans |= 1n << BigInt(i);
      if (--k === 0) {
        break;
      }
    }
  }
  return Number(ans);
};
