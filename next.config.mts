import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const isStandalone = process.env.NEXTJS_STANDALONE === "true";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

// Security headers config
const securityHeaders = [
    // Force HTTPS for 1 year
    { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
    // Prevent clickjacking attacks
    { key: "X-Frame-Options", value: "DENY" },
    // Prevent MIME type sniffing
    { key: "X-Content-Type-Options", value: "nosniff" },
    // Prevent information leaks via the referrer URL
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    // Disable unused browser features
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    // Specify authorized sources for content
    {
        key: "Content-Security-Policy",
        value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline'",
            "connect-src 'self'",
            "font-src 'self'",
            "img-src 'self' data:",
        ].join("; "),
    },
];

const nextConfig: NextConfig = {
    // Build output mode
    output: isStandalone ? "standalone" : undefined,

    // Directory for tracing files in standalone mode
    outputFileTracingRoot: __dirname,

    // Typed routes for links
    typedRoutes: true,

    // Enable React memoising compiler
    reactCompiler: true,

    // New nextjs rendering method (every page is dynamic by default)
    // Directives: use cache, use cache private, use cache remote
    // Functions: cacheTag, cacheLife, revalidateTag, updateTag
    cacheComponents: true,

    // Allow external origins for dev HMR (ngrok, etc.)
    allowedDevOrigins: [baseUrl.replace(/^https?:\/\//, "")],

    // Security headers
    headers: async () => [{ source: "/(.*)", headers: securityHeaders }],

    experimental: {
        // View transition API
        viewTransition: true,

        // Unauthorized redirection support
        authInterrupts: true,

        // Turbopack persistent caching
        turbopackFileSystemCacheForDev: true,
        turbopackFileSystemCacheForBuild: true,
    },
};

const bundleAnalyzerWrapper = bundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

const nextConfigExport = bundleAnalyzerWrapper(nextConfig);

export default nextConfigExport;
