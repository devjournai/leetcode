SELECT
  i.invoice_id,
  c.customer_name,
  i.price,
  COUNT(ct.user_id) AS contacts_count,
  COUNT(c2.email) AS trusted_contacts_count
FROM Invoices i
LEFT JOIN Customers c
  ON i.user_id = c.customer_id
LEFT JOIN Contacts ct
  ON i.user_id = ct.user_id
LEFT JOIN Customers c2
  ON ct.contact_email = c2.email
GROUP BY i.invoice_id, c.customer_name, i.price
ORDER BY i.invoice_id;