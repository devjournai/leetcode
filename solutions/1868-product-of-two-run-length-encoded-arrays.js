/**
 * Product Of Two Run Length Encoded Arrays
 * Time Complexity: O(L1 + L2)
 * Space Complexity: O(L1 + L2)
 */
var findRLEArray = function (encoded1, encoded2) {
  let firstSegmentIndex = 0;
  let secondSegmentIndex = 0;
  let currentFirstSegmentCount = 0;
  let currentSecondSegmentCount = 0;
  const productSegments = [];

  for (;;) {
    if (
      firstSegmentIndex >= encoded1.length ||
      secondSegmentIndex >= encoded2.length
    ) {
      break;
    }

    if (currentFirstSegmentCount === 0) {
      currentFirstSegmentCount = encoded1[firstSegmentIndex][1];
    }
    if (currentSecondSegmentCount === 0) {
      currentSecondSegmentCount = encoded2[secondSegmentIndex][1];
    }

    const firstSegmentValue = encoded1[firstSegmentIndex][0];
    const secondSegmentValue = encoded2[secondSegmentIndex][0];
    const segmentProduct = firstSegmentValue * secondSegmentValue;

    const sharedLength = Math.min(
      currentFirstSegmentCount,
      currentSecondSegmentCount,
    );

    const lastProductSegment = productSegments[productSegments.length - 1];
    if (
      productSegments.length > 0 &&
      lastProductSegment[0] === segmentProduct
    ) {
      lastProductSegment[1] += sharedLength;
    } else {
      productSegments.push([segmentProduct, sharedLength]);
    }

    currentFirstSegmentCount -= sharedLength;
    currentSecondSegmentCount -= sharedLength;

    if (currentFirstSegmentCount === 0) {
      firstSegmentIndex++;
    }
    if (currentSecondSegmentCount === 0) {
      secondSegmentIndex++;
    }
  }

  return productSegments;
};
