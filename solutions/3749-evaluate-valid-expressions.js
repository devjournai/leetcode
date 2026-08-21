/**
 * Evaluate Valid Expressions
 * Intuition: We define a recursive function \text{parse}(i) to parse the subexpression starting from index i and return the computed result along with the next unprocessed index position. The answer is \text{parse}(0)[0].
 * Approach: The implementation of the function \text{parse}(i) is as follows: 1. If the current position i is a digit or a negative sign -, continue scanning forward until a non-digit character is encountered, parse an integer, and return that integer along with the next unprocessed index position. 2. Otherwise, the current position i is the starting position of an operator op. We continue scanning forward until we encounter a left parenthesis (, parsing the operator string op. Then we skip the left parenthesis, recursively call \text{parse} to parse the first parameter a, skip the comma, recursively call \text{parse} to parse the second parameter b, and finally skip the right parenthesis ). 3. Based on the operator op, calculate the result of a and b, and return that result along with the next unprocessed index position. The time complexity is O(n) and the space complexity is O(n), where n is the length of the expression string.
 * Dry Run: Input expression = "add(2,3)". Output 5.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var evaluateExpression = function (expression) {
  function parse(i) {
    if (/\d/.test(expression[i]) || expression[i] === "-") {
      let j = i;
      if (expression[j] === "-") {
        j++;
      }
      while (j < expression.length && /\d/.test(expression[j])) {
        j++;
      }
      const num = +expression.slice(i, j);
      return [num, j];
    }

    let j = i;
    while (expression[j] !== "(") {
      j++;
    }
    const op = expression.slice(i, j);
    j++;

    const [val1, nextJ1] = parse(j);
    j = nextJ1 + 1;

    const [val2, nextJ2] = parse(j);
    j = nextJ2 + 1;

    let res;
    switch (op) {
      case "add":
        res = val1 + val2;
        break;
      case "sub":
        res = val1 - val2;
        break;
      case "mul":
        res = val1 * val2;
        break;
      case "div":
        res = Math.floor(val1 / val2);
        break;
      default:
        res = 0;
    }

    return [res, j];
  }

  return parse(0)[0];
};
