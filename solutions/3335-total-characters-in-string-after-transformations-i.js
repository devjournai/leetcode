/**
 * Total Characters in String After Transformations I
 * Intuition: Each transformation maps a..y to the next letter and z to "ab". Track a 26-bin frequency array for t steps; the length is the sum of frequencies.
 * Approach: Count letters. Repeat t times: newCount[i+1] = count[i] for i < 25, and z contributes to both a and b (mod 1e9+7).
 * Dry Run: s = "abcyy", t = 2. After one step "bcdzz", after two "cdeabab". Length 7.
 * Time Complexity: O(|s| + 26 * T)
 * Space Complexity: O(1)
 */

var lengthAfterTransformations = function (s, t) {
  const MOD = 1000000007;
  let count = Array(26).fill(0);

  for (const char of s) {
    count[char.charCodeAt(0) - 97]++;
  }

  for (let step = 0; step < t; step++) {
    const nextCount = Array(26).fill(0);
    for (let letter = 0; letter < 25; letter++) {
      nextCount[letter + 1] = count[letter] % MOD;
    }
    nextCount[0] = count[25] % MOD;
    nextCount[1] = (nextCount[1] + count[25]) % MOD;
    count = nextCount;
  }

  let length = 0;
  for (const frequency of count) {
    length = (length + frequency) % MOD;
  }
  return length;
};
