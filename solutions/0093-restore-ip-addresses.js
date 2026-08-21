/**
 * Restore Ip Addresses
 * Intuition: An IP has exactly four 0–255 octets with no leading zeros; backtrack placing 1–3 digit segments, pruning when remaining length cannot fill the leftover octets.
 * Approach: 1. `isSegmentValid` rejects empty/>3, leading zeros, or value > 255. 2. Recurse with position and current segments; at 4 segments, accept iff position==n. 3. Prune if remaining chars < leftover segments or > 3*leftover. 4. Try lengths 1..3, push/pop.
 * Dry Run: s="25525511135" → 255.255.11.135 and 255.255.111.35
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var restoreIpAddresses = function (s) {
  const validIpAddresses = [];

  const isSegmentValid = (segmentChunk) => {
    if (segmentChunk.length === 0 || segmentChunk.length > 3) {
      return false;
    }
    if (segmentChunk.length > 1 && segmentChunk[0] === "0") {
      return false;
    }
    const numericalValue = Number(segmentChunk);
    return numericalValue >= 0 && numericalValue <= 255;
  };

  const generateIpParts = (currentPosition, currentSegments) => {
    if (currentSegments.length === 4) {
      if (currentPosition === s.length) {
        validIpAddresses.push(currentSegments.join("."));
      }
      return;
    }

    if (currentPosition === s.length) {
      return;
    }

    const remainingStringLength = s.length - currentPosition;
    const segmentsToComplete = 4 - currentSegments.length;

    if (
      remainingStringLength < segmentsToComplete ||
      remainingStringLength > segmentsToComplete * 3
    ) {
      return;
    }

    for (
      let segmentDigitCount = 1;
      segmentDigitCount <= 3;
      segmentDigitCount++
    ) {
      if (currentPosition + segmentDigitCount > s.length) {
        break;
      }

      const potentialSegment = s.substring(
        currentPosition,
        currentPosition + segmentDigitCount
      );

      if (isSegmentValid(potentialSegment)) {
        currentSegments.push(potentialSegment);
        generateIpParts(currentPosition + segmentDigitCount, currentSegments);
        currentSegments.pop();
      }
    }
  };

  generateIpParts(0, []);
  return validIpAddresses;
};
