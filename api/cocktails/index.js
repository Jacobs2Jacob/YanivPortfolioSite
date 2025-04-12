const fetch = require("node-fetch");

module.exports = async function (context, req) {
    const path = context.bindingData.proxy || "";
    const url = 'https://www.thecocktaildb.com/api/json/v2/961249867/${path}';

    try {
        const response = await fetch(url);
        const data = await response.json();

        context.res = {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: data
        };
    } catch (err) {
        console.error("Proxy error:", err);
        context.res = {
            status: 500,
            body: { error: "Proxy fetch failed", message: err.message }
        };
    }
};