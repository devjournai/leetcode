/**
 * Minimum Time to Reach Destination in Directed Graph
 * Intuition: Each directed edge may be taken only at time t in [start, end] and costs 1 to traverse, so waiting until start is allowed. Dijkstra on arrival times is shortest path with time windows.
 * Approach: 1. Build adjacency lists. 2. dist[0] = 0. 3. Pop the earliest node; if it is n-1 return that time. 4. For each edge, skip if current time > end, else arrive at max(time, start)+1. 5. Relax and push. Return -1 if the heap empties.
 * Dry Run: n = 3, edges [[0,1,0,1],[1,2,2,5]]. 0→1 at t=0 arrives 1, wait to 2, 1→2 arrives 3.
 * Time Complexity: O((n + m) log m)
 * Space Complexity: O(n + m)
 */
var minTime = function (n, edges) {
  if (n === 1) {
    return 0;
  }

  const graph = Array.from({ length: n }, () => []);
  for (const [from, to, start, end] of edges) {
    graph[from].push([to, start, end]);
  }

  class MinHeap {
    constructor() {
      this.data = [];
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
        this.bubbleDown(0);
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

    bubbleDown(index) {
      const size = this.data.length;
      while (true) {
        let smallest = index;
        const left = index * 2 + 1;
        const right = left + 1;
        if (left < size && this.data[left][0] < this.data[smallest][0]) {
          smallest = left;
        }
        if (right < size && this.data[right][0] < this.data[smallest][0]) {
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

  const distance = Array(n).fill(Infinity);
  distance[0] = 0;
  const heap = new MinHeap();
  heap.push([0, 0]);

  while (heap.data.length > 0) {
    const [time, node] = heap.pop();
    if (node === n - 1) {
      return time;
    }
    if (time > distance[node]) {
      continue;
    }

    for (const [next, start, end] of graph[node]) {
      if (time > end) {
        continue;
      }
      const arrive = Math.max(time, start) + 1;
      if (arrive < distance[next]) {
        distance[next] = arrive;
        heap.push([arrive, next]);
      }
    }
  }

  return -1;
};
