import { OpenAIApi } from "openai";
import { NextResponse } from "next/server";
import { apiConfirm } from "../apiConfiguration";

const openai = new OpenAIApi(apiConfirm);

export async function POST(request: Request){
    if (!apiConfirm.apiKey){
        return NextResponse.json({
            error:{
                message: "OpenAI API key not configured, please follow instructions in README.md",
            }
        },{
            status:500
        })
    }
    try {
        const res = await request.json();
        console.log('backend res',res);
        const chatResponse = await openai.createChatCompletion({
            model:'gpt-3.5-turbo',
            messages:res.msgs
        })
        // console.log('chatResponse',chatResponse);
        return NextResponse.json({
            result:'success',
            data:chatResponse.data
        },{status:200})
        
    } catch (error) {
        console.log('error',error);
        return NextResponse.json({
            error:{
                message: error,
            }
        },{
            status:500
        })
    }
}