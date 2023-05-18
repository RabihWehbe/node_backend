import dotenv from 'dotenv';

/*load any env variables we have inside: bashrc or
inside our current env or inside .env in our root dir. of our project
*/
dotenv.config();

const MONGO_URL = process.env.MONGO_URL ? String(process.env.MONGO_URL) : '';

const SEREVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SEREVER_PORT
    }
};
