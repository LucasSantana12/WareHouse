import { Router } from 'express';
import productsRouter from './products.routes';
import userRouter from './users.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/user', userRouter);

export default routes;
