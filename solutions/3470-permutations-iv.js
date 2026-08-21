/**
 * Permutations IV
 * Intuition: We want the k-th 1-indexed alternating-parity permutation of `1..n`. If `n` is odd it must start with odd. Build it left to right: for each position, each valid remaining number heads the same number of alternating suffixes, `floor((L-1)/2)! * floor(L/2)!`.
 * Approach: 1. Keep unused numbers in order. 2. For remaining length `L`, suffix count = `((L-1)//2)! * (L//2)!` (BigInt). 3. On the first position, if `n` is odd skip evens; afterward require opposite parity of the last placed value. 4. Subtract suffix counts until `k` falls in a candidate’s block, place it, repeat. 5. If k is too large, return `[]`.
 * Dry Run: n = 4, k = 6. Alternating perms start 1,2,... then 1,4,... 2,1,...; walk candidates until the 6th is selected. n = 3, k = 3 has only two valid perms → [].
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
function factorial(value) {
  let result = 1n;
  for (let factor = 2n; factor <= BigInt(value); factor++) {
    result *= factor;
  }
  return result;
}

var permute = function (n, k) {
  const permutation = [];
  const remainingNumbers = Array.from({ length: n }, (_, index) => index + 1);
  let remainingK = BigInt(k);
  let lastParity = null;

  for (let placed = 0; placed < n; placed++) {
    const remainingLength = n - placed;
    const remainingPermutations =
      factorial(Math.floor((remainingLength - 1) / 2)) *
      factorial(Math.floor(remainingLength / 2));

    let found = false;
    for (let index = 0; index < remainingNumbers.length; index++) {
      const number = remainingNumbers[index];
      const isOdd = number % 2 === 1;

      if (lastParity === null) {
        if (n % 2 === 1 && !isOdd) {
          continue;
        }
      } else if (number % 2 === lastParity) {
        continue;
      }

      if (remainingK <= remainingPermutations) {
        remainingNumbers.splice(index, 1);
        permutation.push(number);
        lastParity = number % 2;
        found = true;
        break;
      }
      remainingK -= remainingPermutations;
    }

    if (!found) {
      return [];
    }
  }

  return permutation;
};
