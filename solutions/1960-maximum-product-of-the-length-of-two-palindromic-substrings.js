/**
 * Maximum Product Of The Length Of Two Palindromic Substrings
 * Intuition: Utilize a Manacher-like approach to efficiently find all odd-length palindromes, then use prefix and suffix maximum arrays to find the maximum length palindrome ending/starting at any point, allowing for non-overlapping product calculation.
 * Approach: 1. Initialize three arrays: `maxOddPalindromeLengthEndingAt` to store the maximum length of an odd palindrome ending at or before an index, `maxOddPalindromeLengthStartingAt` for those starting at or after an index, and `manacherExpansionRadii` to store the radius of the longest odd palindrome centered at each index (Manacher's DP array). 2. Iterate through the string, expanding palindromes centered at each `stringIndex`. During expansion, update `maxOddPalindromeLengthEndingAt[rightCheckPointer]` and `maxOddPalindromeLengthStartingAt[leftCheckPointer]` with the length of the current palindrome. Maintain `currentManacherCenter` and `currentManacherRightBoundary` to optimize expansion. 3. After the initial pass, iterate `maxOddPalindromeLengthEndingAt` from left to right, updating each element with the maximum of itself and the previous element, effectively storing prefix maximums. 4. Iterate `maxOddPalindromeLengthStartingAt` from right to left, updating each element with the maximum of itself and the next element, effectively storing suffix maximums. 5. Finally, iterate through all possible split points in the string (from index 1 to `sLen - 1`). For each `splitPartitionIndex`, calculate the product of `maxOddPalindromeLengthEndingAt[splitPartitionIndex - 1]` (left palindrome) and `maxOddPalindromeLengthStartingAt[splitPartitionIndex]` (right palindrome). Update `resultantMaxProduct` with the maximum product found.
 * Dry Run: s = "abacaba"
 * Initialize: `maxOddPalindromeLengthEndingAt = [0,0,0,0,0,0,0]`, `maxOddPalindromeLengthStartingAt = [0,0,0,0,0,0,0]`, `manacherExpansionRadii = [0,0,0,0,0,0,0]`, `currentManacherCenter = -1`, `currentManacherRightBoundary = -1`, `resultantMaxProduct = 0`.
 * Manacher pass:
 * `stringIndex = 0 ('a')`: Palindrome "a" (len 1). `maxOddPalindromeLengthEndingAt[0]=1`, `maxOddPalindromeLengthStartingAt[0]=1`. `manacherExpansionRadii[0]=0`. `currentManacherCenter=0`, `currentManacherRightBoundary=0`.
 * `stringIndex = 1 ('b')`: Palindromes "b" (len 1), "aba" (len 3). `maxOddPalindromeLengthEndingAt[1]=1`, `maxOddPalindromeLengthStartingAt[1]=1`. `maxOddPalindromeLengthEndingAt[2]=3`, `maxOddPalindromeLengthStartingAt[0]=3`. `manacherExpansionRadii[1]=1`. `currentManacherCenter=1`, `currentManacherRightBoundary=2`.
 * `stringIndex = 2 ('a')`: Palindromes "a" (len 1). `maxOddPalindromeLengthEndingAt[2]=max(3,1)=3`, `maxOddPalindromeLengthStartingAt[2]=max(0,1)=1`. `manacherExpansionRadii[2]=0`. `currentManacherCenter`, `currentManacherRightBoundary` unchanged.
 * `stringIndex = 3 ('c')`: Palindromes "c" (len 1), "aca" (len 3), "bacab" (len 5), "abacaba" (len 7). Updates `maxOddPalindromeLengthEndingAt` for indices 3, 4, 5, 6 and `maxOddPalindromeLengthStartingAt` for indices 3, 2, 1, 0. `manacherExpansionRadii[3]=3`. `currentManacherCenter=3`, `currentManacherRightBoundary=6`.
 * `stringIndex = 4 ('a')`: Palindromes "a" (len 1), "aca" (len 3). Updates `maxOddPalindromeLengthEndingAt[4]=max(0,1)=1` then `max(1,3)=3`. `maxOddPalindromeLengthEndingAt[5]=max(0,5)=5` (from `stringIndex=3` pass) then `max(5,3)=5`. `maxOddPalindromeLengthStartingAt[4]=max(0,1)=1` then `max(1,3)=3`. `maxOddPalindromeLengthStartingAt[3]=max(1,3)=3` (from `stringIndex=3` pass) then `max(3,3)=3`. `manacherExpansionRadii[4]=1`. `currentManacherCenter`, `currentManacherRightBoundary` unchanged.
 * `stringIndex = 5 ('b')`: Palindromes "b" (len 1), "bab" (len 3). Updates `maxOddPalindromeLengthEndingAt[5]=max(5,1)=5` then `max(5,3)=5`. `maxOddPalindromeLengthEndingAt[6]=max(7,3)=7`. `maxOddPalindromeLengthStartingAt[5]=max(0,1)=1`. `maxOddPalindromeLengthStartingAt[4]=max(3,3)=3`. `manacherExpansionRadii[5]=1`. `currentManacherCenter`, `currentManacherRightBoundary` unchanged.
 * `stringIndex = 6 ('a')`: Palindrome "a" (len 1). Updates `maxOddPalindromeLengthEndingAt[6]=max(7,1)=7`. `maxOddPalindromeLengthStartingAt[6]=max(0,1)=1`. `manacherExpansionRadii[6]=0`. `currentManacherCenter`, `currentManacherRightBoundary` unchanged.
 * After this pass: `maxOddPalindromeLengthEndingAt = [1,1,3,1,3,5,7]`, `maxOddPalindromeLengthStartingAt = [7,5,3,3,3,0,1]`.
 * Prefix max for `maxOddPalindromeLengthEndingAt`: `[1,1,3,3,3,5,7]`. (e.g., `maxOddPalindromeLengthEndingAt[3]` becomes 3 from `max(maxOddPalindromeLengthEndingAt[2], maxOddPalindromeLengthEndingAt[3]) = max(3,1) = 3`).
 * Suffix max for `maxOddPalindromeLengthStartingAt`: `[7,5,3,3,3,1,1]`. (e.g., `maxOddPalindromeLengthStartingAt[3]` becomes 3 from `max(maxOddPalindromeLengthStartingAt[4], maxOddPalindromeLengthStartingAt[3]) = max(3,3) = 3`).
 * Max Product calculation:
 * `splitPartitionIndex = 1`: `maxOddPalindromeLengthEndingAt[0] * maxOddPalindromeLengthStartingAt[1] = 1 * 5 = 5`. `resultantMaxProduct = 5`.
 * `splitPartitionIndex = 2`: `maxOddPalindromeLengthEndingAt[1] * maxOddPalindromeLengthStartingAt[2] = 1 * 3 = 3`. `resultantMaxProduct = 5`.
 * `splitPartitionIndex = 3`: `maxOddPalindromeLengthEndingAt[2] * maxOddPalindromeLengthStartingAt[3] = 3 * 3 = 9`. `resultantMaxProduct = 9`.
 * `splitPartitionIndex = 4`: `maxOddPalindromeLengthEndingAt[3] * maxOddPalindromeLengthStartingAt[4] = 3 * 3 = 9`. `resultantMaxProduct = 9`.
 * `splitPartitionIndex = 5`: `maxOddPalindromeLengthEndingAt[4] * maxOddPalindromeLengthStartingAt[5] = 3 * 1 = 3`. `resultantMaxProduct = 9`.
 * `splitPartitionIndex = 6`: `maxOddPalindromeLengthEndingAt[5] * maxOddPalindromeLengthStartingAt[6] = 5 * 1 = 5`. `resultantMaxProduct = 9`.
 * Return `9`.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maxProduct = function (s) {
  const inputStringLength = s.length;
  const maxOddPalindromeLengthEndingAt = new Array(inputStringLength).fill(0);
  const maxOddPalindromeLengthStartingAt = new Array(inputStringLength).fill(0);
  const manacherExpansionRadii = new Array(inputStringLength).fill(0);

  let currentManacherCenter = -1;
  let currentManacherRightBoundary = -1;

  for (let stringIndex = 0; stringIndex < inputStringLength; stringIndex++) {
    const initialExpansionRadius =
      stringIndex <= currentManacherRightBoundary
        ? Math.min(
            manacherExpansionRadii[2 * currentManacherCenter - stringIndex],
            currentManacherRightBoundary - stringIndex,
          )
        : 0;
    let leftCheckPointer = stringIndex - initialExpansionRadius;
    let rightCheckPointer = stringIndex + initialExpansionRadius;

    while (
      leftCheckPointer >= 0 &&
      rightCheckPointer < inputStringLength &&
      s[leftCheckPointer] === s[rightCheckPointer]
    ) {
      const currentPalindromeLength = rightCheckPointer - leftCheckPointer + 1;
      maxOddPalindromeLengthEndingAt[rightCheckPointer] = Math.max(
        maxOddPalindromeLengthEndingAt[rightCheckPointer],
        currentPalindromeLength,
      );
      maxOddPalindromeLengthStartingAt[leftCheckPointer] = Math.max(
        maxOddPalindromeLengthStartingAt[leftCheckPointer],
        currentPalindromeLength,
      );
      leftCheckPointer--;
      rightCheckPointer++;
    }

    manacherExpansionRadii[stringIndex] = rightCheckPointer - stringIndex - 1;

    if (rightCheckPointer - 1 > currentManacherRightBoundary) {
      currentManacherCenter = stringIndex;
      currentManacherRightBoundary = rightCheckPointer - 1;
    }
  }

  for (
    let prefixMaxIndex = 1;
    prefixMaxIndex < inputStringLength;
    prefixMaxIndex++
  ) {
    maxOddPalindromeLengthEndingAt[prefixMaxIndex] = Math.max(
      maxOddPalindromeLengthEndingAt[prefixMaxIndex - 1],
      maxOddPalindromeLengthEndingAt[prefixMaxIndex],
    );
  }

  for (
    let suffixMaxIndex = inputStringLength - 2;
    suffixMaxIndex >= 0;
    suffixMaxIndex--
  ) {
    maxOddPalindromeLengthStartingAt[suffixMaxIndex] = Math.max(
      maxOddPalindromeLengthStartingAt[suffixMaxIndex + 1],
      maxOddPalindromeLengthStartingAt[suffixMaxIndex],
    );
  }

  let resultantMaxProduct = 0;
  for (
    let splitPartitionIndex = 1;
    splitPartitionIndex < inputStringLength;
    splitPartitionIndex++
  ) {
    const leftSegmentMaxPalLen =
      maxOddPalindromeLengthEndingAt[splitPartitionIndex - 1];
    const rightSegmentMaxPalLen =
      maxOddPalindromeLengthStartingAt[splitPartitionIndex];
    resultantMaxProduct = Math.max(
      resultantMaxProduct,
      leftSegmentMaxPalLen * rightSegmentMaxPalLen,
    );
  }

  return resultantMaxProduct;
};
