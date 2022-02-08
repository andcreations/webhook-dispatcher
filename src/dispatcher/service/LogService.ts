import { Injectable } from '@nestjs/common';
import * as YAML from 'yaml';

/** */
export type LogData = { [key: string]: any };

/** */
@Injectable()
export class LogService {
  /** */
  protected dataToStr(data: LogData): string {
    const lines = YAML.stringify(data).split('\n');
    let yaml = '';
    for (let index = 0; index < lines.length; index++) {
      const line = lines[index];
      if (index === lines.length - 1 && line.length === 0) {
        continue;
      }

      if (index) {
        yaml += '\n';
      }
      yaml += '  ' + line;
    }
    return yaml;
  }

  /** */
  private log(level: string, msg: string, data?: LogData): void {
    const dateStr = new Date().toISOString();
    const dataStr = data ? `\n${this.dataToStr(data)}` : '';
    console.log(`${dateStr} | ${level} | ${msg}${dataStr}`);
  }

  /** */
  info(msg: string, data?: LogData): void {
    this.log('INFO', msg, data);
  }
}