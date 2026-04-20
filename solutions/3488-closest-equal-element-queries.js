/**
 * Closest Equal Element Queries
 * Time Complexity: O(N + Q log N)
 * Space Complexity: O(N)
 */
var solveQueries = function (nums, queries) {
  const n = nums.length;

  const valueToIndices = new Map();
  for (let i = 0; i < n; i++) {
    const num = nums[i];
    if (!valueToIndices.has(num)) {
      valueToIndices.set(num, []);
    }
    valueToIndices.get(num).push(i);
  }

  const lowerBound = (arr, target) => {
    let low = 0;
    let high = arr.length;
    while (low < high) {
      const mid = Math.floor(low + (high - low) / 2);
      if (arr[mid] < target) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return low;
  };

  const answer = new Array(queries.length);
  for (let i = 0; i < queries.length; i++) {
    const queryIndex = queries[i];
    const targetValue = nums[queryIndex];
    const indices = valueToIndices.get(targetValue);

    if (indices.length <= 1) {
      answer[i] = -1;
      continue;
    }

    const pos = lowerBound(indices, queryIndex);

    let minDist = Infinity;

    const nextPos = (pos + 1) % indices.length;
    const nextIdx = indices[nextPos];
    let distanceOneWayNext = Math.abs(queryIndex - nextIdx);
    minDist = Math.min(
      minDist,
      Math.min(distanceOneWayNext, n - distanceOneWayNext),
    );

    const prevPos = (pos - 1 + indices.length) % indices.length;
    const prevIdx = indices[prevPos];
    let distanceOneWayPrev = Math.abs(queryIndex - prevIdx);
    minDist = Math.min(
      minDist,
      Math.min(distanceOneWayPrev, n - distanceOneWayPrev),
    );

    answer[i] = minDist;
  }

  return answer;
};
