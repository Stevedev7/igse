import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { config } from 'dotenv';

import routes from './routes';
import userRoutes from './routes/user.routes';
import igseRoutes from './routes/igse.routes';

import { initDB } from './init/db';
import seed from './init/seed.db';
import initTariff from './init/tariff.init';

config();

const PORT = process.env.PORT || 8000;

const app: Application = express();

initDB();
initTariff();
seed();
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

//Routes definition

// Routes -> /user/*
app.use('/user', userRoutes);

// Routes -> /igse/*
app.use('/igse', igseRoutes);

app.listen(PORT, () => {
	console.log(`Server started at http://localhost:${PORT}`);
});
