export const lessons = [
  {
    id: 1,
    title: '📋 Tables & Data',
    category: 'Basics',
    explanation: `A database stores data in <strong>tables</strong>, just like spreadsheets.
Each table has <strong>columns</strong> (what data we store) and <strong>rows</strong> (the actual records).
<br/><br/>
We have 4 tables in our database:
<ul>
  <li><code>customers</code> – people who shop in our store</li>
  <li><code>categories</code> – product categories</li>
  <li><code>products</code> – items we sell</li>
  <li><code>orders</code> – purchases made by customers</li>
  <li><code>order_items</code> – individual items inside each order</li>
</ul>
Run the query to see all our customers!`,
    defaultQuery: 'SELECT * FROM customers',
  },
  {
    id: 2,
    title: '🔍 SELECT columns',
    category: 'Basics',
    explanation: `Instead of selecting ALL columns with <code>*</code>, you can pick only the columns you need.
<br/><br/>
This is like saying: "Show me only the name and city of every customer" instead of their entire profile.
<br/><br/>
Try changing the column names in the query!`,
    defaultQuery: 'SELECT first_name, last_name, city FROM customers',
  },
  {
    id: 3,
    title: '🔎 WHERE – Filtering rows',
    category: 'Basics',
    explanation: `The <code>WHERE</code> clause lets you <strong>filter rows</strong> – you only get back the rows that match your condition.
<br/><br/>
Think of it as a sieve: only matching records pass through.
<br/><br/>
Try changing <code>'Czech Republic'</code> to <code>'Germany'</code> or another country!`,
    defaultQuery: "SELECT first_name, last_name, city, country\nFROM customers\nWHERE country = 'Czech Republic'",
  },
  {
    id: 4,
    title: '🔢 WHERE with numbers',
    category: 'Basics',
    explanation: `You can also filter by numbers. Common operators:
<ul>
  <li><code>=</code>  equal to</li>
  <li><code>&gt;</code>  greater than</li>
  <li><code>&lt;</code>  less than</li>
  <li><code>&gt;=</code> greater than or equal</li>
  <li><code>&lt;=</code> less than or equal</li>
</ul>
Try finding customers older than 40, or younger than 30!`,
    defaultQuery: 'SELECT first_name, last_name, age\nFROM customers\nWHERE age > 35',
  },
  {
    id: 5,
    title: '🔗 AND / OR',
    category: 'Basics',
    explanation: `You can combine multiple conditions:
<ul>
  <li><code>AND</code> – both conditions must be true</li>
  <li><code>OR</code>  – at least one condition must be true</li>
</ul>
The example finds Czech customers older than 35. Try changing it to use <code>OR</code> instead!`,
    defaultQuery: "SELECT first_name, last_name, country, age\nFROM customers\nWHERE country = 'Czech Republic' AND age > 35",
  },
  {
    id: 6,
    title: '🔤 ORDER BY – Sorting',
    category: 'Basics',
    explanation: `<code>ORDER BY</code> sorts the results.
<ul>
  <li><code>ASC</code>  – ascending (A→Z, 0→9) – this is the default</li>
  <li><code>DESC</code> – descending (Z→A, 9→0)</li>
</ul>
Try sorting by <code>last_name</code> or by <code>age DESC</code>!`,
    defaultQuery: 'SELECT first_name, last_name, age\nFROM customers\nORDER BY age DESC',
  },
  {
    id: 7,
    title: '🔑 Primary Key',
    category: 'Keys & Relations',
    explanation: `A <strong>Primary Key</strong> is a column (or group of columns) that <strong>uniquely identifies each row</strong>.
<br/><br/>
In our <code>customers</code> table, <code>customer_id</code> is the primary key.
No two customers can have the same <code>customer_id</code>.
<br/><br/>
Think of it like an ID card number – everyone has a unique one.
<br/><br/>
The query shows us that each customer has a different ID.`,
    defaultQuery: 'SELECT customer_id, first_name, last_name\nFROM customers\nORDER BY customer_id',
  },
  {
    id: 8,
    title: '🔗 Foreign Key',
    category: 'Keys & Relations',
    explanation: `A <strong>Foreign Key</strong> is a column in one table that <strong>refers to the primary key of another table</strong>.
<br/><br/>
In our <code>orders</code> table, <code>customer_id</code> is a foreign key – it links each order back to a customer.
<br/><br/>
This is how tables are <em>related</em> to each other. It's the core idea of a <strong>relational database</strong>!
<br/><br/>
Notice that customer_id 1 (Anna Novak) appears multiple times in orders – she ordered several times.`,
    defaultQuery: 'SELECT order_id, customer_id, order_date, order_total\nFROM orders\nORDER BY customer_id',
  },
  {
    id: 9,
    title: '🤝 JOIN – Connecting tables',
    category: 'JOINs',
    explanation: `<code>JOIN</code> lets us <strong>combine rows from two tables</strong> based on a related column.
<br/><br/>
Instead of seeing just a <code>customer_id</code> number in orders, we can JOIN the <code>customers</code> table to see the actual name!
<br/><br/>
The <code>ON</code> clause tells SQL which columns to match:
<code>orders.customer_id = customers.customer_id</code>
<br/><br/>
This is called an <strong>INNER JOIN</strong> – it only returns rows where there's a match in both tables.`,
    defaultQuery: `SELECT orders.order_id, customers.first_name, customers.last_name,
       orders.order_date, orders.order_total
FROM orders
JOIN customers ON orders.customer_id = customers.customer_id
ORDER BY orders.order_date`,
  },
  {
    id: 10,
    title: '🤝 JOIN with alias',
    category: 'JOINs',
    explanation: `Writing full table names gets repetitive. We can use <strong>aliases</strong> – short nicknames for tables – using <code>AS</code> (or just a space).
<br/><br/>
<code>orders AS o</code> means "call the orders table <em>o</em>".
<br/><br/>
This makes queries much shorter and easier to read!`,
    defaultQuery: `SELECT o.order_id, c.first_name, c.last_name,
       o.order_date, o.order_status, o.order_total
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.customer_id
ORDER BY o.order_date`,
  },
  {
    id: 11,
    title: '🔗 JOIN 3 tables',
    category: 'JOINs',
    explanation: `You can JOIN more than two tables! Here we connect three:
<ol>
  <li><code>order_items</code> – what was in each order</li>
  <li><code>orders</code>      – which customer ordered</li>
  <li><code>products</code>    – what the product name is</li>
</ol>
This lets us answer: <em>"What products did each customer order and for how much?"</em>`,
    defaultQuery: `SELECT c.first_name, c.last_name, p.product_name,
       oi.quantity, oi.unit_price,
       oi.quantity * oi.unit_price AS line_total
FROM order_items AS oi
JOIN orders AS o ON oi.order_id = o.order_id
JOIN customers AS c ON o.customer_id = c.customer_id
JOIN products AS p ON oi.product_id = p.product_id
ORDER BY c.last_name`,
  },
  {
    id: 12,
    title: '↔️ LEFT JOIN',
    category: 'JOINs',
    explanation: `A <strong>LEFT JOIN</strong> returns <em>all rows from the left table</em>, even if there's no match in the right table.
<br/><br/>
Missing values appear as <code>null</code>.
<br/><br/>
The example shows all customers – even those who never placed an order (they'll have <code>null</code> in the order columns).
<br/><br/>
This is useful to find customers who have <em>never</em> ordered anything!`,
    defaultQuery: `SELECT c.first_name, c.last_name, o.order_id, o.order_total
FROM customers AS c
LEFT JOIN orders AS o ON c.customer_id = o.customer_id
ORDER BY c.customer_id`,
  },
  {
    id: 13,
    title: '🔢 COUNT – Counting rows',
    category: 'Aggregates',
    explanation: `<strong>Aggregate functions</strong> calculate a single result from multiple rows.
<br/><br/>
<code>COUNT(*)</code> counts how many rows exist.
<br/><br/>
How many customers do we have? How many orders? Let's find out!`,
    defaultQuery: 'SELECT COUNT(*) AS total_customers FROM customers',
  },
  {
    id: 14,
    title: '➕ SUM, AVG, MIN, MAX',
    category: 'Aggregates',
    explanation: `Other useful aggregate functions:
<ul>
  <li><code>SUM(column)</code> – adds up all values</li>
  <li><code>AVG(column)</code> – calculates the average</li>
  <li><code>MIN(column)</code> – finds the smallest value</li>
  <li><code>MAX(column)</code> – finds the largest value</li>
</ul>
Try changing <code>SUM</code> to <code>AVG</code> or <code>MAX</code>!`,
    defaultQuery: `SELECT
  SUM(order_total) AS total_revenue,
  AVG(order_total) AS avg_order_value,
  MIN(order_total) AS smallest_order,
  MAX(order_total) AS largest_order
FROM orders`,
  },
  {
    id: 15,
    title: '📊 GROUP BY',
    category: 'Aggregates',
    explanation: `<code>GROUP BY</code> splits rows into groups and applies an aggregate function to each group.
<br/><br/>
The example counts <strong>how many customers are from each country</strong>.
<br/><br/>
Think of it as sorting cards into piles by suit, then counting each pile.`,
    defaultQuery: `SELECT country, COUNT(*) AS num_customers
FROM customers
GROUP BY country
ORDER BY num_customers DESC`,
  },
  {
    id: 16,
    title: '📊 GROUP BY with JOIN',
    category: 'Aggregates',
    explanation: `We can combine GROUP BY with JOIN to answer more interesting questions.
<br/><br/>
Here: <em>"How much has each customer spent in total?"</em>
<br/><br/>
We JOIN customers with orders, then GROUP BY customer to sum up their orders.`,
    defaultQuery: `SELECT c.first_name, c.last_name,
  COUNT(o.order_id) AS num_orders,
  SUM(o.order_total) AS total_spent
FROM customers AS c
JOIN orders AS o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name
ORDER BY total_spent DESC`,
  },
  {
    id: 17,
    title: '🔍 HAVING – Filter groups',
    category: 'Aggregates',
    explanation: `<code>HAVING</code> is like <code>WHERE</code>, but for groups created by <code>GROUP BY</code>.
<br/><br/>
<strong>Remember:</strong> Use <code>WHERE</code> to filter individual rows, use <code>HAVING</code> to filter groups.
<br/><br/>
The example shows only categories that have <strong>more than 2 products</strong>.`,
    defaultQuery: `SELECT cat.category_name, COUNT(p.product_id) AS num_products
FROM categories AS cat
JOIN products AS p ON cat.category_id = p.category_id
GROUP BY cat.category_id, cat.category_name
HAVING COUNT(p.product_id) > 1
ORDER BY num_products DESC`,
  },
  {
    id: 18,
    title: '🏪 Products by category',
    category: 'Practice',
    explanation: `Let's practice! This query shows all products together with their category name.
<br/><br/>
Notice that <code>products.category_id</code> is a <strong>foreign key</strong> that references <code>categories.category_id</code>.
<br/><br/>
💡 Try adding a <code>WHERE</code> clause to show only one category, or add <code>ORDER BY p.price DESC</code> to sort by price.`,
    defaultQuery: `SELECT p.product_name, cat.category_name,
       p.price, p.stock
FROM products AS p
JOIN categories AS cat ON p.category_id = cat.category_id
ORDER BY cat.category_name, p.price`,
  },
  {
    id: 19,
    title: '📦 Order details',
    category: 'Practice',
    explanation: `A real-world query: show the full details of every order line item.
<br/><br/>
This joins <strong>4 tables</strong> together:
<br/>
<code>order_items → orders → customers</code>
<br/>
<code>order_items → products → categories</code>
<br/><br/>
💡 Try adding <code>WHERE o.order_status = 'delivered'</code> to show only delivered orders.`,
    defaultQuery: `SELECT o.order_id, o.order_date, o.order_status,
       c.first_name || ' ' || c.last_name AS customer,
       p.product_name, cat.category_name,
       oi.quantity, oi.unit_price,
       oi.quantity * oi.unit_price AS line_total
FROM order_items AS oi
JOIN orders AS o ON oi.order_id = o.order_id
JOIN customers AS c ON o.customer_id = c.customer_id
JOIN products AS p ON oi.product_id = p.product_id
JOIN categories AS cat ON p.category_id = cat.category_id
ORDER BY o.order_date`,
  },
  {
    id: 20,
    title: '🏆 Top spending customers',
    category: 'Practice',
    explanation: `A classic report: who are our best customers?
<br/><br/>
We use JOIN + GROUP BY + ORDER BY + (optionally) LIMIT.
<br/><br/>
💡 Try adding <code>HAVING SUM(o.order_total) > 500</code> to show only big spenders, or change the ORDER BY to <code>num_orders DESC</code>.`,
    defaultQuery: `SELECT c.first_name, c.last_name, c.country,
  COUNT(o.order_id) AS num_orders,
  ROUND(SUM(o.order_total), 2) AS total_spent
FROM customers AS c
JOIN orders AS o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name, c.country
ORDER BY total_spent DESC`,
  },
];

