/**
 * Design An Expression Tree With Evaluate Function
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var Node = function () {
  if (this.constructor === Node) {
    throw new Error("Abstract class cannot be instantiated");
  }
};

Node.prototype.evaluate = function () {
  throw new Error("Abstract method must be implemented");
};

class OperandNode extends Node {
  constructor(numericValue) {
    super();
    this.storedOperandValue = parseInt(numericValue);
  }

  evaluate() {
    return this.storedOperandValue;
  }
}

class BinaryOperatorBaseNode extends Node {
  constructor(leftExpression, rightExpression) {
    super();
    this.leftSubExpression = leftExpression;
    this.rightSubExpression = rightExpression;
  }
}

class AdditionOperatorNode extends BinaryOperatorBaseNode {
  constructor(leftExpr, rightExpr) {
    super(leftExpr, rightExpr);
  }

  evaluate() {
    const sumLeftValue = this.leftSubExpression.evaluate();
    const sumRightValue = this.rightSubExpression.evaluate();
    return sumLeftValue + sumRightValue;
  }
}

class SubtractionOperatorNode extends BinaryOperatorBaseNode {
  constructor(leftExpr, rightExpr) {
    super(leftExpr, rightExpr);
  }

  evaluate() {
    const diffLeftValue = this.leftSubExpression.evaluate();
    const diffRightValue = this.rightSubExpression.evaluate();
    return diffLeftValue - diffRightValue;
  }
}

class MultiplicationOperatorNode extends BinaryOperatorBaseNode {
  constructor(leftExpr, rightExpr) {
    super(leftExpr, rightExpr);
  }

  evaluate() {
    const productLeftValue = this.leftSubExpression.evaluate();
    const productRightValue = this.rightSubExpression.evaluate();
    return productLeftValue * productRightValue;
  }
}

class DivisionOperatorNode extends BinaryOperatorBaseNode {
  constructor(leftExpr, rightExpr) {
    super(leftExpr, rightExpr);
  }

  evaluate() {
    const divisionLeftValue = this.leftSubExpression.evaluate();
    const divisionRightValue = this.rightSubExpression.evaluate();
    return Math.floor(divisionLeftValue / divisionRightValue);
  }
}

class ExpressionTreeBuilder {
  buildTree(expressionTokens) {
    const nodeStack = [];
    const operatorsLookup = new Set(["+", "-", "*", "/"]);

    for (const currentTokenItem of expressionTokens) {
      if (operatorsLookup.has(currentTokenItem)) {
        const operandTwo = nodeStack.pop();
        const operandOne = nodeStack.pop();

        let newOperatorNode;
        switch (currentTokenItem) {
          case "+":
            newOperatorNode = new AdditionOperatorNode(operandOne, operandTwo);
            break;
          case "-":
            newOperatorNode = new SubtractionOperatorNode(
              operandOne,
              operandTwo,
            );
            break;
          case "*":
            newOperatorNode = new MultiplicationOperatorNode(
              operandOne,
              operandTwo,
            );
            break;
          case "/":
            newOperatorNode = new DivisionOperatorNode(operandOne, operandTwo);
            break;
          default:
            throw new Error("Invalid operator encountered");
        }
        nodeStack.push(newOperatorNode);
      } else {
        nodeStack.push(new OperandNode(currentTokenItem));
      }
    }

    return nodeStack[0];
  }
}
