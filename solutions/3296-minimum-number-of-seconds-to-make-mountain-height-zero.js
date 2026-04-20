/**
 * Minimum Number of Seconds to Make Mountain Height Zero
 * Time Complexity: O(log(MaxTime) * N * log(mountainHeight))
 * Space Complexity: O(1)
 */
var minNumberOfSeconds = function (mountainHeight, workerTimes) {
  let lowTime = 1n;
  let highTime = 5000050000000000n;
  let minSeconds = highTime;

  const check = (maxTime) => {
    let totalHeightReduced = 0n;
    const targetHeight = BigInt(mountainHeight);

    for (const wt of workerTimes) {
      let lowX = 0n;
      let highX = targetHeight;
      let currentMaxHeight = 0n;
      const wtBig = BigInt(wt);

      while (lowX <= highX) {
        const midX = (lowX + highX) / 2n;
        const cost = (wtBig * midX * (midX + 1n)) / 2n;

        if (cost <= maxTime) {
          currentMaxHeight = midX;
          lowX = midX + 1n;
        } else {
          highX = midX - 1n;
        }
      }

      totalHeightReduced += currentMaxHeight;
      if (totalHeightReduced >= targetHeight) {
        return true;
      }
    }

    return totalHeightReduced >= targetHeight;
  };

  while (lowTime <= highTime) {
    const midTime = (lowTime + highTime) / 2n;

    if (check(midTime)) {
      minSeconds = midTime;
      highTime = midTime - 1n;
    } else {
      lowTime = midTime + 1n;
    }
  }

  return Number(minSeconds);
};
