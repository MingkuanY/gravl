module.exports = {

"[project]/src/app/api/auth/[...nextauth]/auth.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "authOptions": ()=>authOptions
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$next$2d$auth$2f$prisma$2d$adapter$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@next-auth/prisma-adapter/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__commonjs__external__$40$prisma$2f$client__ = __turbopack_external_require__("@prisma/client", true);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$google$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/providers/google.js [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
const prisma = new __TURBOPACK__commonjs__external__$40$prisma$2f$client__["PrismaClient"]();
const authOptions = {
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$google$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    access_type: "offline",
                    prompt: "consent"
                }
            }
        })
    ],
    callbacks: {
        async jwt ({ token, account }) {
            console.log("jwt works");
            if (account) {
                console.log("ACCOUNT! WE HAVE AN ACCOUNT BLESSED LORD WE DO");
                // First login, save the `access_token`, `refresh_token`, and other
                // details into the JWT
                const userProfile = {
                    // @ts-ignore
                    id: token.sub,
                    // @ts-ignore
                    name: profile?.name,
                    // @ts-ignore
                    email: profile?.email,
                    image: token?.picture
                };
                return {
                    access_token: account.access_token,
                    expires_at: account.expires_at,
                    refresh_token: account.refresh_token,
                    user: userProfile
                };
            } else if (Date.now() < token.expires_at * 1000) {
                // Subsequent logins, if the `access_token` is still valid, return the JWT
                return token;
            } else {
                // Subsequent logins, if the `access_token` has expired, try to refresh it
                if (!token.refresh_token) throw new Error("Missing refresh token");
                try {
                    // The `token_endpoint` can be found in the provider's documentation. Or if they support OIDC,
                    // at their `/.well-known/openid-configuration` endpoint.
                    // i.e. https://accounts.google.com/.well-known/openid-configuration
                    const response = await fetch("https://oauth2.googleapis.com/token", {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: new URLSearchParams({
                            client_id: process.env.AUTH_GOOGLE_ID,
                            client_secret: process.env.AUTH_GOOGLE_SECRET,
                            grant_type: "refresh_token",
                            refresh_token: token.refresh_token
                        }),
                        method: "POST"
                    });
                    const responseTokens = await response.json();
                    if (!response.ok) throw responseTokens;
                    return {
                        // Keep the previous token properties
                        ...token,
                        access_token: responseTokens.access_token,
                        expires_at: Math.floor(Date.now() / 1000 + responseTokens.expires_in),
                        // Fall back to old refresh token, but note that
                        // many providers may only allow using a refresh token once.
                        refresh_token: responseTokens.refresh_token ?? token.refresh_token
                    };
                } catch (error) {
                    console.error("Error refreshing access token", error);
                    // The error property can be used client-side to handle the refresh token error
                    return {
                        ...token,
                        error: "RefreshAccessTokenError"
                    };
                }
            }
        },
        async session ({ session, token }) {
            if (token?.user && session) {
                // @ts-ignore
                session.user = token.user;
            }
            return session;
        }
    },
    useSecureCookies: false,
    adapter: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$next$2d$auth$2f$prisma$2d$adapter$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaAdapter"])(prisma)
};

})()),
"[project]/src/app/api/auth/[...nextauth]/route.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "GET": ()=>handler,
    "POST": ()=>handler
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$next$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/next/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$auth$2f5b2e2e2e$nextauth$5d2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/api/auth/[...nextauth]/auth.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const handler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$next$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$auth$2f5b2e2e2e$nextauth$5d2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authOptions"]);
;

})()),

};

//# sourceMappingURL=src_app_api_auth_%5B___nextauth%5D_9773ec._.js.map