"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const core_1 = require("@nestjs/core");
const MainModule_1 = require("./MainModule");
function getHTTPSOptions() {
    const certFile = process.env.WEBHOOK_DISPATCHER_HTTPS_CERT_FILE;
    const keyFile = process.env.WEBHOOK_DISPATCHER_HTTPS_KEY_FILE;
    if (certFile && keyFile) {
        if (!fs.existsSync(certFile)) {
            throw new Error(`HTTPS certificate file ${certFile} not found`);
        }
        if (!fs.existsSync(keyFile)) {
            throw new Error(`HTTPS key file ${keyFile} not found`);
        }
        console.log(`Reading certificate from ${path.resolve(certFile)}`);
        console.log(`Reading key from ${path.resolve(keyFile)}`);
        return {
            cert: fs.readFileSync(certFile),
            key: fs.readFileSync(keyFile),
        };
    }
}
async function bootstrap() {
    const app = await core_1.NestFactory
        .create(MainModule_1.MainModule, { httpsOptions: getHTTPSOptions() });
    app.enableShutdownHooks();
    const port = +process.env.WEBHOOK_DISPATCHER_HTTP_PORT || 8080;
    console.log(`Starting HTTP(s) server on port ${port}`);
    await app.listen(port);
}
bootstrap()
    .catch((error) => {
    console.error('Failed to bootstrap', error);
});
//# sourceMappingURL=main.js.map