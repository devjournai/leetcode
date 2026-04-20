with t1 as(
    select 
        *,
        sum(frequency) over(order by num asc) as acc_num,
        sum(frequency) over() as total_num
    from
        numbers
)

select
    round(avg(num), 1) as median
from
    t1
where
    total_num / 2 <= acc_num
    and acc_num - frequency <= total_num / 2