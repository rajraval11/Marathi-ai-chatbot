import initSqlJs, { Database } from 'sql.js';
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url';
import { DatasetRecord } from '../types';
import { INITIAL_DATASET } from '../data/initialData';
import Papa from 'papaparse';

const DB_STORAGE_KEY = 'marathi_govt_chatbot_sqlite_db';
const FALLBACK_STORAGE_KEY = 'marathi_govt_fallback_records';

class SQLiteManager {
  private db: Database | null = null;
  private isInitialized = false;
  private useFallback = false;

  async init(): Promise<Database | null> {
    if (this.isInitialized) {
      return this.db;
    }

    try {
      // Fetch WASM binary directly to avoid streaming compile / MIME type issues in browser
      let wasmBinary: ArrayBuffer | undefined;
      try {
        const res = await fetch(sqlWasmUrl);
        if (res.ok) {
          wasmBinary = await res.arrayBuffer();
        }
      } catch (err) {
        console.warn('Direct WASM binary fetch failed, trying locateFile fallback:', err);
      }

      const SQL = await initSqlJs({
        locateFile: () => sqlWasmUrl,
        ...(wasmBinary ? { wasmBinary } : {})
      });

      // Try restoring existing DB from localStorage
      const savedDb = localStorage.getItem(DB_STORAGE_KEY);
      if (savedDb) {
        try {
          const u8Array = new Uint8Array(JSON.parse(savedDb));
          this.db = new SQL.Database(u8Array);
        } catch {
          this.db = new SQL.Database();
        }
      } else {
        this.db = new SQL.Database();
      }

      this.createSchema();
      this.isInitialized = true;

      // Seed initial data if table is empty or missing updated default dataset records
      const records = this.getAllRecords();
      if (records.length < INITIAL_DATASET.length) {
        this.seedInitialData();
      }

      return this.db;
    } catch (err) {
      console.warn('SQLite WASM initialization failed, switching to LocalStorage JS Database engine:', err);
      this.useFallback = true;
      this.isInitialized = true;
      this.ensureFallbackData();
      return null;
    }
  }

  private ensureFallbackData(): void {
    const existing = localStorage.getItem(FALLBACK_STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(FALLBACK_STORAGE_KEY, JSON.stringify(INITIAL_DATASET));
    }
  }

  private createSchema(): void {
    if (!this.db) return;
    try {
      this.db.run(`
        CREATE TABLE IF NOT EXISTS knowledge_base (
          id TEXT PRIMARY KEY,
          question TEXT NOT NULL,
          answer TEXT NOT NULL,
          intent TEXT,
          entity TEXT,
          keywords TEXT,
          category TEXT,
          complexity TEXT,
          conversation_type TEXT
        );
      `);
      this.saveToStorage();
    } catch (e) {
      console.error('Error creating schema:', e);
    }
  }

