export default {
    settings: {
        projectName: "greensense",

        envs: {
            dev: "Local development environment",
            production: "VPS production environment",
        },

        groups: {
            node: {
                comment: "Node.js environment",
                variables: ["NODE_ENV"],
            },
            label: {
                comment: "Environment label",
                variables: ["ENV_LABEL"],
            },
            nextjs: {
                comment: "Next.js configuration",
                variables: ["NEXTJS_STANDALONE", "NEXT_PUBLIC_BASE_URL"],
            },
            vps: {
                comment: "VPS domain",
                variables: ["VPS_NEXTJS_DOMAIN"],
            },
            umami: {
                comment: "Umami analytics (optional)",
                variables: ["UMAMI_URL", "UMAMI_WEBSITE_ID"],
            },
        },
    },

    globalEnvConfig: {
        nextjs: {
            NEXTJS_STANDALONE: true,
        },
        umami: {
            // TO UPDATE: internal Umami service URL (dokploy-network) + website ID
            UMAMI_URL: "http://umami:3000",
            UMAMI_WEBSITE_ID: "your-website-id",
        },
    },

    envConfig: {
        dev: {
            node: {
                NODE_ENV: "development",
            },
            label: {
                ENV_LABEL: "{{ENV}}-{{projectName}}",
            },
            nextjs: {
                NEXTJS_STANDALONE: false,
                NEXT_PUBLIC_BASE_URL: "http://localhost:3000",
            },
            vps: {
                VPS_NEXTJS_DOMAIN: "localhost",
            },
            EXCLUDE: ["UMAMI_URL", "UMAMI_WEBSITE_ID"],
        },
        production: {
            node: {
                NODE_ENV: "production",
            },
            label: {
                ENV_LABEL: "{{projectName}}",
            },
            nextjs: {
                NEXT_PUBLIC_BASE_URL: "https://{{VPS_NEXTJS_DOMAIN}}",
            },
            vps: {
                // TO UPDATE: your production domain
                VPS_NEXTJS_DOMAIN: "your-domain.com",
            },
        },
    },
};
