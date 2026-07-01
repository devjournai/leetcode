/**
 * Time to Cross a Bridge
 *
 * Intuition:
 * This problem is a simulation using four priority queues.
 *
 * Workers can be in four different states:
 *
 * 1. Waiting on the left side.
 * 2. Waiting on the right side.
 * 3. Working on the left (putting a box).
 * 4. Working on the right (picking a box).
 *
 * Whenever the bridge becomes free:
 *
 * • Workers waiting on the right always get priority.
 * • Otherwise send a worker from the left only if there are still boxes that
 *   haven't been assigned.
 *
 * Workers become available after finishing pick/put operations, therefore
 * we continuously move workers from the "working" queues back into the
 * waiting queues.
 *
 * ------------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Compute every worker's efficiency.
 *
 *      efficiency = left + right
 *
 *    Larger efficiency means less efficient.
 *
 * 2. Maintain four priority queues.
 *
 *      leftWait
 *          Workers waiting on left.
 *
 *      rightWait
 *          Workers waiting on right.
 *
 *      leftWork
 *          Workers currently putting a box.
 *
 *      rightWork
 *          Workers currently picking a box.
 *
 * 3. Initially every worker belongs to leftWait.
 *
 * 4. Repeat until every box reaches the left warehouse.
 *
 *      First:
 *          Move every completed worker from working queues
 *          back into waiting queues.
 *
 *      Then:
 *
 *      If rightWait isn't empty:
 *          Worker crosses right → left.
 *
 *      Else if
 *          leftWait isn't empty
 *          &&
 *          there are still boxes remaining
 *
 *          Worker crosses left → right.
 *
 *      Otherwise:
 *          Jump current time to the earliest worker that
 *          finishes picking or putting.
 *
 * 5. The moment the last worker reaches the left side is
 *    the required answer.
 *
 * ------------------------------------------------------------------------
 *
 * Dry Run:
 *
 * n = 1
 *
 * Worker 2 has largest
 *
 *      left + right
 *
 * so crosses first.
 *
 * Time = 0
 *
 * Worker2
 * Left → Right
 *
 * Time = 1
 *
 * Picks box
 *
 * finishes at 2.
 *
 * Time jumps to 2.
 *
 * Worker2
 * Right → Left
 *
 * Takes 4 minutes.
 *
 * Arrives
 *
 * Time = 6
 *
 * Last box already reached left warehouse.
 *
 * Answer = 6.
 *
 * ------------------------------------------------------------------------
 *
 * Time Complexity: O((n + k) log k)
 * Space Complexity: O(k)
 */

var findCrossingTime = function (n, k, time) {
  class PriorityQueue {
    constructor(compare) {
      this.heap = [];
      this.compare = compare;
    }

    size() {
      return this.heap.length;
    }

    peek() {
      return this.heap[0];
    }

    push(value) {
      this.heap.push(value);
      this._up(this.heap.length - 1);
    }

    pop() {
      if (this.heap.length === 1) return this.heap.pop();

      const top = this.heap[0];
      this.heap[0] = this.heap.pop();
      this._down(0);

      return top;
    }

    _up(i) {
      while (i > 0) {
        const p = (i - 1) >> 1;

        if (this.compare(this.heap[p], this.heap[i])) break;

        [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];

        i = p;
      }
    }

    _down(i) {
      const n = this.heap.length;

      while (true) {
        let best = i;

        const l = i * 2 + 1;
        const r = i * 2 + 2;

        if (l < n && !this.compare(this.heap[best], this.heap[l])) best = l;

        if (r < n && !this.compare(this.heap[best], this.heap[r])) best = r;

        if (best === i) break;

        [this.heap[i], this.heap[best]] = [this.heap[best], this.heap[i]];

        i = best;
      }
    }
  }

  const waitCmp = (a, b) => {
    if (a.eff !== b.eff) return a.eff > b.eff;
    return a.id > b.id;
  };

  const workCmp = (a, b) => {
    if (a.finish !== b.finish) return a.finish < b.finish;
    return waitCmp(a.worker, b.worker);
  };

  const leftWait = new PriorityQueue(waitCmp);
  const rightWait = new PriorityQueue(waitCmp);

  const leftWork = new PriorityQueue(workCmp);
  const rightWork = new PriorityQueue(workCmp);

  for (let i = 0; i < k; i++) {
    leftWait.push({
      id: i,
      eff: time[i][0] + time[i][2],
    });
  }

  let currentTime = 0;
  let remaining = n;
  let answer = 0;

  while (remaining > 0 || rightWait.size() || rightWork.size()) {
    while (leftWork.size() && leftWork.peek().finish <= currentTime) {
      leftWait.push(leftWork.pop().worker);
    }

    while (rightWork.size() && rightWork.peek().finish <= currentTime) {
      rightWait.push(rightWork.pop().worker);
    }

    if (rightWait.size()) {
      const worker = rightWait.pop();

      currentTime += time[worker.id][2];

      answer = currentTime;

      leftWork.push({
        finish: currentTime + time[worker.id][3],
        worker,
      });

      remaining--;
    } else if (
      remaining > rightWait.size() + rightWork.size() &&
      leftWait.size()
    ) {
      const worker = leftWait.pop();

      currentTime += time[worker.id][0];

      rightWork.push({
        finish: currentTime + time[worker.id][1],
        worker,
      });
    } else {
      let nextTime = Infinity;

      if (leftWork.size())
        nextTime = Math.min(nextTime, leftWork.peek().finish);

      if (rightWork.size())
        nextTime = Math.min(nextTime, rightWork.peek().finish);

      currentTime = nextTime;
    }
  }

  return answer;
};
