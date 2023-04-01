import { Configuration } from "openai";

export const apiConfirm = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
}); 