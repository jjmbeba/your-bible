declare module 'better-sqlite3' {
    export default class Database {
        constructor(filename: string, options?: any);
        prepare(sql: string): Statement;
        exec(sql: string): void;
        close(): void;
    }

    export class Statement {
        run(...params: any[]): RunResult;
        get(...params: any[]): any;
        all(...params: any[]): any[];
        iterate(...params: any[]): IterableIterator<any>;
    }

    export interface RunResult {
        changes: number;
        lastInsertRowid: number;
    }
} 