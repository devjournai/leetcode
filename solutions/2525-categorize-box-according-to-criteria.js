/**
 * Categorize Box According to Criteria
 *
 * Intuition:
 * A box is classified based on two independent conditions:
 * 1. Whether it is "Bulky".
 * 2. Whether it is "Heavy".
 *
 * First determine these two properties, then return the corresponding category
 * according to the given rules.
 *
 * Approach:
 * 1. Compute the volume:
 *      volume = length × width × height
 * 2. Determine whether the box is "Bulky":
 *      - Any dimension is at least 10^4, OR
 *      - Volume is at least 10^9.
 * 3. Determine whether the box is "Heavy":
 *      - Mass is at least 100.
 * 4. Return:
 *      - "Both"    → if Bulky and Heavy.
 *      - "Bulky"   → if only Bulky.
 *      - "Heavy"   → if only Heavy.
 *      - "Neither" → otherwise.
 *
 * Dry Run:
 *
 * Input:
 * length = 1000
 * width = 35
 * height = 700
 * mass = 300
 *
 * Volume:
 * = 1000 × 35 × 700
 * = 24,500,000
 *
 * Check Bulky:
 * Any dimension >= 10000?
 * No
 *
 * Volume >= 1,000,000,000?
 * No
 *
 * Bulky = false
 *
 * Check Heavy:
 * mass = 300 >= 100
 * Heavy = true
 *
 * Final Category:
 * Heavy
 *
 * Return "Heavy".
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */

var categorizeBox = function (length, width, height, mass) {
  const volume = length * width * height;

  const isBulky =
    length >= 10000 ||
    width >= 10000 ||
    height >= 10000 ||
    volume >= 1000000000;

  const isHeavy = mass >= 100;

  if (isBulky && isHeavy) {
    return "Both";
  }

  if (isBulky) {
    return "Bulky";
  }

  if (isHeavy) {
    return "Heavy";
  }

  return "Neither";
};
