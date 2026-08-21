/**
 * Defuse The Bomb
 * Intuition: code[i] becomes the sum of the next k (or previous |k|) circular entries, or 0 if k=0. Maintain a sliding window on the circular array.
 * Approach: 1. If k=0 return zeros. 2. If k>0, sum code[1..k], then slide: subtract code[i], add code[i+k]. 3. If k<0, sum the |k| cells before 0, then slide similarly wrapping with modulo.
 * Dry Run: code=[5,7,1,4], k=3.
 *   - Windows: 7+1+4=12, 1+4+5=10, 4+5+7=16, 5+7+1=13.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var decrypt = function (code, k) {
  const codeLength = code.length;
  const decryptedCode = new Array(codeLength).fill(0);

  if (k === 0) {
    return decryptedCode;
  }

  if (k > 0) {
    let currentWindowSum = 0;
    let forwardIterator = 0;
    for (forwardIterator = 1; forwardIterator <= k; forwardIterator++) {
      currentWindowSum += code[forwardIterator % codeLength];
    }
    decryptedCode[0] = currentWindowSum;

    let calculateIndex = 1;
    for (calculateIndex = 1; calculateIndex < codeLength; calculateIndex++) {
      currentWindowSum -= code[calculateIndex % codeLength];
      currentWindowSum += code[(calculateIndex + k) % codeLength];
      decryptedCode[calculateIndex] = currentWindowSum;
    }
  } else {
    // k < 0
    const absoluteKValue = Math.abs(k);
    let backwardWindowSum = 0;
    let initialBackwardIndex = 0;
    for (
      initialBackwardIndex = 1;
      initialBackwardIndex <= absoluteKValue;
      initialBackwardIndex++
    ) {
      backwardWindowSum +=
        code[(codeLength - initialBackwardIndex + codeLength) % codeLength];
    }
    decryptedCode[0] = backwardWindowSum;

    let fillResultIndex = 1;
    for (fillResultIndex = 1; fillResultIndex < codeLength; fillResultIndex++) {
      backwardWindowSum -=
        code[(fillResultIndex - absoluteKValue - 1 + codeLength) % codeLength];
      backwardWindowSum +=
        code[(fillResultIndex - 1 + codeLength) % codeLength];
      decryptedCode[fillResultIndex] = backwardWindowSum;
    }
  }

  return decryptedCode;
};
