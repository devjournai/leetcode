/**
 * 736. Parse Lisp Expression
 * Intuition: Recursively evaluate tokens. Integers and variables are leaves; `add`/`mult` evaluate two operands; `let` binds names in a copied scope then evaluates the last expression. Tokenize by spaces only at parentheses depth 0 so nested `(...)` stay one token.
 * Approach: 1. `parseExpression`: parseInt if numeric; else look up the variable; else strip outer parens and `tokenizeString`. 2. Dispatch `add`, `mult`, or `let` (pairs into `letBlockScope`). 3. Tokenizer tracks `currentParenthesesDepth`.
 * Dry Run: "(let x 2 (mult x 5))" binds x=2 then returns 10. "(add (add 1 2) 3)" tokenizes the nested add as one operand → 6.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var evaluate = function (expression) {
  const initialScopeMap = new Map();
  return parseExpression(expression, initialScopeMap);

  function parseExpression(currentExpressionString, currentVariableScope) {
    const integerValue = parseInt(currentExpressionString);
    if (!isNaN(integerValue)) {
      return integerValue;
    }

    if (!currentExpressionString.startsWith("(")) {
      const foundVariableValue = currentVariableScope.get(
        currentExpressionString
      );
      return foundVariableValue;
    }

    const innerContentString = currentExpressionString.slice(1, -1);
    const expressionParts = tokenizeString(innerContentString);

    const operationType = expressionParts[0];

    if (operationType === "add") {
      const firstOperandExpression = expressionParts[1];
      const secondOperandExpression = expressionParts[2];
      const firstEvaluatedValue = parseExpression(
        firstOperandExpression,
        currentVariableScope
      );
      const secondEvaluatedValue = parseExpression(
        secondOperandExpression,
        currentVariableScope
      );
      return firstEvaluatedValue + secondEvaluatedValue;
    }

    if (operationType === "mult") {
      const multiplicandExpression = expressionParts[1];
      const multiplierExpression = expressionParts[2];
      const multiplicandValue = parseExpression(
        multiplicandExpression,
        currentVariableScope
      );
      const multiplierValue = parseExpression(
        multiplierExpression,
        currentVariableScope
      );
      return multiplicandValue * multiplierValue;
    }

    if (operationType === "let") {
      const letBlockScope = new Map(currentVariableScope);
      let partIndex = 1;
      while (partIndex < expressionParts.length - 1) {
        const variableName = expressionParts[partIndex];
        const variableValueDefinition = expressionParts[partIndex + 1];
        const evaluatedVariableValue = parseExpression(
          variableValueDefinition,
          letBlockScope
        );
        letBlockScope.set(variableName, evaluatedVariableValue);
        partIndex += 2;
      }
      const finalEvaluationExpression =
        expressionParts[expressionParts.length - 1];
      return parseExpression(finalEvaluationExpression, letBlockScope);
    }
  }

  function tokenizeString(inputContent) {
    const tokenResultArray = [];
    let currentBuildString = "";
    let currentParenthesesDepth = 0;

    for (const characterInInput of inputContent) {
      if (characterInInput === " " && currentParenthesesDepth === 0) {
        tokenResultArray.push(currentBuildString);
        currentBuildString = "";
      } else {
        currentBuildString += characterInInput;
        if (characterInInput === "(") {
          currentParenthesesDepth++;
        } else if (characterInInput === ")") {
          currentParenthesesDepth--;
        }
      }
    }
    tokenResultArray.push(currentBuildString);
    return tokenResultArray;
  }
};
