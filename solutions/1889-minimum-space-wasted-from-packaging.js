/**
 * Minimum Space Wasted From Packaging
 * Intuition: Sort packages. For each supplier’s boxes (sorted), greedily fill the smallest box that fits the next packages. Waste = boxSize * count − sum(packages). Skip suppliers whose largest box cannot hold the largest package.
 * Approach: 1. Sort packages; prefix sums. 2. For each box list, binary-search `obtainUpperBoundIndex` for packages ≤ box. 3. Accumulate waste; keep the global min mod 1e9+7, or -1.
 * Dry Run: packages=[2,3,5], boxes=[[4,8],[2,8]]. First supplier cannot pack 5 with 4 then 8 works; compare wastes and return 6.
 * Time Complexity: O(N log N + M * (K log K + K log N))
 * Space Complexity: O(N + TotalBoxes)
 */
const obtainUpperBoundIndex = (
  inputArrayForSearch,
  targetValueForSearch,
  startingSearchIndex
) => {
  let searchLeftPointer = startingSearchIndex;
  let searchRightPointer = inputArrayForSearch.length;

  while (searchLeftPointer < searchRightPointer) {
    const searchMiddleIndex = (searchLeftPointer + searchRightPointer) >> 1;
    if (inputArrayForSearch[searchMiddleIndex] <= targetValueForSearch) {
      searchLeftPointer = searchMiddleIndex + 1;
    } else {
      searchRightPointer = searchMiddleIndex;
    }
  }
  return searchLeftPointer;
};

var minWastedSpace = function (packages, boxes) {
  const modulusConstantValue = 1e9 + 7;
  const initialLargeValueForWaste = BigInt(2) ** BigInt(60);
  let minimumTotalWastage = initialLargeValueForWaste;
  const totalPackageCount = packages.length;

  packages.sort((sortParamOne, sortParamTwo) => sortParamOne - sortParamTwo);

  const prefixSumAccumulator = new Array(totalPackageCount + 1).fill(BigInt(0));
  for (
    let prefixIterator = 0;
    prefixIterator < totalPackageCount;
    prefixIterator++
  ) {
    prefixSumAccumulator[prefixIterator + 1] =
      prefixSumAccumulator[prefixIterator] + BigInt(packages[prefixIterator]);
  }

  for (const currentSupplierBoxCollection of boxes) {
    currentSupplierBoxCollection.sort(
      (sortSupplierParamOne, sortSupplierParamTwo) =>
        sortSupplierParamOne - sortSupplierParamTwo
    );

    if (
      currentSupplierBoxCollection[currentSupplierBoxCollection.length - 1] <
      packages[totalPackageCount - 1]
    ) {
      continue;
    }

    let supplierCurrentWaste = BigInt(0);
    let packageProcessingIndex = 0;

    for (const currentBoxDimension of currentSupplierBoxCollection) {
      if (packageProcessingIndex >= totalPackageCount) {
        break;
      }

      const packageRangeEndIndex = obtainUpperBoundIndex(
        packages,
        currentBoxDimension,
        packageProcessingIndex
      );

      if (packageRangeEndIndex > packageProcessingIndex) {
        const countOfPackagesInBox = BigInt(
          packageRangeEndIndex - packageProcessingIndex
        );
        const sumOfFittedPackages =
          prefixSumAccumulator[packageRangeEndIndex] -
          prefixSumAccumulator[packageProcessingIndex];

        supplierCurrentWaste +=
          countOfPackagesInBox * BigInt(currentBoxDimension) -
          sumOfFittedPackages;

        packageProcessingIndex = packageRangeEndIndex;
      }
    }

    if (packageProcessingIndex === totalPackageCount) {
      minimumTotalWastage =
        minimumTotalWastage < supplierCurrentWaste
          ? minimumTotalWastage
          : supplierCurrentWaste;
    }
  }

  const finalResultValue =
    minimumTotalWastage === initialLargeValueForWaste
      ? BigInt(-1)
      : minimumTotalWastage;

  return Number(finalResultValue % BigInt(modulusConstantValue));
};
