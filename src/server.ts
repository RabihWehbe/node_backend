import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
// import Logging from './library/logging';
import productRoutes from './routes/product';
import userRoutes from './routes/user';
import { Console } from 'console';

const router = express();

mongoose.set('strictQuery', false);

/*Connect to Mongo */
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then((db) => {
        //Logging.info('Connected to mongoDB.');
        console.log('Connected to mongoDB.');
    })
    .catch((error) => {
        //Logging.error('Unable to connect:');
        //Logging.error(error);
        console.log('Unable to connect:');
    });

/*Only starts the server if Mongo Connects
 Implementing our router functionalities:
 1- log the request and response by call router.use to create a piece of middleware*/
const StartServer = () => {
    // router.use((req, res, next) => {
    //     /*Log the request */
    //     Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    //     /*check my response's on finish Listener*/
    //     res.on('finish', () => {
    //         /*log the response */
    //         Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
    //     });

    //     /*after the response finish we call the next() functionality
    //     This will allow us to pass through this piece of middleware instead of ending the request on this middleware
    //     Anytime you want the middleware to pass the request through you have to call the next fun on it*/
    //     next();
    // });

    //basic mws <=> we only accept json in any format
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /** Rules of our API */
    router.use((req, res, next) => {
        //go back to 17:00 to explain the rules
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /** Routes */
    router.use('/products', productRoutes);
    router.use('/users', userRoutes);

    /** Healthcheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

    /** Error Handling */
    //if req passes through our routes doesnt match anything we gonna throw an error
    router.use((req, res, next) => {
        const error = new Error('not found');
        // Logging.error(error);
        console.error(error);

        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () => console.info(`server is running on: ${config.server.port}`));
};

StartServer();
