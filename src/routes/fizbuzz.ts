import express, { Request, Response } from 'express';

// Create a router for FizzBuzz
const fizzbuzzRouter = express.Router();

// Define route handler for FizzBuzz
fizzbuzzRouter.get('/:number', (req: Request, res: Response) => {
  const { number } = req.params;
  const num = parseInt(number, 10);
  let result = '';

  // Perform FizzBuzz logic
  if (isNaN(num)) {
    result = 'Invalid input. Please provide a valid number.';
  } else {
    if (num % 3 === 0) result += 'Fizz';
    if (num % 5 === 0) result += 'Buzz';
    if (!result) result = number;
  }

  res.send(result);
});

export default fizzbuzzRouter;
