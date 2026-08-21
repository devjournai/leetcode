/**
 * Count No-Zero Pairs That Sum To N
 * Intuition: Digit DP from least significant digit. Each position chooses digits of a and b (no zeros while a number is still alive) so they plus carry match n's digit.
 * Approach: DP over carry, whether a is still writing digits, and whether b is. Alive numbers may place 1-9 or stop (0 and die) after the first position. End with carry 0 and both dead.
 * Dry Run: n = 3 allows (1, 2) and (2, 1) → 2.
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var countNoZeroPairs = function (n) {
  const digits = [];
  let remaining = n;
  while (remaining > 0) {
    digits.push(remaining % 10);
    remaining = Math.floor(remaining / 10);
  }
  digits.push(0);
  const length = digits.length;

  let dp = Array.from({ length: 2 }, () =>
    Array.from({ length: 2 }, () => Array(2).fill(0))
  );
  dp[0][1][1] = 1;

  for (let pos = 0; pos < length; pos++) {
    const nextDp = Array.from({ length: 2 }, () =>
      Array.from({ length: 2 }, () => Array(2).fill(0))
    );
    const targetDigit = digits[pos];
    for (let carry = 0; carry < 2; carry++) {
      for (let aliveA = 0; aliveA < 2; aliveA++) {
        for (let aliveB = 0; aliveB < 2; aliveB++) {
          const ways = dp[carry][aliveA][aliveB];
          if (ways === 0) {
            continue;
          }
          const choicesA = [];
          if (aliveA) {
            for (let digit = 1; digit <= 9; digit++) {
              choicesA.push([digit, 1]);
            }
            if (pos > 0) {
              choicesA.push([0, 0]);
            }
          } else {
            choicesA.push([0, 0]);
          }
          const choicesB = [];
          if (aliveB) {
            for (let digit = 1; digit <= 9; digit++) {
              choicesB.push([digit, 1]);
            }
            if (pos > 0) {
              choicesB.push([0, 0]);
            }
          } else {
            choicesB.push([0, 0]);
          }
          for (const [digitA, nextAliveA] of choicesA) {
            for (const [digitB, nextAliveB] of choicesB) {
              const sum = digitA + digitB + carry;
              if (sum % 10 !== targetDigit) {
                continue;
              }
              nextDp[Math.floor(sum / 10)][nextAliveA][nextAliveB] += ways;
            }
          }
        }
      }
    }
    dp = nextDp;
  }
  return dp[0][0][0];
};
