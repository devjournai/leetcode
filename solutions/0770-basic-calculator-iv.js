/**
 * Basic Calculator Iv
 * Time Complexity: O(L * T^2 * D * W)
 * Space Complexity: O(L * T * D * W)
 */
var basicCalculatorIV = function (
  inputExpressionString,
  evaluationVariables,
  evaluationIntegers,
) {
  const variableEvaluations = new Map();
  let varIndex = 0;
  while (varIndex < evaluationVariables.length) {
    variableEvaluations.set(
      evaluationVariables[varIndex],
      evaluationIntegers[varIndex],
    );
    varIndex++;
  }

  const finalExpressionRepresentation = processExpressionString(
    inputExpressionString,
    variableEvaluations,
  );
  return finalExpressionRepresentation.outputFormattedArray();

  function processExpressionString(expressionContent, evalMap) {
    const expressionChunks = generateTokens(expressionContent);
    return parseArithmeticExpression(expressionChunks, 0, evalMap)[0];
  }

  function generateTokens(inputString) {
    const expressionChunks = [];
    let traversalIndex = 0;

    for (; traversalIndex < inputString.length; ) {
      const charConsidered = inputString[traversalIndex];

      if (charConsidered === " ") {
        traversalIndex++;
      } else if (["+", "-", "*", "(", ")"].includes(charConsidered)) {
        expressionChunks.push(charConsidered);
        traversalIndex++;
      } else if (/[a-z]/.test(charConsidered)) {
        let variableSegment = "";
        let currentIter = traversalIndex;
        while (
          currentIter < inputString.length &&
          /[a-z]/.test(inputString[currentIter])
        ) {
          variableSegment += inputString[currentIter];
          currentIter++;
        }
        expressionChunks.push(variableSegment);
        traversalIndex = currentIter;
      } else if (/\d/.test(charConsidered)) {
        let numericSegment = "";
        let numberIter = traversalIndex;
        while (
          numberIter < inputString.length &&
          /\d/.test(inputString[numberIter])
        ) {
          numericSegment += inputString[numberIter];
          numberIter++;
        }
        expressionChunks.push(parseInt(numericSegment));
        traversalIndex = numberIter;
      } else {
        traversalIndex++;
      }
    }

    return expressionChunks;
  }

  function parseArithmeticExpression(
    tokenArray,
    startTokenIndex,
    currentEvalMap,
  ) {
    let [leftOperand, currentReadPosition] = parseMultiplicativeTerm(
      tokenArray,
      startTokenIndex,
      currentEvalMap,
    );

    while (
      currentReadPosition < tokenArray.length &&
      (tokenArray[currentReadPosition] === "+" ||
        tokenArray[currentReadPosition] === "-")
    ) {
      const operationSymbol = tokenArray[currentReadPosition];
      const [rightOperand, nextReadPosition] = parseMultiplicativeTerm(
        tokenArray,
        currentReadPosition + 1,
        currentEvalMap,
      );

      leftOperand =
        operationSymbol === "+"
          ? leftOperand.combineExpressions(rightOperand)
          : leftOperand.deductExpressions(rightOperand);
      currentReadPosition = nextReadPosition;
    }

    return [leftOperand, currentReadPosition];
  }

  function parseMultiplicativeTerm(
    tokenArray,
    startIndexForTerm,
    currentEvalMap,
  ) {
    let [leftFactor, positionAfterFactor] = parseAtomicFactor(
      tokenArray,
      startIndexForTerm,
      currentEvalMap,
    );

    while (
      positionAfterFactor < tokenArray.length &&
      tokenArray[positionAfterFactor] === "*"
    ) {
      const [rightFactor, nextPositionAfterFactor] = parseAtomicFactor(
        tokenArray,
        positionAfterFactor + 1,
        currentEvalMap,
      );
      leftFactor = leftFactor.multiplyExpressionComponents(rightFactor);
      positionAfterFactor = nextPositionAfterFactor;
    }

    return [leftFactor, positionAfterFactor];
  }

  function parseAtomicFactor(tokenArray, startIndexForFactor, currentEvalMap) {
    const currentTokenValue = tokenArray[startIndexForFactor];

    if (currentTokenValue === "(") {
      const [innerExpression, positionAfterParen] = parseArithmeticExpression(
        tokenArray,
        startIndexForFactor + 1,
        currentEvalMap,
      );
      return [innerExpression, positionAfterParen + 1];
    }

    if (
      typeof currentTokenValue === "string" &&
      /[a-z]/.test(currentTokenValue)
    ) {
      return currentEvalMap.has(currentTokenValue)
        ? [
            new ExpressionClass([
              new TermClass(currentEvalMap.get(currentTokenValue)),
            ]),
            startIndexForFactor + 1,
          ]
        : [
            new ExpressionClass([new TermClass(1, [currentTokenValue])]),
            startIndexForFactor + 1,
          ];
    }

    if (typeof currentTokenValue === "number") {
      return [
        new ExpressionClass([new TermClass(currentTokenValue)]),
        startIndexForFactor + 1,
      ];
    }

    throw new Error(`Unrecognized token: ${currentTokenValue}`);
  }
};

