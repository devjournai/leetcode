/**
* Time Needed To Buy Tickets
* Intuition: The time person 'k' needs is the sum of tickets bought by all people. Each person 'i' (including 'k') contributes to this time by buying tickets. If person 'i' is at or before 'k' in the line, they will buy tickets for as many rounds as person 'k' needs, or until they run out, whichever is less. If person 'i' is behind 'k', they will get one less round to buy tickets than person 'k' because 'k' will finish before they can make their final pass.
* Approach: 1. Determine the number of tickets `targetTicketCount` that person `k` wants to buy. 2. Initialize a `totalSecondsElapsed` variable to zero. 3. Iterate through the `tickets` array using `currentPersonIndex` from 0 to `n-1`. 4. If `currentPersonIndex` is less than or equal to `k`, add `Math.min(tickets[currentPersonIndex], targetTicketCount)` to `totalSecondsElapsed`. 5. If `currentPersonIndex` is greater than `k`, add `Math.min(tickets[currentPersonIndex], targetTicketCount - 1)` to `totalSecondsElapsed`. 6. Return `totalSecondsElapsed`.
* Dry Run: tickets = [5, 1, 3, 2], k = 2
    * targetTicketCount = tickets[2] = 3
    * totalSecondsElapsed = 0
    * currentPersonIndex = 0: tickets[0] = 5. (0 <= 2) is true.
        totalSecondsElapsed += Math.min(5, 3) = 3
        totalSecondsElapsed = 3
    * currentPersonIndex = 1: tickets[1] = 1. (1 <= 2) is true.
        totalSecondsElapsed += Math.min(1, 3) = 1
        totalSecondsElapsed = 3 + 1 = 4
    * currentPersonIndex = 2: tickets[2] = 3. (2 <= 2) is true. This is person k.
        totalSecondsElapsed += Math.min(3, 3) = 3
        totalSecondsElapsed = 4 + 3 = 7
    * currentPersonIndex = 3: tickets[3] = 2. (3 <= 2) is false.
        totalSecondsElapsed += Math.min(2, 3 - 1) = Math.min(2, 2) = 2
        totalSecondsElapsed = 7 + 2 = 9
    * Return 9.
* Time Complexity: O(n)
* Space Complexity: O(1)
*/
var timeRequiredToBuy = function (tickets, k) {
    const targetTicketCount = tickets[k];
    let totalSecondsElapsed = 0;

    for (let currentPersonIndex = 0; currentPersonIndex < tickets.length; currentPersonIndex++) {
        if (currentPersonIndex <= k) {
            totalSecondsElapsed += Math.min(tickets[currentPersonIndex], targetTicketCount);
        } else {
            totalSecondsElapsed += Math.min(tickets[currentPersonIndex], targetTicketCount - 1);
        }
    }

    return totalSecondsElapsed;
};