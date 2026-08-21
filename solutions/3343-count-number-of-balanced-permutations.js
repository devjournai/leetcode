/**
 * Count Number of Balanced Permutations
 * Intuition: A permutation is balanced when even-index digits sum to odd-index digits, i.e. even positions get sum/2. Count ways to assign digits to even/odd slots, then divide by repeated-digit factorials.
 * Approach: 1. If total sum is odd, return 0. 2. Sort digits descending. 3. Memoize remaining (evenSlots, oddSlots, evenSumNeeded): place nums[index] in an even or odd slot. 4. Multiply by remaining slot counts; divide by product of freq! via modular inverse.
 * Dry Run: num = "123". Sum 6, even slots 2, odd 1, evenBalance 3. Valid perms include 1,2,3 arrangements that split evenly.
 * Time Complexity: O(N^2 * S) where S is half the digit sum
 * Space Complexity: O(N^2 * S)
 */

var countBalancedPermutations = function (num) {
  const MOD = 1000000007;
  const nums = [];
  for (const char of num) {
    nums.push(char.charCodeAt(0) - 48);
  }
  const total = nums.reduce((sum, digit) => sum + digit, 0);
  if (total % 2 === 1) {
    return 0;
  }

  nums.sort((a, b) => b - a);

  const evenSlots = Math.floor((nums.length + 1) / 2);
  const oddSlots = Math.floor(nums.length / 2);
  const evenBalance = total / 2;
  const memo = Array.from({ length: evenSlots + 1 }, () =>
    Array.from({ length: oddSlots + 1 }, () => Array(evenBalance + 1).fill(-1))
  );

  const ways =
    (countWays(nums, evenSlots, oddSlots, evenBalance, memo, MOD) *
      modInverse(getPerm(nums, MOD), MOD)) %
    BigInt(MOD);
  return Number(ways);
};

function countWays(nums, even, odd, evenBalance, memo, mod) {
  if (evenBalance < 0) {
    return 0n;
  }
  if (even === 0) {
    return evenBalance === 0 ? factorial(odd, mod) : 0n;
  }
  const index = nums.length - (even + odd);
  if (odd === 0) {
    let remainingSum = 0;
    for (let i = index; i < nums.length; i++) {
      remainingSum += nums[i];
    }
    return remainingSum === evenBalance ? factorial(even, mod) : 0n;
  }
  if (memo[even][odd][evenBalance] !== -1) {
    return memo[even][odd][evenBalance];
  }

  const placeEven =
    (countWays(nums, even - 1, odd, evenBalance - nums[index], memo, mod) *
      BigInt(even)) %
    BigInt(mod);
  const placeOdd =
    (countWays(nums, even, odd - 1, evenBalance, memo, mod) * BigInt(odd)) %
    BigInt(mod);
  memo[even][odd][evenBalance] = (placeEven + placeOdd) % BigInt(mod);
  return memo[even][odd][evenBalance];
}

function getPerm(nums, mod) {
  const count = Array(10).fill(0);
  for (const digit of nums) {
    count[digit]++;
  }
  let result = 1n;
  for (const freq of count) {
    result = (result * factorial(freq, mod)) % BigInt(mod);
  }
  return result;
}

function factorial(n, mod) {
  let result = 1n;
  for (let i = 2; i <= n; i++) {
    result = (result * BigInt(i)) % BigInt(mod);
  }
  return result;
}

function modInverse(a, mod) {
  let m = BigInt(mod);
  let y = 0n;
  let x = 1n;
  a = BigInt(a);
  while (a > 1n) {
    const q = a / m;
    let t = m;
    m = a % m;
    a = t;
    t = y;
    y = x - q * y;
    x = t;
  }
  return x < 0n ? x + BigInt(mod) : x;
}
