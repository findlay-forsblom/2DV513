CREATE VIEW `customer_history` AS
SELECT email, phone_db.order.order_number, order_date, order_total, id_customer, quantity_order FROM phone_db.order
RIGHT JOIN (SELECT id_customer, email FROM Customer) AS customers ON 
	customers.id_customer = Customer_id_customer
    LEFT JOIN (select sum(quantity) AS quantity_order, phone_db.product_order.order_number FROM phone_db.product_order 
GROUP BY phone_db.product_order.order_number) AS quantities 
ON quantities.order_number = phone_db.order.order_number;