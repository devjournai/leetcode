/**
 * Ip To Cidr
 * Intuition: Convert `ip` to an integer and greedily emit the largest CIDR block that is aligned with `currentIpNumeric` and does not exceed `remainingBlockSize`.
 * Approach: 1. `convertIpToNumber` packs four octets; `convertNumberToIp` unpacks with `>>>`. 2. While `remainingBlockSize > 0`, take `rightmostBitMagnitude = currentIpNumeric & -currentIpNumeric` (or 2^32 if that is 0). 3. Cap with `remainingBlockSize`, then strip bits until `effectiveBlockSize` is a power of two. 4. Count right-shifts of that size to get `determinedPrefixIdentifier` (from 32). 5. Push `"ip/prefix"`, add the size to `currentIpNumeric`, and subtract from `remainingBlockSize`.
 * Dry Run: ip = "255.0.0.7", n = 10.
 *   - Start at 255.0.0.7; alignment 1 → "255.0.0.7/32", remaining 9.
 *   - Next 255.0.0.8; alignment 8, remaining 9 → size 8 → "255.0.0.8/29", remaining 1.
 *   - Next 255.0.0.16; size 1 → "255.0.0.16/32". Return those three blocks.
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
      remainingBlockSize
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
      `${convertNumberToIp(currentIpNumeric)}/${determinedPrefixIdentifier}`
    );

    currentIpNumeric += effectiveBlockSize;
    remainingBlockSize -= effectiveBlockSize;
  }

  return collectedCidrBlocks;
};
