import express from 'express';
import  router  from './routes';
// import authApp from './middlewares/authenticate'; // Import authApp instead of app
import sequelize from './sequelize';
import cors from 'cors';

// enable CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};



const app = express();
const port = process.env.PORT;
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
// app.use(authApp);


const connexion = (async () => {
  await sequelize
          .sync({ force: false })
          .then(() => console.log('Database and tables created successfully'))
          .catch((err) => console.log('Error while creating database', err));
  app.listen(port, () => console.info(`Server running on port ${port}`));
})();
export { connexion };