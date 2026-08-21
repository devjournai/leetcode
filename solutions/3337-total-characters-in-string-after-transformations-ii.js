/**
 * Total Characters in String After Transformations II
 * Intuition: Letter i expands into the next nums[i] letters (wrapping after z). t can be huge, so raise the 26x26 transformation matrix to the t-th power.
 * Approach: 1. T[i][(i+step)%26]++ for step in 1..nums[i]. 2. Compute T^t by binary exponentiation. 3. lengths[j] += count[i] * T^t[i][j]. 4. Sum lengths mod 1e9+7.
 * Dry Run: s = "ab", t = 1, nums all 1 except a->2. 'a' becomes "bc", 'b' becomes "c", length 3.
 * Time Complexity: O(|s| + 26^3 * log T)
 * Space Complexity: O(1)
 */

var lengthAfterTransformations = function (s, t, nums) {
  const MOD = 1000000007;
  const transformation = getTransformationMatrix(nums);
  const powered = matrixPow(transformation, t, MOD);
  const count = Array(26).fill(0);
  const lengths = Array(26).fill(0);

  for (const char of s) {
    count[char.charCodeAt(0) - 97]++;
  }

  for (let from = 0; from < 26; from++) {
    for (let to = 0; to < 26; to++) {
      lengths[to] =
        (lengths[to] +
          Number(
            (BigInt(count[from]) * BigInt(powered[from][to])) % BigInt(MOD)
          )) %
        MOD;
    }
  }

  let total = 0;
  for (const length of lengths) {
    total = (total + length) % MOD;
  }
  return total;
};

function getTransformationMatrix(nums) {
  const transformation = Array.from({ length: 26 }, () => Array(26).fill(0));
  for (let letter = 0; letter < nums.length; letter++) {
    for (let step = 1; step <= nums[letter]; step++) {
      transformation[letter][(letter + step) % 26]++;
    }
  }
  return transformation;
}

function getIdentityMatrix(size) {
  const identity = Array.from({ length: size }, () => Array(size).fill(0));
  for (let index = 0; index < size; index++) {
    identity[index][index] = 1;
  }
  return identity;
}

function matrixMult(left, right, mod) {
  const size = left.length;
  const product = Array.from({ length: size }, () => Array(size).fill(0));
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      let sum = 0n;
      const modulus = BigInt(mod);
      for (let mid = 0; mid < size; mid++) {
        sum =
          (sum + BigInt(left[row][mid]) * BigInt(right[mid][col])) % modulus;
      }
      product[row][col] = Number(sum);
    }
  }
  return product;
}

function matrixPow(matrix, exponent, mod) {
  if (exponent === 0) {
    return getIdentityMatrix(matrix.length);
  }
  if (exponent % 2 === 1) {
    return matrixMult(matrix, matrixPow(matrix, exponent - 1, mod), mod);
  }
  return matrixPow(
    matrixMult(matrix, matrix, mod),
    Math.floor(exponent / 2),
    mod
  );
}
