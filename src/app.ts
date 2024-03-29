import express, { Application } from "express";
import cors from "cors";
import { DATA_LIMIT } from "./constants";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import redisClient from "./config/redis";
import helmet from "helmet";

const app: Application = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: DATA_LIMIT }));

app.use(express.static("public"));

app.use(cookieParser());

app.use(helmet());

redisClient.connect();

// Import all routes
import userRoutes from './routes/user.routes';
import artistRoutes from './routes/artist.routes';
import trackRoutes from './routes/track.routes';
import albumRoutes from './routes/album.routes';
import playlistRoutes from './routes/playlist.routes';
import searchRoutes from './routes/search.routes';
import historyRoutes from './routes/history.routes';
import followRoutes from './routes/follow.routes';


// Declare routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/artists', artistRoutes);
app.use('/api/v1/tracks', trackRoutes);
app.use('/api/v1/albums', albumRoutes);
app.use('/api/v1/playlists', playlistRoutes);
app.use('/api/v1/searches', searchRoutes);
app.use('/api/v1/history', historyRoutes);
app.use('/api/v1/follow', followRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
    res.status(200).json("Hello World")
})


export { app }