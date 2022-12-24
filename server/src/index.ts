import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import routes from './routes';
import userRouter from './routes/user.routes';

import { initDB } from './init/db';

const PORT = process.env.PORT || 8000;

const app: Application = express();

initDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(
	'/docs',
	swaggerUi.serve,
	swaggerUi.setup(undefined, {
		swaggerOptions: {
			url: '/swagger.json'
		}
	})
);

app.use(routes);
app.use('/user', userRouter);
app.listen(PORT);
