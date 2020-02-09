import { Router, Request, Response } from 'express';
import Crowler from './crowler';
import DellAnalyzer from './dellAnalyzer';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('hello world1');
});

router.get('/getData', (req: Request, res: Response) => {
  const secret = 'secretKey';
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
  const analyzer = DellAnalyzer.getInstance();
  new Crowler(url, analyzer);
  res.send('getData success!');
});

export default router;
