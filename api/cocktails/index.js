const fetch = require("node-fetch");
const { URL } = require("url");

module.exports = async function (context, req) {
    const path = context.bindingData.proxy || "";
    const baseUrl = `https://www.thecocktaildb.com/api/json/v2/961249867/${path}`;
    const fullUrl = new URL(baseUrl);

    // Append all query params from incoming request
    if (req.query) {
        Object.entries(req.query).forEach(([key, value]) => {
            fullUrl.searchParams.append(key, value);
        });
    }

    try {
        const response = await fetch(fullUrl.toString());

        const contentType = response.headers.get("content-type");
        const text = await response.text();

        if (!contentType?.includes("application/json")) {
            throw new Error(`Expected JSON, got ${contentType}: ${text}`);
        }

        const data = JSON.parse(text);

        context.res = {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: data
        };
    } catch (err) {
        console.error("Proxy error:", err.message);
        context.res = {
            status: 500,
            body: { error: "Proxy fetch failed", message: err.message }
        };
    }
};