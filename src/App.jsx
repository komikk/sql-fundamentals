import { useState, useEffect, useCallback } from 'react';
import { initDatabase, runQuery } from './db';
import { lessons, schemaInfo } from './lessons';
import SchemaDiagram from './Schemadiagram';
import './App.css';

const CATEGORIES = [...new Set(lessons.map((l) => l.category))];

function SchemaPanel() {
  const [open, setOpen] = useState(null);
  return (
    <div className="schema-panel">
      <div className="schema-title">📐 Database Schema</div>
      {schemaInfo.map((table) => (
        <div key={table.name} className="schema-table">
          <button
            className={`schema-table-header ${open === table.name ? 'open' : ''}`}
            onClick={() => setOpen(open === table.name ? null : table.name)}
          >
            <span>🗂 {table.name}</span>
            <span className="schema-chevron">{open === table.name ? '▲' : '▼'}</span>
          </button>
          {open === table.name && (
            <table className="schema-cols">
              <tbody>
                {table.columns.map((col) => (
                  <tr key={col.name}>
                    <td className="col-name"><code>{col.name}</code></td>
                    <td className="col-type">{col.type}</td>
                    <td className="col-note">{col.note || ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
}

function ResultsTable({ data, error, rowCount }) {
  if (error) {
    return (
      <div className="result-error">
        <span className="error-icon">❌</span>
        <span>{error}</span>
      </div>
    );
  }
  if (!data || data.length === 0) {
    return <div className="result-empty">No results returned.</div>;
  }
  const columns = Object.keys(data[0]);
  return (
    <div className="result-wrapper">
      <div className="result-meta">{rowCount} row{rowCount !== 1 ? 's' : ''} returned</div>
      <div className="table-scroll">
        <table className="result-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col}>
                    {row[col] === null || row[col] === undefined
                      ? <span className="null-val">null</span>
                      : String(row[col])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DiagramPanel() {
  const [open, setOpen] = useState(false);
  return (
    <div className="diagram-panel">
      <button className="diagram-toggle" onClick={() => setOpen((v) => !v)}>
        <span>📊 Table Relationship Diagram</span>
        <span className="diagram-chevron">{open ? '▲ Hide' : '▼ Show'}</span>
      </button>
      {open && (
        <div className="diagram-body">
          <SchemaDiagram />
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [dbReady, setDbReady] = useState(false);
  const [activeLesson, setActiveLesson] = useState(lessons[0]);
  const [sql, setSql] = useState(lessons[0].defaultQuery);
  const [result, setResult] = useState({ data: [], error: null });
  const [hasRun, setHasRun] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    initDatabase();
    setDbReady(true);
  }, []);

  const handleSelectLesson = useCallback((lesson) => {
    setActiveLesson(lesson);
    setSql(lesson.defaultQuery);
    setResult({ data: [], error: null });
    setHasRun(false);
  }, []);

  const handleRun = useCallback(() => {
    const res = runQuery(sql);
    setResult({ ...res, rowCount: res.data.length });
    setHasRun(true);
  }, [sql]);

  const handleReset = useCallback(() => {
    setSql(activeLesson.defaultQuery);
    setResult({ data: [], error: null });
    setHasRun(false);
  }, [activeLesson]);

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRun();
    }
  };

  if (!dbReady) {
    return <div className="loading">Loading database…</div>;
  }

  return (
    <div className="app-layout">
      {/* ── Sidebar ── */}
      <aside className={`sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
        <div className="sidebar-header">
          <span className="sidebar-logo">🎓 SQL Explorer</span>
          <button className="sidebar-toggle" onClick={() => setSidebarOpen((v) => !v)}>
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {sidebarOpen && (
          <>
            {CATEGORIES.map((cat) => (
              <div key={cat} className="lesson-group">
                <div className="lesson-group-title">{cat}</div>
                {lessons
                  .filter((l) => l.category === cat)
                  .map((lesson) => (
                    <button
                      key={lesson.id}
                      className={`lesson-btn ${activeLesson.id === lesson.id ? 'active' : ''}`}
                      onClick={() => handleSelectLesson(lesson)}
                    >
                      {lesson.title}
                    </button>
                  ))}
              </div>
            ))}

            <div className="sidebar-schema">
              <SchemaPanel />
            </div>
          </>
        )}
      </aside>

      {/* ── Main content ── */}
      <main className="main-content">
        <header className="lesson-header">
          <h1>{activeLesson.title}</h1>
          <span className="lesson-badge">{activeLesson.category}</span>
        </header>

        {/* Explanation */}
        <section
          className="explanation"
          dangerouslySetInnerHTML={{ __html: activeLesson.explanation }}
        />

        {/* Schema Diagram */}
        <DiagramPanel />

        {/* Editor */}
        <section className="editor-section">
          <div className="editor-toolbar">
            <span className="editor-label">✏️ SQL Query</span>
            <div className="editor-actions">
              <button className="btn btn-reset" onClick={handleReset} title="Reset to example">
                ↺ Reset
              </button>
              <button className="btn btn-run" onClick={handleRun} title="Run (Ctrl+Enter)">
                ▶ Run
              </button>
            </div>
          </div>
          <textarea
            className="sql-editor"
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            rows={6}
            placeholder="Type your SQL query here…"
          />
          <div className="editor-hint">Press <kbd>Ctrl</kbd>+<kbd>Enter</kbd> to run</div>
        </section>

        {/* Results */}
        <section className="results-section">
          <div className="results-label">📊 Results</div>
          {hasRun ? (
            <ResultsTable
              data={result.data}
              error={result.error}
              rowCount={result.rowCount}
            />
          ) : (
            <div className="result-empty">Run the query to see results here.</div>
          )}
        </section>

        {/* Navigation */}
        <div className="lesson-nav">
          <button
            className="btn btn-nav"
            disabled={activeLesson.id <= 1}
            onClick={() => handleSelectLesson(lessons[activeLesson.id - 2])}
          >
            ← Previous
          </button>
          <span className="lesson-counter">
            Lesson {activeLesson.id} / {lessons.length}
          </span>
          <button
            className="btn btn-nav"
            disabled={activeLesson.id >= lessons.length}
            onClick={() => handleSelectLesson(lessons[activeLesson.id])}
          >
            Next →
          </button>
        </div>
      </main>
    </div>
  );
}
