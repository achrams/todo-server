import { Request, Response, NextFunction } from 'express';

interface ErrorFormat {
  status?: number; // Make status optional
  message: string;
  data?: any; // Make data optional
}

export default function errorHandler(err: ErrorFormat, req: Request, res: Response, next: NextFunction) {
  // Set default status if not provided
  const { status = err.status || 500, message, data = null } = err;

  res.status(status).json({
    message,
    data
  });
}
