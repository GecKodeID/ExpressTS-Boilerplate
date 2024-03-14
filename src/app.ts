import express, { Request, Response } from 'express';

const app = express();

app.get('/api/fizzbuzz/:number', (req: Request, res: Response) => {
  const { number } = req.params;
  const num = parseInt(number, 10);
  let result = '';

  if (isNaN(num)) {
    result = 'Invalid input. Please provide a valid number.';
  } else {
    if (num % 3 === 0) result += 'Fizz';
    if (num % 5 === 0) result += 'Buzz';
    if (!result) result = number;
  }

  res.send(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
