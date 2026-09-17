import { environments } from './environments';

const envName =
    (process.env.ENV || 'qa') as keyof typeof environments;

if (!environments[envName]) {
    throw new Error(
        `Invalid environment: ${envName}. Valid environments are: ${Object.keys(environments).join(', ')}`
    );
}

export const runtimeConfig = environments[envName];