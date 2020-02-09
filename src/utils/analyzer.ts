import fs from 'fs';
import cheerio from 'cheerio';
import { Analyzer } from './crowler';

interface Course {
  title: string;
  count: number;
}

interface CourseResult {
  time: number;
  data: Course[];
}

interface Content {
  [propName: number]: Course[];
}
export default class DellAnalyzer implements Analyzer {
  private static instance: DellAnalyzer;
  static getInstance() {
    if (!DellAnalyzer.instance) {
      DellAnalyzer.instance = new DellAnalyzer();
    }
    return DellAnalyzer.instance;
  }
  private getCourseInfo(html: string) {
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
    return {
      time: new Date().getTime(),
      data: courseInfos
    };
  }

  private generateJsonContent(courseInfo: CourseResult, filePath: string) {
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
    // fileContent是个对象，必须转换为string才能写到文件里。
    // fs.writeFileSync(filePath, JSON.stringify(fileContent));
  }

  public analyze(html: string, filePath: string) {
    const courseInfo = this.getCourseInfo(html);
    const fileContent = this.generateJsonContent(courseInfo, filePath);
    return JSON.stringify(fileContent);
  }

  private constructor() {}
}
