import * as fs from 'fs';
import * as YAML from 'yaml';
import { Axios } from 'axios';
import {
  HttpException,
  HttpStatus,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';

import { WebhookDispatcherCfg, WebhookDispatcherCfgSchema } from '../cfg';
import { LogService } from '.';

/** */
const CFG_FILE_ENV_VAR = 'WEBHOOK_DISPATCHER_CFG_FILE';
const HEADERS_TO_COPY = [
  'content-type',
  'user-agent',
  'accept',
  'host',
  'accept-encoding',
  'connection',
];

/** */
@Injectable()
export class DispatcherService implements OnApplicationBootstrap {
  /** Configuration. */
  private cfg: WebhookDispatcherCfg;

  /** Axios HTTP client. */
  private axios: Axios;

  /** */
  constructor(private readonly log: LogService) {
    this.axios = new Axios({});
  }

  /** */
  onApplicationBootstrap(): void {
    this.readCfg();
  }

  /** */
  private readCfg(): void {
  // file
    const cfgFile = process.env[CFG_FILE_ENV_VAR];
    if (!cfgFile) {
      throw new Error(`Missing environment variable ${CFG_FILE_ENV_VAR}`);
    }
    if (!fs.existsSync(cfgFile)) {
      throw new Error(`Configuration file ${cfgFile} not found`);
    }

  // read & parse
    const content = fs.readFileSync(cfgFile).toString();
    const cfg = YAML.parse(content);

  // validate
    const result = WebhookDispatcherCfgSchema.validate(cfg);
    if (result.error) {
      throw new Error(`Invalid configuration: ${result.error.message}`);
    }

  // keep
    this.cfg = cfg;

  // log
    this.log.info('Read configuration', this.cfg);
  }

  /** */
  async dispatch(
    token: string,
    headers: { [key: string]: string },
    body: any,
  ): Promise<any> {
    this.log.info('Dispatching', { token, body });

  // find URL
    const url = this.cfg.dispatch.find(itr => itr.token === token)?.url;
    if (!url) {
      throw new HttpException(`Unknown token ${token}`, HttpStatus.BAD_REQUEST);
    }

    const config = {
      headers: {}
    };
  // headers
    Object.keys(headers).forEach(key => {
      if (HEADERS_TO_COPY.includes(key)) {
        config.headers[key] = headers[key];
      }
    })

  // dispatch
    let response;
    try {
      response = await this.axios.post<any>(url, JSON.stringify(body), config);
    } catch (error) {
      console.error(error.toString());
      throw error;
    }
    const { status, statusText } = response;

  // handle errors
    if (status >= 400) {
      throw new HttpException(statusText, status);
    }

    return response.data;
  }
}