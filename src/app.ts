import express, { Request, Response } from "express";
import bodyParser  from "body-parser";
import cors from 'cors';
import { createConnection, createPool } from "./db/mysql";
import { Products, ProductForms } from "./interfaces/Products";
import { JsonAPIOutput } from "./interfaces/System";

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
        console.log(`[200] ${req.originalUrl} OK`);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server Error'
        });
        console.log(`[500] ${req.originalUrl} SERVER ERROR`);
        console.log(error);
    }
});

app.get('/getProducts', async (req: Request, res: Response) => {
    try {
        const connection = await db;

        const [rows, fields] = await connection.promise().execute('SELECT * FROM products');

        console.log(`[200] ${req.originalUrl} OK`);

        res.status(200).json({
            status: 'success',
            message: 'Data berhasil diambil',
            data: rows
        });
        
    } catch (error) {
        console.log(`[500] ${req.originalUrl} SERVER ERROR`);
        res.status(500).json({
            status: 'error',
            message: 'Server Error'
        });
    }
});

app.get('/getProductsPool', async (req: Request, res: Response) => {
    try {
        const pool = (await createPool()).promise();

        const [rows] = await pool.query('SELECT * FROM products');

        const response: JsonAPIOutput = {
            status: 'success',
            message: 'Data berhasil diambil',
            data: rows
        };
        res.status(200).json(response);
    } catch (error) {
        console.log(`[500] ${req.originalUrl} SERVER ERROR`);
        res.status(500).json({
            status: 'error',
            message: 'Server Error'
        });
    }
});

app.post('/insertProduct', async (req: Request, res: Response) => {
    try {
        const data: ProductForms = req.body;

        const connection = await db;

        const query: string = 'INSERT INTO products (productId, productName, productPrice, productCategory) VALUES (?, ?, ?, ?)';

        const values: [string, string, number, string] = [
            data.PRODUCT_ID,
            data.NAME,
            data.PRICE,
            data.CATEGORY
        ];

        connection.execute(query, values);

        console.log(`[200] ${req.originalUrl} OK`);

        res.status(200).json({
            status: 'success',
            message: 'Data berhasil ditambahkan'
        });
        
    } catch (error) {
        console.log(`[500] ${req.originalUrl} SERVER ERROR`);
        console.log(error);
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