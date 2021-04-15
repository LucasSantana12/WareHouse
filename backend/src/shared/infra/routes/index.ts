import { Router } from 'express';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import loanRouter from '@modules/loans/infra/http/routes/loans.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', userRouter);
routes.use('/loans', loanRouter);
routes.use('/sessions', sessionsRouter);

export default routes;