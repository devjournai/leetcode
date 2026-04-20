/**
 * K Th Symbol In Grammar
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var kthGrammar = function (n, k) {
  let inversionCount = 0;

  let currentGrammarLevel = n;
  let currentSymbolPosition = k;

  while (currentGrammarLevel > 1) {
    const symbolsInCurrentRow = 1 << (currentGrammarLevel - 1);
    const middlePoint = symbolsInCurrentRow / 2;

    if (currentSymbolPosition > middlePoint) {
      inversionCount++;
      currentSymbolPosition -= middlePoint;
    }

    currentGrammarLevel--;
  }

  if (inversionCount % 2 === 0) {
    return 0;
  } else {
    return 1;
  }
};
