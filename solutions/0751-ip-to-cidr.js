/**
 * Ip To Cidr
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var ipToCIDR = function (ip, n) {
  const convertIpToNumber = (ipAddressString) => {
    const octetComponentStrings = ipAddressString.split(".");
    const firstOctetValue = Number(octetComponentStrings[0]);
    const secondOctetValue = Number(octetComponentStrings[1]);
    const thirdOctetValue = Number(octetComponentStrings[2]);
    const fourthOctetValue = Number(octetComponentStrings[3]);
    return (
      (firstOctetValue << 24) +
      (secondOctetValue << 16) +
      (thirdOctetValue << 8) +
      fourthOctetValue
    );
  };

  const convertNumberToIp = (numericIpValue) => {
    const octetA = (numericIpValue >>> 24) & 255;
    const octetB = (numericIpValue >>> 16) & 255;
    const octetC = (numericIpValue >>> 8) & 255;
    const octetD = numericIpValue & 255;
    return [octetA, octetB, octetC, octetD].join(".");
  };

  let currentIpNumeric = convertIpToNumber(ip);
  let remainingBlockSize = n;
  const collectedCidrBlocks = [];

  while (remainingBlockSize > 0) {
    let rightmostBitMagnitude = currentIpNumeric & -currentIpNumeric;
    if (rightmostBitMagnitude === 0) {
      rightmostBitMagnitude = 4294967296;
    }

    let candidateBlockLength = Math.min(
      rightmostBitMagnitude,
      remainingBlockSize,
    );
    let effectiveBlockSize = candidateBlockLength;

    while ((effectiveBlockSize & (effectiveBlockSize - 1)) !== 0) {
      effectiveBlockSize = effectiveBlockSize & (effectiveBlockSize - 1);
    }

    let determinedPrefixIdentifier = 32;
    let sizeReductionHelper = effectiveBlockSize;
    while (sizeReductionHelper > 1) {
      sizeReductionHelper >>>= 1;
      determinedPrefixIdentifier--;
    }

    collectedCidrBlocks.push(
      `${convertNumberToIp(currentIpNumeric)}/${determinedPrefixIdentifier}`,
    );

    currentIpNumeric += effectiveBlockSize;
    remainingBlockSize -= effectiveBlockSize;
  }

  return collectedCidrBlocks;
};
