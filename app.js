const express = require('express');
const app = express();
const port = 3000;
const Pool = require('pg').Pool;

const pool = new Pool({
    database: 'customer',
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'root'
});

app.use(express.json());
app.get('/customers', async (req, res) => {
    let customers = await pool.query('SELECT * FROM customers');
    res.send(customers.rows);
});

app.get('/customers/:id', async (req, res) => {
    let id = req.params.id;
    let customer = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);
    res.send(customer.rows[0]);
});

app.post('/customers', async (req, res) => {
    let { nama, email, phone_number, is_active } = req.body;
    let newCustomer = await pool.query('INSERT INTO customers (nama, email, phone_number, is_active) VALUES ($1, $2, $3, $4) RETURNING *', [nama, email, phone_number, is_active]);
    res.send({
        data: newCustomer.rows[0],
    });
});

app.put('/customers/:id', async (req, res) => {
    let id = req.params.id;
    let { nama, email, phone_number, is_active } = req.body;
    let updateCustomer = await pool.query('UPDATE customers SET nama = $1, email = $2, phone_number = $3, is_active = $4 WHERE id = $5 RETURNING *', [nama, email, phone_number, is_active, id]);
    res.send({
        data: updateCustomer.rows[0],
    });
});

app.delete('/customers/:id', async (req, res) => {
    let id = req.params.id;
    let deleteCustomer = await pool.query('DELETE FROM customers WHERE id = $1 RETURNING *', [id]);
    res.send({
        data: deleteCustomer.rows[0],
    });
});

app.listen(port, () => {
    console.log('running on port', port);
});