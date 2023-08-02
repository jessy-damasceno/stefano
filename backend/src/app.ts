import * as express from 'express';
import cors from 'cors';
import errorMiddleware from './middlewares/error.middleware';
import userRouter from './routes/user.route';
import contactRouter from './routes/contact.route';

class App {
  public app: express.Express;

  constructor() {
    this.app = express.default();

    this.config();

    this.app.get('/', (req: any, res: { json: (arg0: { ok: boolean; }) => any; }) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req: any, res: { header: (arg0: string, arg1: string) => void; }, next: () => void) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use(cors());

    this.app.use('/user', userRouter);
    this.app.use('/contact', contactRouter);

    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };