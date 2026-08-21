/**
 * Find Minimum Time to Reach Last Room II
 * Intuition: Same grid Dijkstra as part I, but move cost alternates: odd-numbered moves cost 1, even-numbered moves cost 2. From cell (i, j) the next move costs (i+j)%2 + 1, since the Manhattan parity equals the number of moves so far.
 * Approach: dist[0][0] = 0. Relax neighbors with newDist = max(moveTime[x][y], d) + ((i+j)%2 + 1). Return distance of the destination.
 * Dry Run: moveTime = [[0,4],[4,4]]. (0,0)->(0,1) costs 1, time max(4,0)+1=5. Then (0,1)->(1,1) costs 2, time max(4,5)+2=7.
 * Time Complexity: O(MN log MN)
 * Space Complexity: O(MN)
 */

var minTimeToReach = function (moveTime) {
  return dijkstraToLastRoomII(moveTime);
};

function dijkstraToLastRoomII(moveTime) {
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const rows = moveTime.length;
  const cols = moveTime[0].length;
  const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  dist[0][0] = 0;
  const minHeap = new MinHeapII();
  minHeap.push([0, 0, 0]);

  while (minHeap.size > 0) {
    const [time, row, col] = minHeap.pop();
    if (row === rows - 1 && col === cols - 1) {
      return time;
    }
    if (time > dist[row][col]) {
      continue;
    }
    const moveCost = ((row + col) % 2) + 1;
    for (const [dRow, dCol] of dirs) {
      const nextRow = row + dRow;
      const nextCol = col + dCol;
      if (nextRow < 0 || nextRow === rows || nextCol < 0 || nextCol === cols) {
        continue;
      }
      const nextTime = Math.max(moveTime[nextRow][nextCol], time) + moveCost;
      if (nextTime < dist[nextRow][nextCol]) {
        dist[nextRow][nextCol] = nextTime;
        minHeap.push([nextTime, nextRow, nextCol]);
      }
    }
  }

  return -1;
}

class MinHeapII {
  constructor() {
    this.data = [];
  }

  get size() {
    return this.data.length;
  }

  push(item) {
    this.data.push(item);
    this.bubbleUp(this.data.length - 1);
  }

  pop() {
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      this.sink(0);
    }
    return top;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parent = (index - 1) >> 1;
      if (this.data[parent][0] <= this.data[index][0]) {
        break;
      }
      [this.data[parent], this.data[index]] = [
        this.data[index],
        this.data[parent],
      ];
      index = parent;
    }
  }

  sink(index) {
    const n = this.data.length;
    while (true) {
      let smallest = index;
      const left = index * 2 + 1;
      const right = left + 1;
      if (left < n && this.data[left][0] < this.data[smallest][0]) {
        smallest = left;
      }
      if (right < n && this.data[right][0] < this.data[smallest][0]) {
        smallest = right;
      }
      if (smallest === index) {
        break;
      }
      [this.data[smallest], this.data[index]] = [
        this.data[index],
        this.data[smallest],
      ];
      index = smallest;
    }
  }
}
