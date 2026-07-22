/**
 * Next Day
 * Intuition: JavaScript's Date object inherently handles date arithmetic, including day, month, and year rollovers when incrementing the day.
 * Approach: 1. Create a distinct Date object from the original to ensure immutability. 2. Increment this new Date object's day component by one. 3. Convert the resulting Date object into an ISO string and extract the date part (YYYY-MM-DD).
 * Dry Run: Input: new Date("2023-12-31").
 *   1. The 'this' context is new Date("2023-12-31T00:00:00.000Z").
 *   2. A new Date object, `temporalPoint`, is initialized as new Date("2023-12-31T00:00:00.000Z").
 *   3. `temporalPoint.setDate(temporalPoint.getDate() + 1)`: `temporalPoint.getDate()` is 31. `31 + 1` is 32. `setDate(32)` correctly rolls `temporalPoint` to new Date("2024-01-01T00:00:00.000Z").
 *   4. `isoFormatter = temporalPoint.toISOString()` -> "2024-01-01T00:00:00.000Z".
 *   5. `dateComponents = isoFormatter.split('T')` -> ["2024-01-01", "00:00:00.000Z"].
 *   6. The first element, "2024-01-01", is returned.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
Date.prototype.nextDay = function () {
  const temporalPoint = new Date(this);
  temporalPoint.setDate(temporalPoint.getDate() + 1);
  const isoFormatter = temporalPoint.toISOString();
  const dateComponents = isoFormatter.split("T");
  return dateComponents[0];
};
