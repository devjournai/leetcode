/**
 * Check if Any Element Has Prime Frequency
 * Intuition: Count frequencies and test whether any frequency is prime.
 * Approach: 1. Build a frequency map. 2. For each frequency, trial-divide up to sqrt. 3. Return true on the first prime frequency.
 * Dry Run: nums = [1, 2, 2, 3, 3, 3]. Frequencies 1,2,3. 2 and 3 are prime → true.
 * Time Complexity: O(N * sqrt(N))
 * Space Complexity: O(N)
 */
var checkPrimeFrequency = function (nums) {
  const freq = new Map();
  for (const x of nums) {
    freq.set(x, (freq.get(x) || 0) + 1);
  }

  const isPrime = (x) => {
    if (x < 2) {
      return false;
    }
    for (let i = 2; i * i <= x; i++) {
      if (x % i === 0) {
        return false;
      }
    }
    return true;
  };

  for (const count of freq.values()) {
    if (isPrime(count)) {
      return true;
    }
  }
  return false;
};
