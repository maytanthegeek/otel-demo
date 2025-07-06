import express from 'express';
import { logger } from './logger';

const app = express();
const port = 3000;

// Middleware to simulate processing time
app.use((req, res, next) => {
  const delay = Math.random() * 100;
  setTimeout(next, delay);
});

app.get('/', (req, res) => {
  logger.info('Root endpoint accessed');
  res.json({ message: 'Hello from instrumented app!' });
});

app.get('/api/users', (req, res) => {
  logger.info('Users endpoint accessed');
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];
  res.json(users);
});

app.get('/api/orders', (req, res) => {
  if (Math.random() < 0.1) {
    logger.error('Orders endpoint error occurred');
    res.status(500).end();
    return;
  }

  logger.info('Orders endpoint accessed');
  const orders = [
    { id: 1, userId: 1, amount: 100.5 },
    { id: 2, userId: 2, amount: 75.25 },
  ];
  res.json(orders);
});

app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});
