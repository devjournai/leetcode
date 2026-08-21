/**
 * Reformat Phone Number
 * Intuition: Strip non-digits, then greedily take groups of 3 while more than 4 digits remain; finish with 2, 3, or two 2's so no leftover of 1.
 * Approach: 1. `digitString` via replace. 2. While `totalDigits - currentIdx > 4`, push 3-digit `blockThree`. 3. Remaining 2/3/4 → one pair, one triple, or two pairs. 4. Join with '-'.
 * Dry Run: number = "1-23-45 6"
 * digits "123456"; one triple "123", remaining 3 → "456". Result "123-456".
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var reformatNumber = function (number) {
  const digitString = number.replace(/[^0-9]/g, "");
  const formedBlocks = [];
  let currentIdx = 0;
  const totalDigits = digitString.length;

  while (totalDigits - currentIdx > 4) {
    const blockThree = digitString.slice(currentIdx, currentIdx + 3);
    formedBlocks.push(blockThree);
    currentIdx += 3;
  }

  const remainingLength = totalDigits - currentIdx;

  if (remainingLength === 2) {
    const blockTwo = digitString.slice(currentIdx, currentIdx + 2);
    formedBlocks.push(blockTwo);
  } else if (remainingLength === 3) {
    const blockThreeFinal = digitString.slice(currentIdx, currentIdx + 3);
    formedBlocks.push(blockThreeFinal);
  } else if (remainingLength === 4) {
    const blockTwoFirst = digitString.slice(currentIdx, currentIdx + 2);
    const blockTwoSecond = digitString.slice(currentIdx + 2, currentIdx + 4);
    formedBlocks.push(blockTwoFirst);
    formedBlocks.push(blockTwoSecond);
  }

  return formedBlocks.join("-");
};
