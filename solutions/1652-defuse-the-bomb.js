/**
 * Defuse The Bomb
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
