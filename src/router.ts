import { Router, Request, Response } from 'express';
import Crowler from './crowler';
import DellAnalyzer from './dellAnalyzer';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send(`
    <html>
      <body>
        <form method="post" action="/getData">
          <input type="password" name="password" />
          <button type="submit">提交</button>
        </form>
      </body>
    </html>
  `);
});

router.post('/getData', (req: Request, res: Response) => {
  console.log(req.body);
  const { password } = req.body;
  if (password === '123') {
    const secret = 'secretKey';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = DellAnalyzer.getInstance();
    new Crowler(url, analyzer);
    res.send('getData success!');
  } else {
    res.send('password error!');
  }
});

export default router;
