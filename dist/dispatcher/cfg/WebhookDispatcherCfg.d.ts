import * as Joi from 'joi';
export interface DispatchCfg {
    token: string;
    url: string;
}
export interface WebhookDispatcherCfg {
    dispatch: Array<DispatchCfg>;
}
export declare const WebhookDispatcherCfgSchema: Joi.ObjectSchema<any>;
