/**
 * Pascals Triangle II
 * Intuition: Row k is the binomial coefficients C(k,0)..C(k,k). Each next coefficient is the previous times (k-i+1)/i, so the row can be filled without building the triangle.
 * Approach: 1. Allocate an array of length rowIndex+1 with index 0 = 1. 2. Track currentCoefficient starting at 1. 3. For i from 1 to rowIndex, multiply by (rowIndex-i+1)/i and store. Return the array.
 * Dry Run: rowIndex = 3. Start [1,_,_,_]. i=1: 1*(3/1)=3. i=2: 3*(2/2)=3. i=3: 3*(1/3)=1. Row [1,3,3,1].
 * Time Complexity: O(rowIndex)
 * Space Complexity: O(rowIndex)
 */
var getRow = function (rowIndex) {
  const pascalRowValues = new Array(rowIndex + 1);

  pascalRowValues[0] = 1;
  let currentCoefficientValue = 1;

  for (
    let elementPosition = 1;
    elementPosition <= rowIndex;
    elementPosition++
  ) {
    currentCoefficientValue =
      (currentCoefficientValue * (rowIndex - elementPosition + 1)) /
      elementPosition;
    pascalRowValues[elementPosition] = currentCoefficientValue;
  }

  return pascalRowValues;
};
