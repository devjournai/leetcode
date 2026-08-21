/**
 * Minimum Operations to Equalize Binary String
 * Intuition: Only the count of zeros matters. Flipping k bits maps a reachable interval of zero-counts (with parity) to a new interval; stop when 0 is reachable.
 * Approach: 1. Count zeros C; if 0 return 0. 2. Start with [L,R]=[C,C]. 3. For each step, compute nextL from whether k lies in [L,R] (parity), k<L (L-k), or k>R (k-R); nextR from leftover t=n-k similarly, capped by n with matching parity. 4. If L becomes 0 return the step; else -1 after n+5 tries.
 * Dry Run: s = "011", k = 2, C = 1. After one step L can become 0 (flip the zero and a one). Answer 1.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var minOperations = function (s, k) {
  let C = 0;
  for (let char of s) {
    if (char === "0") C++;
  }

  if (C === 0) return 0;

  let n = s.length;
  let L = C,
    R = C;
  for (let step = 1; step <= n + 5; step++) {
    let nextL, nextR;
    if (k >= L && k <= R) {
      nextL = (L + k) % 2;
    } else if (k < L) {
      nextL = L - k;
    } else {
      nextL = k - R;
    }

    let t = n - k;
    if (t >= L && t <= R) {
      let parity = (L + k) % 2;
      nextR = n % 2 === parity ? n : n - 1;
    } else if (t < L) {
      nextR = 2 * n - L - k;
    } else {
      nextR = R + k;
    }

    L = nextL;
    R = nextR;

    if (L === 0) return step;
  }

  return -1;
};
