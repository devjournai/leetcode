/**
 * Angles of a Triangle
 * Intuition: We first sort the array $\textit{sides}$ in non-decreasing order, and denote the three side lengths as $a$, $b$, and $c$, where $a \le b \le c$. According to the triangle inequality, if $a + b \le c$, then these three sides cannot form a triangle with positive area, so we return an empty array directly. Otherwise, the three sides can form a valid triangle. By the law of cosines, we have: $$ \cos A = \frac{b^2 + c^2 - a^2}{2bc} $$ $$ \cos B = \frac{a^2 + c^2 - b^2}{2ac} $$ Therefore, we can compute angles $A$ and $B$ separately. Finally, using the fact that the sum of the internal angles of a triangle is $180^\circ$, we get: $$ C = 180^\circ - A - B $$ Finally, we return the three internal angles. The time complexity is $O(1)$, and the space complexity is $O(1)$.
 * Approach: We first sort the array $\textit{sides}$ in non-decreasing order, and denote the three side lengths as $a$, $b$, and $c$, where $a \le b \le c$. According to the triangle inequality, if $a + b \le c$, then these three sides cannot form a triangle with positive area, so we return an empty array directly. Otherwise, the three sides can form a valid triangle. By the law of cosines, we have: $$ \cos A = \frac{b^2 + c^2 - a^2}{2bc} $$ $$ \cos B = \frac{a^2 + c^2 - b^2}{2ac} $$ Therefore, we can compute angles $A$ and $B$ separately. Finally, using the fact that the sum of the internal angles of a triangle is $180^\circ$, we get: $$ C = 180^\circ - A - B $$ Finally, we return the three internal angles. The time complexity is $O(1)$, and the space complexity is $O(1)$.
 * Dry Run: Input: sides = [3,4,5] => Output: [36.86990,53.13010,90.00000]
 * Time Complexity: O(O(1))
 * Space Complexity: O(O(1))
 */
var internalAngles = function (sides) {
  sides.sort((a, b) => a - b);
  const [a, b, c] = sides;
  if (a + b <= c) {
    return [];
  }
  const A = (Math.acos((b * b + c * c - a * a) / (2 * b * c)) * 180) / Math.PI;
  const B = (Math.acos((a * a + c * c - b * b) / (2 * a * c)) * 180) / Math.PI;
  const C = 180 - A - B;
  return [A, B, C];
};
