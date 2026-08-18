/**
 * Count Triplets With Even Xor Set Bits I
 * Intuition: XOR of three numbers has even popcount iff the three popcount parities XOR to even, i.e. even number of odd-popcount values. Count even/odd popcount in each array and enumerate combinations.
 * Approach: 1. Count even and odd popcounts in a, b, c. 2. Add products for combinations with even number of odd parities (0 or 2 odds).
 * Dry Run:
 *   a=[1], b=[2], c=[3] popcounts 1,1,2 parities odd,odd,even -> two odds -> even XOR popcount -> 1 triplet.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var tripletCount = function (a, b, c) {
  const countParity = (values) => {
    let evenCount = 0;
    let oddCount = 0;
    for (const currentValue of values) {
      if ((currentValue.toString(2).split("1").length - 1) % 2 === 0) {
        evenCount++;
      } else {
        oddCount++;
      }
    }
    return [evenCount, oddCount];
  };

  const [evenA, oddA] = countParity(a);
  const [evenB, oddB] = countParity(b);
  const [evenC, oddC] = countParity(c);

  return (
    evenA * evenB * evenC +
    evenA * oddB * oddC +
    oddA * evenB * oddC +
    oddA * oddB * evenC
  );
};
