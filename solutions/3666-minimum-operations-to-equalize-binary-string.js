/**
 * Minimum Operations to Equalize Binary String
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
