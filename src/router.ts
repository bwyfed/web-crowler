import { Router, Request, Response } from 'express';
import Crowler from './crowler';
import DellAnalyzer from './dellAnalyzer';

// 问题1：express 库的类型定义文件 .d.ts 文件类型描述不准确
interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

const router = Router();

router.get('/', (req: RequestWithBody, res: Response) => {
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

router.post('/getData', (req: RequestWithBody, res: Response) => {
  const { password, username } = req.body;
  if (password === '123') {
    const secret = 'secretKey';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = DellAnalyzer.getInstance();
    new Crowler(url, analyzer);
    res.send('getData success!');
  } else {
    res.send(`${req.teacherName} password error!`);
  }
});

export default router;
