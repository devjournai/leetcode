/**
 * Count Vowels Permutation
 * Intuition: Each vowel may follow only specific predecessors; keep five running counts and roll them for n-1 steps.
 * Approach: 1. Start all vowels at 1 for length 1. 2. a←e+i+u, e←a+i, i←e+o, o←i, u←i+o, all mod 10^9+7. 3. Sum the five counts.
 * Dry Run: n=1 → 5. n=2 → a from e,i,u (3) plus other transitions → 10.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var countVowelPermutation = function (n) {
  const moduloConstant = 1000000007n;

  let countForA = 1n;
  let countForE = 1n;
  let countForI = 1n;
  let countForO = 1n;
  let countForU = 1n;

  let lengthIterator = 2;
  while (lengthIterator <= n) {
    const temporaryACount = countForA;
    const temporaryECount = countForE;
    const temporaryICount = countForI;
    const temporaryOCount = countForO;
    const temporaryUCount = countForU;

    countForA =
      (temporaryECount + temporaryICount + temporaryUCount) % moduloConstant;
    countForE = (temporaryACount + temporaryICount) % moduloConstant;
    countForI = (temporaryECount + temporaryOCount) % moduloConstant;
    countForO = temporaryICount % moduloConstant;
    countForU = (temporaryICount + temporaryOCount) % moduloConstant;

    lengthIterator++;
  }

  const totalPermutationsCount =
    (countForA + countForE + countForI + countForO + countForU) %
    moduloConstant;

  return Number(totalPermutationsCount);
};
