import express, { Request, Response } from "express";
import bodyParser  from "body-parser";
import cors from 'cors';
import { createConnection } from "./db/mysql";

const app = express();
const HOST: string = '127.0.0.1';
const PORT: number = 4000;

const db = createConnection();

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: `*`,
    methods: ['GET', 'POST']
}));

app.get('/', (req: Request, res: Response) => {
    try {
        res.status(200).json({
            status: 'success',
            message: 'Service is listening'
        });
        console.log(`[200] / OK`)
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server Error'
        });
        console.log(`[500] / SERVER ERROR`);
        console.log(error);
    }
});

app.get('/getProducts', async (req: Request, res: Response) => {
    try {
        const connection = await db;

        const [rows, fields] = await connection.promise().execute('SELECT * FROM products');

        res.status(200).json({
            status: 'success',
            message: 'Data berhasil diambil',
            data: rows
        });
        
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server Error'
        });
    }
});

app.post('/insertProducts', async (req: Request, res: Response) => {
    try {
        const data = req.body;

        const connection = await db;

        const query = 'INSERT INTO products (productId, productName, productPrice, productCategory) VALUES (?, ?, ?, ?)';


        const [rows, fields] = await connection.promise().execute('SELECT * FROM products');

        res.status(200).json({
            status: 'success',
            message: 'Data berhasil diambil',
            data: rows
        });
        
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server Error'
        });
    }
});

app.listen(PORT, HOST, () => {
    console.log(`Nodejs with Typescript API server is working on http://${HOST}:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});