with cte as (
select 
    e1.*,
    e2.month as past_month,
    e2.salary as past_salary,
    dense_rank() over(partition by e1.id order by e1.month desc) as month_latest
from Employee e1
left join Employee e2
    on e1.id = e2.id
    and (e1.month - e2.month)  between 0 and 2
)

select id, month, sum(past_salary) as Salary
from cte
where month_latest != 1
group by id,month