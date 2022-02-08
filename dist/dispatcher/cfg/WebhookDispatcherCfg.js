"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookDispatcherCfgSchema = void 0;
const Joi = require("joi");
const DispatchCfgSchema = Joi.object({
    token: Joi
        .string()
        .required(),
    url: Joi
        .string()
        .required(),
});
exports.WebhookDispatcherCfgSchema = Joi.object({
    dispatch: Joi
        .array()
        .items(DispatchCfgSchema)
        .required(),
});
//# sourceMappingURL=WebhookDispatcherCfg.js.map