"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatcherService = void 0;
const fs = require("fs");
const YAML = require("yaml");
const axios_1 = require("axios");
const common_1 = require("@nestjs/common");
const cfg_1 = require("../cfg");
const _1 = require(".");
const CFG_FILE_ENV_VAR = 'WEBHOOK_DISPATCHER_CFG_FILE';
const HEADERS_TO_COPY = [
    'content-type',
    'user-agent',
    'accept',
    'host',
    'accept-encoding',
    'connection',
];
let DispatcherService = class DispatcherService {
    constructor(log) {
        this.log = log;
        this.axios = new axios_1.Axios({});
    }
    onApplicationBootstrap() {
        this.readCfg();
    }
    readCfg() {
        const cfgFile = process.env[CFG_FILE_ENV_VAR];
        if (!cfgFile) {
            throw new Error(`Missing environment variable ${CFG_FILE_ENV_VAR}`);
        }
        if (!fs.existsSync(cfgFile)) {
            throw new Error(`Configuration file ${cfgFile} not found`);
        }
        const content = fs.readFileSync(cfgFile).toString();
        const cfg = YAML.parse(content);
        const result = cfg_1.WebhookDispatcherCfgSchema.validate(cfg);
        if (result.error) {
            throw new Error(`Invalid configuration: ${result.error.message}`);
        }
        this.cfg = cfg;
        this.log.info('Read configuration', this.cfg);
    }
    async dispatch(token, headers, body) {
        var _a;
        this.log.info('Dispatching', { token, body });
        const url = (_a = this.cfg.dispatch.find(itr => itr.token === token)) === null || _a === void 0 ? void 0 : _a.url;
        if (!url) {
            throw new common_1.HttpException(`Unknown token ${token}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const config = {
            headers: {}
        };
        Object.keys(headers).forEach(key => {
            if (HEADERS_TO_COPY.includes(key)) {
                config.headers[key] = headers[key];
            }
        });
        let response;
        try {
            response = await this.axios.post(url, JSON.stringify(body), config);
        }
        catch (error) {
            console.error(error.toString());
            throw error;
        }
        const { status, statusText } = response;
        if (status >= 400) {
            throw new common_1.HttpException(statusText, status);
        }
        return response.data;
    }
};
DispatcherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [_1.LogService])
], DispatcherService);
exports.DispatcherService = DispatcherService;
//# sourceMappingURL=DispatcherService.js.map