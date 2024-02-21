import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import artistRoutes from './routes/artistRoutes';
import trackRoutes from './routes/trackRoutes';
import albumRoutes from './routes/albumRoutes';
import favoritesRoutes from './routes/favoritesRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/artist', artistRoutes);
app.use('/track', trackRoutes);
app.use('/album', albumRoutes);
app.use('/favs', favoritesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
