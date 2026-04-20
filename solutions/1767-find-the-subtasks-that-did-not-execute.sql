WITH RECURSIVE t AS (
  SELECT task_id, subtasks_count AS subtask_id
  FROM Tasks
  UNION ALL
  SELECT task_id, subtask_id - 1
  FROM t
  WHERE subtask_id > 1
)
SELECT task_id, subtask_id
FROM t
WHERE NOT EXISTS (
  SELECT 1
  FROM Executed e
  WHERE e.task_id = t.task_id
    AND e.subtask_id = t.subtask_id
);