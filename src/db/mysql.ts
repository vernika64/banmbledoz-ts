import mysql from 'mysql2';

export async function createConnection(): Promise<mysql.Connection> {
    return mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'banmbledoz'
    });
}