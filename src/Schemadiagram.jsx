export default function SchemaDiagram() {
  return (
    <svg
      viewBox="0 0 860 520"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      fontFamily="ui-monospace, Consolas, monospace"
    >
      <defs>
        {/* Arrow marker for FK lines */}
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#6366f1" />
        </marker>
        <marker id="arrow-many" markerWidth="10" markerHeight="10" refX="1" refY="5" orient="auto">
          <path d="M1,1 L1,9 M1,5 L9,5" stroke="#6366f1" strokeWidth="1.5" fill="none" />
        </marker>
      </defs>

      {/* ── Background ── */}
      <rect width="860" height="520" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* ── Title ── */}
      <text x="430" y="30" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e293b" fontFamily="system-ui, sans-serif">
        Database Schema – Table Relationships
      </text>

      {/* ══════════════════════════════════════
          TABLE: customers  (left, center-ish)
         ══════════════════════════════════════ */}
      <Table x={40} y={80} width={170} name="customers" pk="customer_id" cols={[
        { name: 'first_name', type: 'STRING' },
        { name: 'last_name',  type: 'STRING' },
        { name: 'city',       type: 'STRING' },
        { name: 'country',    type: 'STRING' },
        { name: 'age',        type: 'INT' },
      ]} color="#2563eb" />

      {/* ══════════════════════════════════════
          TABLE: categories  (right, top)
         ══════════════════════════════════════ */}
      <Table x={640} y={60} width={185} name="categories" pk="category_id" cols={[
        { name: 'category_name', type: 'STRING' },
        { name: 'description',   type: 'STRING' },
      ]} color="#0891b2" />

      {/* ══════════════════════════════════════
          TABLE: products  (center, top)
         ══════════════════════════════════════ */}
      <Table x={340} y={60} width={185} name="products" pk="product_id" cols={[
        { name: 'product_name', type: 'STRING' },
        { name: 'category_id',  type: 'INT', fk: true },
        { name: 'price',        type: 'FLOAT' },
        { name: 'stock',        type: 'INT' },
      ]} color="#0891b2" />

      {/* ══════════════════════════════════════
          TABLE: orders  (center, bottom)
         ══════════════════════════════════════ */}
      <Table x={280} y={300} width={200} name="orders" pk="order_id" cols={[
        { name: 'customer_id',  type: 'INT',    fk: true },
        { name: 'order_date',   type: 'STRING' },
        { name: 'order_status', type: 'STRING' },
        { name: 'order_total',  type: 'FLOAT' },
      ]} color="#7c3aed" />

      {/* ══════════════════════════════════════
          TABLE: order_items  (right, bottom)
         ══════════════════════════════════════ */}
      <Table x={560} y={290} width={195} name="order_items" pk="item_id" cols={[
        { name: 'order_id',   type: 'INT', fk: true },
        { name: 'product_id', type: 'INT', fk: true },
        { name: 'quantity',   type: 'INT' },
        { name: 'unit_price', type: 'FLOAT' },
      ]} color="#7c3aed" />

      {/* ══════════════════════════════════════
          FK LINES
         ══════════════════════════════════════ */}

      {/* customers.customer_id → orders.customer_id */}
      <FKLine
        x1={125} y1={235}   /* bottom of customers */
        x2={340} y2={356}   /* orders.customer_id row */
        label="1 : N"
      />

      {/* customers.customer_id → orders (via elbow) */}
      {/* products.category_id → categories.category_id */}
      <FKLine
        x1={525} y1={112}   /* right of products */
        x2={640} y2={100}   /* left of categories */
        label="N : 1"
      />

      {/* orders.order_id → order_items.order_id */}
      <FKLine
        x1={480} y1={358}   /* right of orders */
        x2={560} y2={345}   /* order_items.order_id */
        label="1 : N"
      />

      {/* products.product_id → order_items.product_id */}
      <FKLine
        x1={620} y1={185}   /* bottom of products */
        x2={648} y2={368}   /* order_items.product_id */
        label="1 : N"
        bend={30}
      />

      {/* ── Legend ── */}
      <g transform="translate(40, 470)">
        <rect width="780" height="36" rx="6" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
        <line x1="20" y1="18" x2="60" y2="18" stroke="#6366f1" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arrow)" />
        <text x="70" y="23" fontSize="11" fill="#374151" fontFamily="system-ui, sans-serif">Foreign Key reference</text>
        <circle cx="200" cy="18" r="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
        <text x="212" y="23" fontSize="11" fill="#374151" fontFamily="system-ui, sans-serif">🔑 Primary Key (PK)</text>
        <rect x="340" y="11" width="12" height="12" rx="2" fill="#fee2e2" stroke="#f87171" strokeWidth="1" />
        <text x="358" y="23" fontSize="11" fill="#374151" fontFamily="system-ui, sans-serif">🔗 Foreign Key column (FK)</text>
        <text x="545" y="23" fontSize="11" fill="#374151" fontFamily="system-ui, sans-serif">1 : N = one-to-many relationship</text>
      </g>
    </svg>
  );
}

