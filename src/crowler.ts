// ts -> .d.ts 翻译文件 -> js
import superagent from 'superagent';
import cheerio from 'cheerio';

interface Course {
  title: string;
  count: number;
}

class Crowler {
  private secret = 'secretKey';
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
  getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseItems = $('.course-item');
    const courseInfos: Course[] = [];
    courseItems.map((index, element) => {
      const descs = $(element).find('.course-desc');
      const title = descs.eq(0).text();
      const count = parseInt(
        descs
          .eq(1)
          .text()
          .split('：')[1], // 这里就是一个中文的冒号，也没有空格
        10
      );
      courseInfos.push({
        title,
        count
      });
    });
    const result = {
      time: new Date().getTime(),
      data: courseInfos
    };
    console.log(result);
  }
  async getRawHtml() {
    const result = await superagent.get(this.url);
    this.getCourseInfo(result.text);
  }
  constructor() {
    this.getRawHtml();
  }
}

const crowler = new Crowler();
