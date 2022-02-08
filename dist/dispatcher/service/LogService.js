"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
const common_1 = require("@nestjs/common");
const YAML = require("yaml");
let LogService = class LogService {
    dataToStr(data) {
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
    log(level, msg, data) {
        const dateStr = new Date().toISOString();
        const dataStr = data ? `\n${this.dataToStr(data)}` : '';
        console.log(`${dateStr} | ${level} | ${msg}${dataStr}`);
    }
    info(msg, data) {
        this.log('INFO', msg, data);
    }
};
LogService = __decorate([
    (0, common_1.Injectable)()
], LogService);
exports.LogService = LogService;
//# sourceMappingURL=LogService.js.map