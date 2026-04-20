/**
 * Number Of Atoms
 * Time Complexity: O(N + U log U)
 * Space Complexity: O(N)
 */
var countOfAtoms = function (chemicalExpression) {
  const [atomicCompositionMap] = parseChemicalString(chemicalExpression, 0);

  const sortedElementKeys = [...atomicCompositionMap.keys()].sort();
  let resultString = "";
  for (const singleKey of sortedElementKeys) {
    resultString += singleKey;
    const keyQuantity = atomicCompositionMap.get(singleKey);
    if (keyQuantity > 1) {
      resultString += keyQuantity;
    }
  }
  return resultString;

  function parseChemicalString(currentFormulaSegment, startingIndex) {
    const currentLevelAtoms = new Map();
    let currentProcessingIndex = startingIndex;

    while (
      currentProcessingIndex < currentFormulaSegment.length &&
      currentFormulaSegment[currentProcessingIndex] !== ")"
    ) {
      const charAtCurrent = currentFormulaSegment[currentProcessingIndex];

      if (charAtCurrent === "(") {
        const [innerMap, closingParenthesisIndex] = parseChemicalString(
          currentFormulaSegment,
          currentProcessingIndex + 1,
        );
        const [groupFactor, postGroupIndex] = retrieveNumber(
          currentFormulaSegment,
          closingParenthesisIndex + 1,
        );
        const effectiveFactor = groupFactor === null ? 1 : groupFactor;

        for (const [innerAtomSymbol, innerAtomQuantity] of innerMap) {
          currentLevelAtoms.set(
            innerAtomSymbol,
            (currentLevelAtoms.get(innerAtomSymbol) || 0) +
              innerAtomQuantity * effectiveFactor,
          );
        }
        currentProcessingIndex = postGroupIndex;
      } else {
        const [atomIdentifier, nextAtomPosition] = identifyAtom(
          currentFormulaSegment,
          currentProcessingIndex,
        );
        const [atomCountValue, nextCountPosition] = retrieveNumber(
          currentFormulaSegment,
          nextAtomPosition,
        );
        const actualCount = atomCountValue === null ? 1 : atomCountValue;

        currentLevelAtoms.set(
          atomIdentifier,
          (currentLevelAtoms.get(atomIdentifier) || 0) + actualCount,
        );
        currentProcessingIndex = nextCountPosition;
      }
    }
    return [currentLevelAtoms, currentProcessingIndex];
  }

  function identifyAtom(sourceString, parsingStartIndex) {
    let atomSymbol = sourceString[parsingStartIndex];
    let symbolScanIndex = parsingStartIndex + 1;
    while (
      symbolScanIndex < sourceString.length &&
      /[a-z]/.test(sourceString[symbolScanIndex])
    ) {
      atomSymbol += sourceString[symbolScanIndex];
      symbolScanIndex++;
    }
    return [atomSymbol, symbolScanIndex];
  }

  function retrieveNumber(sourceStringValue, numberStartingIndex) {
    let extractedNumber = 0;
    let numberScanIndex = numberStartingIndex;
    let digitFound = false;

    while (
      numberScanIndex < sourceStringValue.length &&
      /[0-9]/.test(sourceStringValue[numberScanIndex])
    ) {
      extractedNumber =
        extractedNumber * 10 + Number(sourceStringValue[numberScanIndex]);
      numberScanIndex++;
      digitFound = true;
    }
    return [digitFound ? extractedNumber : null, numberScanIndex];
  }
};
