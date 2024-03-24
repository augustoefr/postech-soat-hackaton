import App from './app';
import 'dotenv/config';
import session from "express-session";

const app = new App();

app.initializeAdapters().then(() => app.getServer().listen(process.env.SERVER_PORT));