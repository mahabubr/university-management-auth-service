import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';

const app: Application = express();

//Cors
app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Routes
app.use('/api/v1/', routes);

// Testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error("Testing error logger")
// })

// global Error handler
app.use(globalErrorHandler);

// Handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
