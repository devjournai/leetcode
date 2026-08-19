/**
 * Maximum Total Area Occupied by Pistons
 * Intuition: Total area is a piecewise-linear function of time. Between bounces the net slope is constant (ups minus downs). The maximum occurs at time 0 or at a bounce, and one period of length 2*height covers every pattern.
 * Approach: 1. Start with area = sum(positions) and slope = (#U) - (#D). 2. Record bounce times: U at height-pos and height-pos+height; D at pos and pos+height. 3. Sweep times in order, advance area by slope * dt, track the max, then flip each bouncing piston's contribution to the slope by 2.
 * Dry Run:
 *   height = 5, positions = [2, 5], directions = "UD"
 *   Initial area 7. The first bounce does not increase it, so the answer is 7.
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
var maxArea = function (height, positions, directions) {
  let area = 0;
  for (const position of positions) {
    area += position;
  }
  let ans = area;
  let diffPerSecond = 0;
  const timeToIndices = new Map();
  const dirs = directions.split("");

  const addTime = (time, i) => {
    if (!timeToIndices.has(time)) {
      timeToIndices.set(time, []);
    }
    timeToIndices.get(time).push(i);
  };

  for (let i = 0; i < positions.length; i++) {
    if (dirs[i] === "U") {
      addTime(height - positions[i], i);
      addTime(height - positions[i] + height, i);
      diffPerSecond++;
    } else {
      addTime(positions[i], i);
      addTime(positions[i] + height, i);
      diffPerSecond--;
    }
  }

  const times = [...timeToIndices.keys()].sort((a, b) => a - b);
  let prevTime = 0;

  for (const time of times) {
    area += (time - prevTime) * diffPerSecond;
    ans = Math.max(ans, area);
    prevTime = time;
    for (const i of timeToIndices.get(time)) {
      if (dirs[i] === "U") {
        dirs[i] = "D";
        diffPerSecond -= 2;
      } else {
        dirs[i] = "U";
        diffPerSecond += 2;
      }
    }
  }

  return ans;
};
