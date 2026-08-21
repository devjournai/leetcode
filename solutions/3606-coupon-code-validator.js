/**
 * Coupon Code Validator
 * Intuition: Keep active coupons whose code is a non-empty [A-Za-z0-9_] string and whose business line is one of four allowed categories, then sort by line then code.
 * Approach: 1. Allowed lines = electronics, grocery, pharmacy, restaurant. 2. Collect valid indices. 3. Sort by businessLine, then code. 4. Map back to codes.
 * Dry Run: code ["SAVE20",""], lines ["restaurant","grocery"], active [true,true] → only "SAVE20" is valid.
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
var validateCoupons = function (code, businessLine, isActive) {
  const allowedLines = new Set([
    "electronics",
    "grocery",
    "pharmacy",
    "restaurant",
  ]);

  const isValidCode = (text) => {
    if (text.length === 0) {
      return false;
    }
    for (let index = 0; index < text.length; index++) {
      if (!/[a-zA-Z0-9_]/.test(text[index])) {
        return false;
      }
    }
    return true;
  };

  const validIndices = [];
  for (let index = 0; index < code.length; index++) {
    if (
      isActive[index] &&
      allowedLines.has(businessLine[index]) &&
      isValidCode(code[index])
    ) {
      validIndices.push(index);
    }
  }

  validIndices.sort((left, right) => {
    if (businessLine[left] !== businessLine[right]) {
      return businessLine[left] < businessLine[right] ? -1 : 1;
    }
    return code[left] < code[right] ? -1 : 1;
  });

  return validIndices.map((index) => code[index]);
};
