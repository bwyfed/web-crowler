// ts -> .d.ts 翻译文件 -> js
import superagent from 'superagent';

class Crowler {
  private secret = 'secretKey';
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
  private rawHtml = '';
  async getRawHtml() {
    const result = await superagent.get(this.url);
    console.log(result.text);
  }
  constructor() {
    this.getRawHtml();
  }
}

const crowler = new Crowler();
