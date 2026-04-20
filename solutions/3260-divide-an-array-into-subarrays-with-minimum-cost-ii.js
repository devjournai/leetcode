/**
 * Divide an Array Into Subarrays With Minimum Cost II
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
var minimumCost = function (nums, k, dist) {
    const target = k - 1;

    class PriorityQueue {
        constructor(compare) {
            this.data = [];
            this.compare = compare;
            this.lazy = new Map();
            this.size = 0;
        }

        push(val) {
            this.data.push(val);
            this.bubbleUp(this.data.length - 1);
            this.size++;
        }

        pop() {
            this.cleanTop();
            if (this.data.length === 0) return null;
            const res = this.data[0];
            const last = this.data.pop();
            if (this.data.length > 0) {
                this.data[0] = last;
                this.bubbleDown(0);
            }
            this.size--;
            return res;
        }

        peek() {
            this.cleanTop();
            return this.data.length > 0 ? this.data[0] : null;
        }

        remove(val) {
            this.size--;
            this.lazy.set(val, (this.lazy.get(val) || 0) + 1);
        }

        cleanTop() {
            while (this.data.length > 0 &&
                this.lazy.has(this.data[0]) &&
                this.lazy.get(this.data[0]) > 0) {
                const val = this.data[0];
                this.lazy.set(val, this.lazy.get(val) - 1);

                const last = this.data.pop();
                if (this.data.length > 0) {
                    this.data[0] = last;
                    this.bubbleDown(0);
                }
            }
        }

        bubbleUp(idx) {
            while (idx > 0) {
                let p = Math.floor((idx - 1) / 2);
                if (this.compare(this.data[idx], this.data[p]) < 0) {
                    [this.data[idx], this.data[p]] = [this.data[p], this.data[idx]];
                    idx = p;
                } else break;
            }
        }

        bubbleDown(idx) {
            while (true) {
                let left = 2 * idx + 1;
                let right = 2 * idx + 2;
                let swap = idx;

                if (left < this.data.length && this.compare(this.data[left], this.data[swap]) < 0) swap = left;
                if (right < this.data.length && this.compare(this.data[right], this.data[swap]) < 0) swap = right;

                if (swap !== idx) {
                    [this.data[idx], this.data[swap]] = [this.data[swap], this.data[idx]];
                    idx = swap;
                } else break;
            }
        }
    }

    const L = new PriorityQueue((a, b) => b - a);
    const R = new PriorityQueue((a, b) => a - b);

    let sumL = 0;
    let minSum = Infinity;

    for (let i = 1; i < nums.length; i++) {
        const inVal = nums[i];

        L.push(inVal);
        sumL += inVal;

        if (L.size > target) {
            const valToMove = L.pop();
            sumL -= valToMove;
            R.push(valToMove);
        }

        if (i > dist + 1) {
            const outVal = nums[i - (dist + 1)];

            const maxL = L.peek();

            if (maxL !== null && outVal <= maxL) {
                L.remove(outVal);
                sumL -= outVal;
            } else {
                R.remove(outVal);
            }
        }

        if (L.size < target) {
            const valFromR = R.pop();
            if (valFromR !== null) {
                L.push(valFromR);
                sumL += valFromR;
            }
        }
        if (i >= target) {
            minSum = Math.min(minSum, sumL);
        }
    }

    return minSum + nums[0];
};