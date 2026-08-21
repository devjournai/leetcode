-- Find Cities in Each State II
-- Intuition: Group cities by state, concatenate names, and count how many cities share their state's first letter. Keep states that have at least three cities and at least one matching-letter city.
-- Approach: GROUP_CONCAT cities in sorted order. SUM(LEFT(city, 1) = LEFT(state, 1)) as matching_letter_count. HAVING COUNT(*) >= 3 AND matching_letter_count > 0. ORDER BY matching_letter_count DESC, state.
-- Dry Run: CA cities Anaheim, Compton, Sacramento -> matching_letter_count 0, dropped. TX cities Austin, Dallas, Tyler -> matching 1, kept.
-- Time Complexity: O(C log C)
-- Space Complexity: O(C)

SELECT
    state,
    GROUP_CONCAT(city ORDER BY city SEPARATOR ', ') AS cities,
    SUM(LEFT(city, 1) = LEFT(state, 1)) AS matching_letter_count
FROM Cities
GROUP BY 1
HAVING COUNT(*) >= 3 AND matching_letter_count > 0
ORDER BY matching_letter_count DESC, state;
