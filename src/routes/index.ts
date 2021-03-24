import { Router } from 'express';
import productsRouter from './products.routes';
import userRouter from './users.routes';
import loanRouter from './loans.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/user', userRouter);
routes.use('/loan', loanRouter);

export default routes;