  private saveToStorage(): void {
    if (!this.db) return;
    try {
      const data = this.db.export();
      const array = Array.from(data);
      localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(array));
    } catch (e) {
      console.error('Error saving SQLite DB to local storage:', e);
    }
  }

  seedInitialData(): void {
    if (this.useFallback || !this.db) {
      this.ensureFallbackData();
      return;
    }

    try {
      const stmt = this.db.prepare(`
        INSERT OR REPLACE INTO knowledge_base (id, question, answer, intent, entity, keywords, category, complexity, conversation_type)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      for (const item of INITIAL_DATASET) {
        stmt.run([
          item.id,
          item.question,
          item.answer,
          item.intent,
          item.entity,
          item.keywords,
          item.category,
          item.complexity,
          item.conversationType
        ]);
      }
      stmt.free();
      this.saveToStorage();
    } catch (e) {
      console.error('Error seeding initial SQLite data:', e);
    }
  }

  syncWithDefaultDataset(): number {
    this.seedInitialData();
    if (this.useFallback || !this.db) {
      localStorage.setItem(FALLBACK_STORAGE_KEY, JSON.stringify(INITIAL_DATASET));
    }
    return INITIAL_DATASET.length;
  }

  getAllRecords(): DatasetRecord[] {
    if (this.useFallback || !this.db) {
      const stored = localStorage.getItem(FALLBACK_STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return INITIAL_DATASET;
        }
      }
      return INITIAL_DATASET;
    }

    try {
      const res = this.db.exec(`SELECT * FROM knowledge_base`);
      if (res.length === 0 || !res[0].values) return [];

      const columns = res[0].columns;
      const values = res[0].values;

      return values.map((row) => {
        const obj: any = {};
        columns.forEach((col, idx) => {
          obj[col] = row[idx];
        });

        return {
          id: String(obj.id || ''),
          question: String(obj.question || ''),
          answer: String(obj.answer || ''),
          intent: String(obj.intent || ''),
          entity: String(obj.entity || ''),
          keywords: String(obj.keywords || ''),
          category: String(obj.category || ''),
          complexity: String(obj.complexity || 'Moderate'),
          conversationType: String(obj.conversation_type || obj.conversationType || 'Procedural Guidance')
        };
      });
    } catch (e) {
      console.warn('SQLite query failed, falling back to local storage:', e);
      const stored = localStorage.getItem(FALLBACK_STORAGE_KEY);
      if (stored) {
        try { return JSON.parse(stored); } catch {}
      }
      return INITIAL_DATASET;
    }
  }

  getRecordById(id: string): DatasetRecord | null {
    const records = this.getAllRecords();
    return records.find((r) => r.id === id) || null;
  }

  addRecord(record: DatasetRecord): boolean {
    if (this.useFallback || !this.db) {
      const records = this.getAllRecords();
      const existingIdx = records.findIndex((r) => r.id === record.id);
      if (existingIdx >= 0) {
        records[existingIdx] = record;
      } else {
        records.unshift(record);
      }
      localStorage.setItem(FALLBACK_STORAGE_KEY, JSON.stringify(records));
      return true;
    }

    try {
      this.db.run(
        `INSERT OR REPLACE INTO knowledge_base (id, question, answer, intent, entity, keywords, category, complexity, conversation_type)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          record.id,
          record.question,
          record.answer,
          record.intent,
          record.entity,
          record.keywords,
          record.category,
          record.complexity,
          record.conversationType
        ]
      );
      this.saveToStorage();
      return true;
    } catch (err) {
      console.error('Error adding record to SQLite:', err);
      const records = this.getAllRecords();
      records.unshift(record);
      localStorage.setItem(FALLBACK_STORAGE_KEY, JSON.stringify(records));
      return true;
    }
  }

  updateRecord(record: DatasetRecord): boolean {
    return this.addRecord(record);
  }

  deleteRecord(id: string): boolean {
    if (this.useFallback || !this.db) {
      let records = this.getAllRecords();
      records = records.filter((r) => r.id !== id);
      localStorage.setItem(FALLBACK_STORAGE_KEY, JSON.stringify(records));
      return true;
    }

    try {
      this.db.run(`DELETE FROM knowledge_base WHERE id = ?`, [id]);
      this.saveToStorage();
      return true;
    } catch (err) {
      console.error('Error deleting record from SQLite:', err);
      let records = this.getAllRecords();
      records = records.filter((r) => r.id !== id);
      localStorage.setItem(FALLBACK_STORAGE_KEY, JSON.stringify(records));
      return true;
    }
  }

  importFromCSV(csvContent: string): { success: boolean; count: number; error?: string } {
    try {
      const parsed = Papa.parse<any>(csvContent, { header: true, skipEmptyLines: true });
      if (parsed.errors && parsed.errors.length > 0 && parsed.data.length === 0) {
        return { success: false, count: 0, error: parsed.errors[0].message };
      }

      let count = 0;
      for (const row of parsed.data) {
        const id = row['ID'] || row['id'] || `MGC-NEW-${Math.random().toString(36).substring(2, 7)}`;
        const question = row['Question'] || row['question'] || '';
        const answer = row['Answer'] || row['answer'] || '';
        if (!question || !answer) continue;

        const record: DatasetRecord = {
          id: id.trim(),
          question: question.trim(),
          answer: answer.trim(),
          intent: (row['Intent'] || row['intent'] || 'GENERAL').trim(),
          entity: (row['Entity'] || row['entity'] || '').trim(),
          keywords: (row['Keywords'] || row['keywords'] || '').trim(),
          category: (row['Category'] || row['category'] || 'General').trim(),
          complexity: (row['Complexity'] || row['complexity'] || 'Moderate').trim(),
          conversationType: (row['Conversation Type'] || row['conversationType'] || 'Procedural Guidance').trim()
        };

        this.addRecord(record);
        count++;
      }

      return { success: true, count };
    } catch (err: any) {
      return { success: false, count: 0, error: err?.message || 'Unknown CSV parse error' };
    }
  }

  exportToCSV(): string {
    const records = this.getAllRecords();
    const formatted = records.map((r) => ({
      'ID': r.id,
      'Question': r.question,
      'Answer': r.answer,
      'Intent': r.intent,
      'Entity': r.entity,
      'Keywords': r.keywords,
      'Category': r.category,
      'Complexity': r.complexity,
      'Conversation Type': r.conversationType
    }));

    return Papa.unparse(formatted);
  }
}

export const dbManager = new SQLiteManager();
