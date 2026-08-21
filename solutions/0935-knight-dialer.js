/**
 * Knight Dialer
 * Intuition: A knight hop graph on the keypad (5 has no outbound hops in this table). Counts after n hops are the sum of in-neighbors’ counts after n−1, mod 1e9+7.
 * Approach: 1. `keypadMoves[digit]` lists knight destinations. 2. `currentDigitCounts` starts at 1 each. 3. For pathLength 1..n-1, add each key’s count into its next keys. 4. Sum the ten buckets.
 * Dry Run: n=1 → 10. n=2: from 0→4,6 etc.; total 20.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var knightDialer = function (n) {
  const moduloValue = 1000000007;
  const keypadMoves = [
    [4, 6],
    [6, 8],
    [7, 9],
    [4, 8],
    [0, 3, 9],
    [],
    [0, 1, 7],
    [2, 6],
    [1, 3],
    [2, 4],
  ];

  let currentDigitCounts = new Array(10).fill(1);

  for (let pathLength = 1; pathLength < n; pathLength++) {
    const nextDigitCounts = new Array(10).fill(0);
    for (let currentKey = 0; currentKey < 10; currentKey++) {
      for (const nextKey of keypadMoves[currentKey]) {
        nextDigitCounts[nextKey] =
          (nextDigitCounts[nextKey] + currentDigitCounts[currentKey]) %
          moduloValue;
      }
    }
    currentDigitCounts = nextDigitCounts;
  }

  let totalWays = 0;
  for (let finalKey = 0; finalKey < 10; finalKey++) {
    totalWays = (totalWays + currentDigitCounts[finalKey]) % moduloValue;
  }

  return totalWays;
};
