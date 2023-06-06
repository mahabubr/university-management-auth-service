import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

//Cors
app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Routes
app.use('/api/v1/users/', UserRoutes);

// Testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error("Testing error logger")
// })

// global Error handler
app.use(globalErrorHandler);

export default app;
