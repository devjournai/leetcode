/**
 * Array Wrapper
 * Intuition: JavaScript objects can customize their behavior when coerced into primitive types (numbers or strings) by overriding built-in methods like `valueOf` and `toString`. This allows an object to behave like a number during arithmetic operations and like a specific string when converted to a string.
 * Approach: 1. Implement the `ArrayWrapper` constructor to accept an array of numbers and store it as an instance property. 2. Override `ArrayWrapper.prototype.valueOf` to return the sum of all elements in the stored array. This method is automatically called when an `ArrayWrapper` instance is used in a numeric context (e.g., with the `+` operator). 3. Override `ArrayWrapper.prototype.toString` to return a string representation of the stored array in the format `[x,y,z]`. This method is called when an `ArrayWrapper` instance is converted to a string.
 * Dry Run:
 * let instanceOne = new ArrayWrapper([1,2]); // wrappedArray for instanceOne is [1,2]
 * let instanceTwo = new ArrayWrapper([3,4]); // wrappedArray for instanceTwo is [3,4]
 *
 * instanceOne + instanceTwo:
 *   instanceOne.valueOf() is called:
 *     aggregatedSum starts at 0.
 *     singleElement = 1, aggregatedSum becomes 1.
 *     singleElement = 2, aggregatedSum becomes 3.
 *     Returns 3.
 *   instanceTwo.valueOf() is called:
 *     aggregatedSum starts at 0.
 *     singleElement = 3, aggregatedSum becomes 3.
 *     singleElement = 4, aggregatedSum becomes 7.
 *     Returns 7.
 *   Result of addition is 3 + 7 = 10.
 *
 * String(instanceOne):
 *   instanceOne.toString() is called:
 *     resultParts = ['['].
 *     elementCount = 2.
 *     iteratorIndex = 0: resultParts becomes ['[', 1], then ['[', 1, ','].
 *     iteratorIndex = 1: resultParts becomes ['[', 1, ',', 2]. Condition (1 < 1) is false.
 *     resultParts becomes ['[', 1, ',', 2, ']'].
 *     finalString = resultParts.join('') which is "[1,2]".
 *     Returns "[1,2]".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var ArrayWrapper = function (nums) {
  this.wrappedArray = nums;
};

ArrayWrapper.prototype.valueOf = function () {
  let aggregatedSum = 0;
  for (let singleElement of this.wrappedArray) {
    aggregatedSum += singleElement;
  }
  return aggregatedSum;
};

ArrayWrapper.prototype.toString = function () {
  let resultParts = ["["];
  let elementCount = this.wrappedArray.length;
  for (let iteratorIndex = 0; iteratorIndex < elementCount; iteratorIndex++) {
    resultParts.push(this.wrappedArray[iteratorIndex]);
    if (iteratorIndex < elementCount - 1) {
      resultParts.push(",");
    }
  }
  resultParts.push("]");
  let finalString = resultParts.join("");
  return finalString;
};