export const schemaInfo = [
  {
    name: 'customers',
    columns: [
      { name: 'customer_id', type: 'INT', note: '🔑 Primary Key' },
      { name: 'first_name',  type: 'STRING' },
      { name: 'last_name',   type: 'STRING' },
      { name: 'city',        type: 'STRING' },
      { name: 'country',     type: 'STRING' },
      { name: 'age',         type: 'INT' },
    ],
  },
  {
    name: 'categories',
    columns: [
      { name: 'category_id',   type: 'INT',    note: '🔑 Primary Key' },
      { name: 'category_name', type: 'STRING' },
      { name: 'description',   type: 'STRING' },
    ],
  },
  {
    name: 'products',
    columns: [
      { name: 'product_id',   type: 'INT',   note: '🔑 Primary Key' },
      { name: 'product_name', type: 'STRING' },
      { name: 'category_id',  type: 'INT',   note: '🔗 FK → categories' },
      { name: 'price',        type: 'FLOAT' },
      { name: 'stock',        type: 'INT' },
    ],
  },
  {
    name: 'orders',
    columns: [
      { name: 'order_id',    type: 'INT',    note: '🔑 Primary Key' },
      { name: 'customer_id', type: 'INT',    note: '🔗 FK → customers' },
      { name: 'order_date',  type: 'STRING' },
      { name: 'order_status', type: 'STRING' },
      { name: 'order_total',  type: 'FLOAT' },
    ],
  },
  {
    name: 'order_items',
    columns: [
      { name: 'item_id',    type: 'INT',   note: '🔑 Primary Key' },
      { name: 'order_id',   type: 'INT',   note: '🔗 FK → orders' },
      { name: 'product_id', type: 'INT',   note: '🔗 FK → products' },
      { name: 'quantity',   type: 'INT' },
      { name: 'unit_price', type: 'FLOAT' },
    ],
  },
];
