# 🎓 SQL Explorer

An interactive React SPA for learning SQL fundamentals — runs entirely in the browser using [alasql](https://github.com/AlaSQL/alasql). No server, no database installation needed.

Built as a teaching tool to explain how relational databases work, covering everything from basic `SELECT` queries to multi-table `JOIN`s, foreign keys, and aggregate functions.

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

---

## 📦 Tech Stack

| | |
| --- | --- |
| Framework | React 19 + Vite |
| In-browser SQL | [alasql](https://github.com/AlaSQL/alasql) |
| Styling | Plain CSS (no framework) |

---

## 🗂 Database Schema

The app ships with 5 pre-populated tables and ~50 rows of sample data:

```text
customers ──< orders ──< order_items >── products >── categories
```

| Table | Rows | Description |
| --- | --- | --- |
| `customers` | 10 | People from CZ, DE, FR, UK |
| `categories` | 5 | Electronics, Books, Clothing, Food, Sports |
| `products` | 10 | Items with prices and stock levels |
| `orders` | 13 | Orders with dates and statuses |
| `order_items` | 18 | Line items linking orders ↔ products |

> Column names that conflict with alasql reserved words (`status`, `total`) are prefixed: `order_status`, `order_total`.

---

## 📚 Lessons

20 guided lessons across 5 categories:

| Category | Topics |
| --- | --- |
| **Basics** | Tables & data, SELECT columns, WHERE, AND/OR, ORDER BY |
| **Keys & Relations** | Primary Key, Foreign Key |
| **JOINs** | INNER JOIN, table aliases, 3-table JOIN, LEFT JOIN |
| **Aggregates** | COUNT, SUM / AVG / MIN / MAX, GROUP BY, HAVING |
| **Practice** | Products by category, full order report, top customers |

---

## ✨ Features

- **Sidebar** — lessons grouped by category, collapsible
- **📐 Schema panel** — clickable tables showing columns, types, PK/FK annotations
- **📊 Relationship diagram** — SVG diagram showing all foreign key relationships between tables
- **SQL editor** — editable textarea, `Ctrl+Enter` to run
- **↺ Reset** — restores the example query at any time
- **Results table** — scrollable, highlights `null` values
- **← → navigation** — step through lessons in order
- **100% client-side** — no backend, all data lives in-memory via alasql

---

## 📁 Project Structure

```text
src/
  App.jsx          # Main UI: sidebar, editor, results, navigation
  db.js            # alasql table setup and data loading
  lessons.js       # All 20 lesson definitions (explanation + default query)
  Schemadiagram.jsx# SVG relationship diagram component
  App.css          # Component styles
  index.css        # Global reset and CSS variables
```
