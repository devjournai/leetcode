/**
 * Longest Repeating Substring
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
var longestRepeatingSubstring = function (s) {
  const stringLength = s.length;
  let maximumLength = 0;

  if (stringLength < 2) {
    return 0;
  }

  const checkLengthExists = (currentTestLength) => {
    if (currentTestLength === 0) {
      return true;
    }
    if (currentTestLength > stringLength) {
      return false;
    }

    const primaryBase = 29;
    const primaryModulus = 1000000007;
    const secondaryBase = 31;
    const secondaryModulus = 1000000009;

    const primaryPowers = new Array(currentTestLength + 1);
    const secondaryPowers = new Array(currentTestLength + 1);

    primaryPowers[0] = 1;
    secondaryPowers[0] = 1;

    for (let powerIndex = 1; powerIndex <= currentTestLength; powerIndex++) {
      primaryPowers[powerIndex] =
        (primaryPowers[powerIndex - 1] * primaryBase) % primaryModulus;
      secondaryPowers[powerIndex] =
        (secondaryPowers[powerIndex - 1] * secondaryBase) % secondaryModulus;
    }

    let currentPrimaryHash = 0;
    let currentSecondaryHash = 0;

    for (let charIndex = 0; charIndex < currentTestLength; charIndex++) {
      const charValue = s.charCodeAt(charIndex);
      currentPrimaryHash =
        (currentPrimaryHash * primaryBase + charValue) % primaryModulus;
      currentSecondaryHash =
        (currentSecondaryHash * secondaryBase + charValue) % secondaryModulus;
    }

    const encounteredHashes = new Set();
    encounteredHashes.add(`${currentPrimaryHash},${currentSecondaryHash}`);

    for (
      let windowStart = 1;
      windowStart <= stringLength - currentTestLength;
      windowStart++
    ) {
      const charValueToRemove = s.charCodeAt(windowStart - 1);
      const charValueToAdd = s.charCodeAt(windowStart + currentTestLength - 1);

      currentPrimaryHash =
        (currentPrimaryHash -
          ((charValueToRemove * primaryPowers[currentTestLength - 1]) %
            primaryModulus) +
          primaryModulus) %
        primaryModulus;
      currentPrimaryHash =
        (currentPrimaryHash * primaryBase + charValueToAdd) % primaryModulus;

      currentSecondaryHash =
        (currentSecondaryHash -
          ((charValueToRemove * secondaryPowers[currentTestLength - 1]) %
            secondaryModulus) +
          secondaryModulus) %
        secondaryModulus;
      currentSecondaryHash =
        (currentSecondaryHash * secondaryBase + charValueToAdd) %
        secondaryModulus;

      if (
        encounteredHashes.has(`${currentPrimaryHash},${currentSecondaryHash}`)
      ) {
        return true;
      }
      encounteredHashes.add(`${currentPrimaryHash},${currentSecondaryHash}`);
    }

    return false;
  };

  let lowPointer = 1;
  let highPointer = stringLength - 1;

  while (lowPointer <= highPointer) {
    const midPoint = lowPointer + Math.floor((highPointer - lowPointer) / 2);
    if (checkLengthExists(midPoint)) {
      maximumLength = midPoint;
      lowPointer = midPoint + 1;
    } else {
      highPointer = midPoint - 1;
    }
  }

  return maximumLength;
};
