/**
 * Find Minimum Time to Reach Last Room I
 * Intuition: Moving into a room (i, j) cannot happen before moveTime[i][j], and each move costs 1 second. Shortest time is Dijkstra on the grid.
 * Approach: dist[0][0] = 0. Pop the cheapest cell; for each neighbor, newDist = max(moveTime[x][y], d) + 1. Relax and push if better. Stop at the bottom-right cell.
 * Dry Run: moveTime = [[0,4],[4,4]]. Path (0,0)->(0,1): max(4,0)+1=5, then (1,1): max(4,5)+1=6.
 * Time Complexity: O(MN log MN)
 * Space Complexity: O(MN)
 */

var minTimeToReach = function (moveTime) {
  return dijkstraToLastRoom(moveTime, false);
};

function dijkstraToLastRoom(moveTime, alternatingCost) {
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
  const minHeap = new MinHeap();
  minHeap.push([0, 0, 0]);

  while (minHeap.size > 0) {
    const [time, row, col] = minHeap.pop();
    if (row === rows - 1 && col === cols - 1) {
      return time;
    }
    if (time > dist[row][col]) {
      continue;
    }
    const moveCost = alternatingCost ? ((row + col) % 2) + 1 : 1;
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

class MinHeap {
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
