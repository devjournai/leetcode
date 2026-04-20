/**
 * Reformat Phone Number
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
