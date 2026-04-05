import "server-only";

const required = (name: string): string => {
    const value = process.env[name];
    if (!value) throw new Error(`${name} environment variable is not defined`);
    return value;
};

// Required
export const NODE_ENV = required("NODE_ENV");

// Umami analytics (optional)
export const UMAMI_URL = process.env.UMAMI_URL;
export const UMAMI_WEBSITE_ID = process.env.UMAMI_WEBSITE_ID;
export const IS_UMAMI_DEFINED = !!(UMAMI_URL && UMAMI_WEBSITE_ID);
