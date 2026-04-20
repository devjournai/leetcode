/**
 * Brace Expansion II
 * Time Complexity: O(N * W^2 * L + W_final * L_final * log(W_final))
 * Space Complexity: O(N * W * L)
 */
var braceExpansionII = function (expression) {
  let globalExpressionIndex = 0;

  function createCartesianProduct(firstWordsSet, secondWordsSet) {
    const productCollection = new Set();
    for (const firstWordItem of firstWordsSet) {
      for (const secondWordItem of secondWordsSet) {
        productCollection.add(firstWordItem + secondWordItem);
      }
    }
    return productCollection;
  }

  function parseAtomicTerm() {
    let currentTermWords = new Set();

    if (expression[globalExpressionIndex] === "{") {
      globalExpressionIndex++;
      currentTermWords = parseUnionOfExpressions();
      globalExpressionIndex++;
    } else {
      currentTermWords.add(expression[globalExpressionIndex]);
      globalExpressionIndex++;
    }
    return currentTermWords;
  }

  function parseConcatenatedSequence() {
    let concatenatedWords = new Set([""]);

    while (
      globalExpressionIndex < expression.length &&
      expression[globalExpressionIndex] !== "," &&
      expression[globalExpressionIndex] !== "}"
    ) {
      const nextAtomicTerm = parseAtomicTerm();
      concatenatedWords = createCartesianProduct(
        concatenatedWords,
        nextAtomicTerm,
      );
    }
    return concatenatedWords;
  }

  function parseUnionOfExpressions() {
    const unionOfResults = new Set();

    const firstSequence = parseConcatenatedSequence();
    for (const wordFromFirst of firstSequence) {
      unionOfResults.add(wordFromFirst);
    }

    while (
      globalExpressionIndex < expression.length &&
      expression[globalExpressionIndex] === ","
    ) {
      globalExpressionIndex++;
      const nextSequence = parseConcatenatedSequence();
      for (const wordFromNext of nextSequence) {
        unionOfResults.add(wordFromNext);
      }
    }
    return unionOfResults;
  }

  const finalWordsResult = parseUnionOfExpressions();
  const sortedFinalList = [...finalWordsResult].sort();
  return sortedFinalList;
};
