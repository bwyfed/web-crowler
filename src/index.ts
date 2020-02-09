import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import router from './router';

// 问题2：当我使用中间件的时候，对req，res做了修改之后，实际上类型并不能改变

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: 'session',
    keys: ['teacher dell'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);
app.use(router);

app.listen(7001, () => {
  console.log('server is running');
});
