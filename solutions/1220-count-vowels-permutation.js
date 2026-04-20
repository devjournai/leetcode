/**
 * Count Vowels Permutation
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
