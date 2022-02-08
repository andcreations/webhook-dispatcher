import * as Joi from 'joi';

/** */
export interface DispatchCfg {
  /** Token */
  token: string;

  /** URL to which to dispatch. */
  url: string;
}

/** */
const DispatchCfgSchema = Joi.object({
  token: Joi
    .string()
    .required(),
  url: Joi
    .string()
    .required(),
})

/** */
export interface WebhookDispatcherCfg {
  /** Dispatch configuration. */
  dispatch: Array<DispatchCfg>;
}

/** */
export const WebhookDispatcherCfgSchema = Joi.object({
  dispatch: Joi
    .array()
    .items(DispatchCfgSchema)
    .required(),
});