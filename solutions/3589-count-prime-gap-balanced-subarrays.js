/**
 * Count Prime-Gap Balanced Subarrays
 * Intuition: A subarray is valid if it contains at least two primes and maxPrime-minPrime ≤ k. For each right end, slide left until the primes in view satisfy the gap, then every start up through the second-last prime is valid.
 * Approach: 1. Sieve primes. 2. Two pointers with monotonic deques of prime indices by value. 3. Track prime positions in the window. 4. Add secondLastPrimeIndex - left + 1.
 * Dry Run: nums = [1,2,3], k = 1. Right=2 window [0,2], primes at 1 and 2, second last=1, add 1-0+1=2. Answer 2.
 * Time Complexity: O(N + A log log A)
 * Space Complexity: O(N + A)
 */
var primeSubarray = function (nums, k) {
  const maxVal = Math.max(...nums, 2);
  const isPrime = new Array(maxVal + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;
  for (let i = 2; i * i <= maxVal; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= maxVal; j += i) {
        isPrime[j] = false;
      }
    }
  }

  const n = nums.length;
  const maxDeque = [];
  const minDeque = [];
  const primePos = [];
  let left = 0;
  let answer = 0;

  const popFrontIfOut = (deque) => {
    while (deque.length && deque[0] < left) {
      deque.shift();
    }
  };

  for (let right = 0; right < n; right++) {
    if (isPrime[nums[right]]) {
      while (
        maxDeque.length &&
        nums[maxDeque[maxDeque.length - 1]] <= nums[right]
      ) {
        maxDeque.pop();
      }
      maxDeque.push(right);
      while (
        minDeque.length &&
        nums[minDeque[minDeque.length - 1]] >= nums[right]
      ) {
        minDeque.pop();
      }
      minDeque.push(right);
      primePos.push(right);
    }

    while (
      maxDeque.length &&
      minDeque.length &&
      nums[maxDeque[0]] - nums[minDeque[0]] > k
    ) {
      left = Math.min(maxDeque[0], minDeque[0]) + 1;
      popFrontIfOut(maxDeque);
      popFrontIfOut(minDeque);
      while (primePos.length && primePos[0] < left) {
        primePos.shift();
      }
    }

    if (primePos.length >= 2) {
      answer += primePos[primePos.length - 2] - left + 1;
    }
  }

  return answer;
};
