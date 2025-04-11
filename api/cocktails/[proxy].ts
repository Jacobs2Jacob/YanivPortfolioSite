import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import fetch from "node-fetch";

const handler: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const path = context.bindingData.proxy || "";
  const fullUrl = `https://www.thecocktaildb.com/api/json/v1/1/${path}`;

  try {
    const res = await fetch(fullUrl);
    const data = await res.json();

    context.res = {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: data,
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: { error: "Failed to fetch data", details: error.message },
    };
  }
};

export default handler;
