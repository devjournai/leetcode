/**
 * Minimum Absolute Distance Between Mirror Pairs
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minMirrorPairDistance = function (nums) {
  const valToIndices = new Map();

  for (let k = 0; k < nums.length; k++) {
    const num = nums[k];
    if (!valToIndices.has(num)) {
      valToIndices.set(num, []);
    }
    valToIndices.get(num).push(k);
  }

  let minDistance = Infinity;

  for (let i = 0; i < nums.length; i++) {
    const currentNum = nums[i];
    const targetNum = reverse(currentNum);

    if (valToIndices.has(targetNum)) {
      const indicesOfTarget = valToIndices.get(targetNum);
      const firstIdxGreaterThanI = lowerBound(indicesOfTarget, i + 1);

      if (firstIdxGreaterThanI < indicesOfTarget.length) {
        const j = indicesOfTarget[firstIdxGreaterThanI];
        minDistance = Math.min(minDistance, j - i);
      }
    }
  }

  return minDistance === Infinity ? -1 : minDistance;
};

function reverse(x) {
  const s = String(x);
  const reversedS = s.split("").reverse().join("");
  return parseInt(reversedS, 10);
}

function lowerBound(arr, val) {
  let low = 0;
  let high = arr.length;
  while (low < high) {
    let mid = Math.floor(low + (high - low) / 2);
    if (arr[mid] < val) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}
