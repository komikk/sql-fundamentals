import alasql from 'alasql';

// Helper: create a table and directly populate it via alasql's in-memory store
function loadTable(name, rows) {
  alasql(`CREATE TABLE ${name}`);
  alasql.tables[name].data = rows;
}

export function initDatabase() {
  // Drop tables if they exist (for re-init)
  ['order_items', 'orders', 'products', 'categories', 'customers'].forEach(
    (t) => alasql(`DROP TABLE IF EXISTS ${t}`)
  );

  // --- CUSTOMERS ---
  loadTable('customers', [
    { customer_id: 1,  first_name: 'Anna',    last_name: 'Novak',    city: 'Prague',     country: 'Czech Republic', age: 32 },
    { customer_id: 2,  first_name: 'Martin',  last_name: 'Svoboda',  city: 'Brno',       country: 'Czech Republic', age: 28 },
    { customer_id: 3,  first_name: 'Lucie',   last_name: 'Horakova', city: 'Prague',     country: 'Czech Republic', age: 45 },
    { customer_id: 4,  first_name: 'Jan',     last_name: 'Kral',     city: 'Ostrava',    country: 'Czech Republic', age: 37 },
    { customer_id: 5,  first_name: 'Sophie',  last_name: 'Müller',   city: 'Berlin',     country: 'Germany',        age: 29 },
    { customer_id: 6,  first_name: 'Klaus',   last_name: 'Fischer',  city: 'Munich',     country: 'Germany',        age: 52 },
    { customer_id: 7,  first_name: 'Marie',   last_name: 'Dupont',   city: 'Paris',      country: 'France',         age: 41 },
    { customer_id: 8,  first_name: 'Pierre',  last_name: 'Martin',   city: 'Lyon',       country: 'France',         age: 35 },
    { customer_id: 9,  first_name: 'Emma',    last_name: 'Smith',    city: 'London',     country: 'UK',             age: 27 },
    { customer_id: 10, first_name: 'Oliver',  last_name: 'Jones',    city: 'Manchester', country: 'UK',             age: 60 },
  ]);

  // --- CATEGORIES ---
  loadTable('categories', [
    { category_id: 1, category_name: 'Electronics', description: 'Phones, laptops, and gadgets'      },
    { category_id: 2, category_name: 'Books',        description: 'Fiction, non-fiction, educational' },
    { category_id: 3, category_name: 'Clothing',     description: 'Shirts, trousers, jackets'         },
    { category_id: 4, category_name: 'Food',         description: 'Snacks, beverages, groceries'      },
    { category_id: 5, category_name: 'Sports',       description: 'Equipment and apparel'             },
  ]);

  // --- PRODUCTS ---
  loadTable('products', [
    { product_id: 1,  product_name: 'Laptop Pro',        category_id: 1, price: 1200.00, stock: 15  },
    { product_id: 2,  product_name: 'Smartphone X',      category_id: 1, price:  699.00, stock: 40  },
    { product_id: 3,  product_name: 'Wireless Earbuds',  category_id: 1, price:   89.99, stock: 80  },
    { product_id: 4,  product_name: 'SQL for Beginners', category_id: 2, price:   24.99, stock: 60  },
    { product_id: 5,  product_name: 'The Great Novel',   category_id: 2, price:   12.50, stock: 30  },
    { product_id: 6,  product_name: 'Python Cookbook',   category_id: 2, price:   34.00, stock: 25  },
    { product_id: 7,  product_name: 'Winter Jacket',     category_id: 3, price:   89.00, stock: 20  },
    { product_id: 8,  product_name: 'Running Shoes',     category_id: 5, price:   75.00, stock: 35  },
    { product_id: 9,  product_name: 'Coffee Beans 1kg',  category_id: 4, price:   14.90, stock: 100 },
    { product_id: 10, product_name: 'Yoga Mat',          category_id: 5, price:   29.99, stock: 50  },
  ]);

  // --- ORDERS ---
  loadTable('orders', [
    { order_id: 1,  customer_id: 1,  order_date: '2024-01-15', order_status: 'delivered', order_total: 1289.99 },
    { order_id: 2,  customer_id: 1,  order_date: '2024-03-02', order_status: 'delivered', order_total:   24.99 },
    { order_id: 3,  customer_id: 2,  order_date: '2024-02-10', order_status: 'delivered', order_total:  699.00 },
    { order_id: 4,  customer_id: 3,  order_date: '2024-03-20', order_status: 'shipped',   order_total:  178.00 },
    { order_id: 5,  customer_id: 4,  order_date: '2024-04-05', order_status: 'delivered', order_total:   89.99 },
    { order_id: 6,  customer_id: 5,  order_date: '2024-04-12', order_status: 'delivered', order_total:   46.50 },
    { order_id: 7,  customer_id: 6,  order_date: '2024-05-01', order_status: 'cancelled', order_total:   89.00 },
    { order_id: 8,  customer_id: 7,  order_date: '2024-05-15', order_status: 'delivered', order_total:  138.00 },
    { order_id: 9,  customer_id: 8,  order_date: '2024-06-03', order_status: 'shipped',   order_total:   75.00 },
    { order_id: 10, customer_id: 9,  order_date: '2024-06-20', order_status: 'delivered', order_total:  104.99 },
    { order_id: 11, customer_id: 1,  order_date: '2024-07-01', order_status: 'delivered', order_total:   34.00 },
    { order_id: 12, customer_id: 3,  order_date: '2024-07-18', order_status: 'delivered', order_total:   29.99 },
    { order_id: 13, customer_id: 10, order_date: '2024-08-05', order_status: 'delivered', order_total:  724.00 },
  ]);

  // --- ORDER ITEMS ---
  loadTable('order_items', [
    { item_id: 1,  order_id: 1,  product_id: 1,  quantity: 1, unit_price: 1200.00 },
    { item_id: 2,  order_id: 1,  product_id: 3,  quantity: 1, unit_price:   89.99 },
    { item_id: 3,  order_id: 2,  product_id: 4,  quantity: 1, unit_price:   24.99 },
    { item_id: 4,  order_id: 3,  product_id: 2,  quantity: 1, unit_price:  699.00 },
    { item_id: 5,  order_id: 4,  product_id: 7,  quantity: 2, unit_price:   89.00 },
    { item_id: 6,  order_id: 5,  product_id: 3,  quantity: 1, unit_price:   89.99 },
    { item_id: 7,  order_id: 6,  product_id: 5,  quantity: 2, unit_price:   12.50 },
    { item_id: 8,  order_id: 6,  product_id: 4,  quantity: 1, unit_price:   24.99 },
    { item_id: 9,  order_id: 7,  product_id: 7,  quantity: 1, unit_price:   89.00 },
    { item_id: 10, order_id: 8,  product_id: 8,  quantity: 1, unit_price:   75.00 },
    { item_id: 11, order_id: 8,  product_id: 9,  quantity: 4, unit_price:   14.90 },
    { item_id: 12, order_id: 9,  product_id: 8,  quantity: 1, unit_price:   75.00 },
    { item_id: 13, order_id: 10, product_id: 3,  quantity: 1, unit_price:   89.99 },
    { item_id: 14, order_id: 10, product_id: 9,  quantity: 1, unit_price:   14.90 },
    { item_id: 15, order_id: 11, product_id: 6,  quantity: 1, unit_price:   34.00 },
    { item_id: 16, order_id: 12, product_id: 10, quantity: 1, unit_price:   29.99 },
    { item_id: 17, order_id: 13, product_id: 2,  quantity: 1, unit_price:  699.00 },
    { item_id: 18, order_id: 13, product_id: 9,  quantity: 1, unit_price:   14.90 },
  ]);
}

export function runQuery(sql) {
  try {
    const result = alasql(sql);
    if (Array.isArray(result)) {
      return { data: result, error: null };
    }
    return { data: [{ result }], error: null };
  } catch (e) {
    return { data: [], error: e.message };
  }
}
