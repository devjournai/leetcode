/**
 * Build Binary Expression Tree From Infix Expression
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var expTree = function (s) {
  const precedenceMap = new Map([
    ["+", 1],
    ["-", 1],
    ["*", 2],
    ["/", 2],
  ]);
  const operatorStackTracker = [];
  const operandStackTracker = [];

  const createNewNode = (nodeValue) => {
    return new Node(nodeValue);
  };

  const executeOperation = () => {
    const currentOperator = operatorStackTracker.pop();
    const childNodeRight = operandStackTracker.pop();
    const childNodeLeft = operandStackTracker.pop();
    const parentNode = createNewNode(currentOperator);
    parentNode.left = childNodeLeft;
    parentNode.right = childNodeRight;
    operandStackTracker.push(parentNode);
  };

  for (let stringIndex = 0; stringIndex < s.length; stringIndex++) {
    const currentCharacter = s[stringIndex];

    if (currentCharacter >= "0" && currentCharacter <= "9") {
      operandStackTracker.push(createNewNode(currentCharacter));
    } else if (currentCharacter === "(") {
      operatorStackTracker.push(currentCharacter);
    } else if (currentCharacter === ")") {
      while (
        operatorStackTracker.length > 0 &&
        operatorStackTracker[operatorStackTracker.length - 1] !== "("
      ) {
        executeOperation();
      }
      operatorStackTracker.pop();
    } else if (precedenceMap.has(currentCharacter)) {
      while (
        operatorStackTracker.length > 0 &&
        operatorStackTracker[operatorStackTracker.length - 1] !== "(" &&
        precedenceMap.get(
          operatorStackTracker[operatorStackTracker.length - 1],
        ) >= precedenceMap.get(currentCharacter)
      ) {
        executeOperation();
      }
      operatorStackTracker.push(currentCharacter);
    }
  }

  while (operatorStackTracker.length > 0) {
    executeOperation();
  }

  return operandStackTracker[0];
};
