/**
 * Design Event Manager
 * Intuition: We define a sorted set $\textit{sl}$ to store tuples of priority and id $(-\textit{priority}, \textit{eventId})$ for all active events, and a hash map $\textit{d}$ to store the priority of each event. During initialization, we iterate over the given event list, add the tuple of priority and id for each event into the sorted set $\textit{sl}$, and store each event's priority in the hash map $\textit{d}$. For the $\textit{updatePriority}(eventId, newPriority)$ operation, we first retrieve the old priority of the event from the hash map $\textit{d}$, then remove the tuple of the old priority and event id from the sorted set $\textit{sl}$, add the tuple of the new priority and event id into $\textit{sl}$, and update the event's priority in $\textit{d}$. For the $\textit{pollHighest}()$ operation, we first check whether the sorted set $\textit{sl}$ is empty. If it is, return -1. Otherwise, we...
 * Approach: We define a sorted set $\textit{sl}$ to store tuples of priority and id $(-\textit{priority}, \textit{eventId})$ for all active events, and a hash map $\textit{d}$ to store the priority of each event. During initialization, we iterate over the given event list, add the tuple of priority and id for each event into the sorted set $\textit{sl}$, and store each event's priority in the hash map $\textit{d}$. For the $\textit{updatePriority}(eventId, newPriority)$ operation, we first retrieve the old priority of the event from the hash map $\textit{d}$, then remove the tuple of the old priority and event id from the sorted set $\textit{sl}$, add the tuple of the new priority and event id into $\textit{sl}$, and update the event's priority in $\textit{d}$. For the $\textit{pollHighest}()$ operation, we first check whether the sorted set $\textit{sl}$ is empty. If it is, return -1. Otherwise, we...
 * Dry Run: Input: [&quot;EventManager&quot;, &quot;pollHighest&quot;, &quot;updatePriority&quot;, &quot;pollHighest&quot;, &quot;pollHighest&quot;] [[[[5, 7], [2, 7], [9, 4]]], [], [9, 7], [], []] => Output: [null, 2, null, 5, 9]
 * Time Complexity: O(N) per poll
 * Space Complexity: O(N)
 */
var EventManager = function (events) {
  this.priority = new Map();
  this.alive = [];
  for (const [eventId, prio] of events) {
    this.priority.set(eventId, prio);
    this.alive.push(eventId);
  }
};

EventManager.prototype.updatePriority = function (eventId, newPriority) {
  this.priority.set(eventId, newPriority);
};

EventManager.prototype.pollHighest = function () {
  let bestId = -1;
  let bestP = -Infinity;
  for (const id of this.alive) {
    if (!this.priority.has(id)) continue;
    const p = this.priority.get(id);
    if (p > bestP || (p === bestP && (bestId === -1 || id < bestId))) {
      bestP = p;
      bestId = id;
    }
  }
  if (bestId === -1) return -1;
  this.priority.delete(bestId);
  const idx = this.alive.indexOf(bestId);
  if (idx !== -1) this.alive.splice(idx, 1);
  return bestId;
};
