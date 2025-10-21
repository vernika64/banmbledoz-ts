import mysql from 'mysql2';

async function createConnection(): Promise<mysql.Connection> {
    return mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'banmbledoz'
    });
}

async function createPool(): Promise<mysql.Pool> {
    return mysql.createPool({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'banmbledoz',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
}

export { createConnection, createPool };