/* ── Reusable Table component ── */
function Table({ x, y, width, name, pk, cols, color }) {
  const ROW_H = 22;
  const HEADER_H = 28;
  const height = HEADER_H + ROW_H + cols.length * ROW_H + 6;

  return (
    <g>
      {/* Shadow */}
      <rect x={x + 3} y={y + 3} width={width} height={height} rx="7" fill="rgba(0,0,0,0.07)" />
      {/* Body */}
      <rect x={x} y={y} width={width} height={height} rx="7" fill="#fff" stroke={color} strokeWidth="1.8" />
      {/* Header */}
      <rect x={x} y={y} width={width} height={HEADER_H} rx="7" fill={color} />
      <rect x={x} y={y + HEADER_H - 4} width={width} height={4} fill={color} />
      <text x={x + width / 2} y={y + 18} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">
        {name}
      </text>

      {/* PK row */}
      <rect x={x} y={y + HEADER_H} width={width} height={ROW_H} fill="#fef9c3" />
      <circle cx={x + 14} cy={y + HEADER_H + ROW_H / 2} r="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x={x + 24} y={y + HEADER_H + 14} fontSize="10.5" fill="#78350f" fontWeight="700">{pk}</text>
      <text x={x + width - 8} y={y + HEADER_H + 14} fontSize="9" fill="#92400e" textAnchor="end">INT</text>

      {/* Divider after PK */}
      <line x1={x} y1={y + HEADER_H + ROW_H} x2={x + width} y2={y + HEADER_H + ROW_H} stroke={color} strokeWidth="1" opacity="0.3" />

      {/* Column rows */}
      {cols.map((col, i) => {
        const ry = y + HEADER_H + ROW_H + i * ROW_H + 3;
        const isEven = i % 2 === 0;
        return (
          <g key={col.name}>
            <rect x={x} y={ry} width={width} height={ROW_H}
              fill={col.fk ? '#fce7f3' : isEven ? '#f8fafc' : '#fff'}
            />
            {col.fk && (
              <rect x={x + 2} y={ry + 3} width={3} height={ROW_H - 6} rx="1.5" fill="#db2777" />
            )}
            <text x={x + 12} y={ry + 14} fontSize="10.5" fill={col.fk ? '#9d174d' : '#374151'} fontWeight={col.fk ? '600' : '400'}>
              {col.fk ? '🔗 ' : '    '}{col.name}
            </text>
            <text x={x + width - 8} y={ry + 14} fontSize="9" fill="#94a3b8" textAnchor="end">{col.type}</text>
          </g>
        );
      })}

      {/* Bottom border */}
      <rect x={x} y={y + height - 3} width={width} height={3} rx="3" fill={color} opacity="0.4" />
    </g>
  );
}

/* ── FK line with label ── */
function FKLine({ x1, y1, x2, y2, label, bend = 0 }) {
  let d;
  if (bend) {
    d = `M${x1},${y1} C${x1 + bend},${y1} ${x2 - bend},${y2} ${x2},${y2}`;
  } else {
    const mx = (x1 + x2) / 2;
    d = `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
  }
  const lx = (x1 + x2) / 2;
  const ly = (y1 + y2) / 2 - 6;

  return (
    <g>
      <path d={d} stroke="#6366f1" strokeWidth="2" fill="none"
        strokeDasharray="6,3" markerEnd="url(#arrow)" />
      <rect x={lx - 18} y={ly - 10} width="36" height="14" rx="4" fill="#ede9fe" stroke="#a5b4fc" strokeWidth="1" />
      <text x={lx} y={ly} textAnchor="middle" fontSize="9" fontWeight="700" fill="#4f46e5" fontFamily="system-ui, sans-serif">
        {label}
      </text>
    </g>
  );
}
