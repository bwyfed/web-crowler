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
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.send(`
      <html>
        <body>
          <a href="/logout">退出</a>
        </body>
      </html>
    `);
  } else {
    res.send(`
      <html>
        <body>
          <form method="post" action="/login">
            <input type="password" name="password" />
            <button type="submit">登录</button>
          </form>
        </body>
      </html>
  `);
  }
});

router.get('/logout', (req: Request, res: Response) => {
  if (req.session) {
    req.session.login = undefined;
  }
  res.redirect('/');
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { password } = req.body;
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.send('已经登录过');
  } else {
    if (password === '123' && req.session) {
      req.session.login = true;
      res.send('登录成功');
    } else {
      res.send('登录失败');
    }
  }
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
    res.send(`password error!`);
  }
});

export default router;
