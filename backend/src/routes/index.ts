import { Router } from 'express';
import productsRouter from './products.routes';
import userRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import loanRouter from './loans.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', userRouter);
routes.use('/loans', loanRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