class TermClass {
  constructor(coeffValue = 0, varsList = []) {
    this.termCoefficient = coeffValue;
    this.termVariables = [...varsList].sort();
  }

  multiplyTerms(otherTerm) {
    return new TermClass(
      this.termCoefficient * otherTerm.termCoefficient,
      [...this.termVariables, ...otherTerm.termVariables].sort(),
    );
  }

  formatTerm() {
    if (this.termCoefficient === 0) return "";
    if (this.termVariables.length === 0) return `${this.termCoefficient}`;
    return `${this.termCoefficient}*${this.termVariables.join("*")}`;
  }

  get variableCount() {
    return this.termVariables.length;
  }

  compareTermOrder(anotherTerm) {
    if (this.variableCount !== anotherTerm.variableCount)
      return anotherTerm.variableCount - this.variableCount;

    let varComparisonIndex = 0;
    while (varComparisonIndex < this.variableCount) {
      if (
        this.termVariables[varComparisonIndex] !==
        anotherTerm.termVariables[varComparisonIndex]
      ) {
        return this.termVariables[varComparisonIndex].localeCompare(
          anotherTerm.termVariables[varComparisonIndex],
        );
      }
      varComparisonIndex++;
    }
    return 0;
  }
}

class ExpressionClass {
  constructor(initialTerms = []) {
    this.expressionTerms = initialTerms;
  }

  combineExpressions(otherExpr, coefficientMultiplier = 1) {
    const termLookup = new Map();

    let existingTermIter = 0;
    while (existingTermIter < this.expressionTerms.length) {
      const currentTerm = this.expressionTerms[existingTermIter];
      const termKeyString = currentTerm.termVariables.join("*");
      termLookup.set(termKeyString, currentTerm);
      existingTermIter++;
    }

    let incomingTermIter = 0;
    while (incomingTermIter < otherExpr.expressionTerms.length) {
      const incomingTerm = otherExpr.expressionTerms[incomingTermIter];
      const incomingTermKey = incomingTerm.termVariables.join("*");
      if (termLookup.has(incomingTermKey)) {
        termLookup.get(incomingTermKey).termCoefficient +=
          incomingTerm.termCoefficient * coefficientMultiplier;
      } else {
        const newlyCreatedTerm = new TermClass(
          incomingTerm.termCoefficient * coefficientMultiplier,
          incomingTerm.termVariables,
        );
        this.expressionTerms.push(newlyCreatedTerm);
        termLookup.set(incomingTermKey, newlyCreatedTerm);
      }
      incomingTermIter++;
    }

    this.expressionTerms = this.expressionTerms.filter(
      (monomial) => monomial.termCoefficient !== 0,
    );
    return this;
  }

  deductExpressions(otherExpr) {
    return this.combineExpressions(otherExpr, -1);
  }

  multiplyExpressionComponents(otherExpr) {
    const resultantExpression = new ExpressionClass();

    let firstExprTermIndex = 0;
    while (firstExprTermIndex < this.expressionTerms.length) {
      const termOne = this.expressionTerms[firstExprTermIndex];
      let secondExprTermIndex = 0;
      while (secondExprTermIndex < otherExpr.expressionTerms.length) {
        const termTwo = otherExpr.expressionTerms[secondExprTermIndex];
        const termProduct = termOne.multiplyTerms(termTwo);
        if (termProduct.termCoefficient !== 0) {
          resultantExpression.combineExpressions(
            new ExpressionClass([termProduct]),
          );
        }
        secondExprTermIndex++;
      }
      firstExprTermIndex++;
    }

    return resultantExpression;
  }

  outputFormattedArray() {
    this.expressionTerms.sort((a, b) => a.compareTermOrder(b));
    return this.expressionTerms
      .map((termItem) => termItem.formatTerm())
      .filter(Boolean);
  }
}
