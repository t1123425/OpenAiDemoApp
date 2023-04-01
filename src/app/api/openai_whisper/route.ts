import { OpenAIApi } from "openai";
import { NextResponse} from "next/server";
import { NextApiRequest} from "next";
import formidable from "formidable";
import { apiConfirm } from "../apiConfiguration";


const openai = new OpenAIApi(apiConfirm);

const formidableParse = async (req:NextApiRequest) =>
  new Promise((resolve, reject) => {
        const form = formidable();
        form.parse(req, (err, fields, files) =>
            err ? reject(err) : resolve([fields, files])
        )
    }
  );

export async function POST(request:NextApiRequest ){
    
    if (!apiConfirm.apiKey){
        return NextResponse.json({
            error:{
                message: "OpenAI API key not configured, please follow instructions in README.md",
            }
        },{
            status:500
        })
    }
    try{
        const data = await formidableParse(request);
        // 
        // const form_data = await formParse();
        console.log('request_data',data);
        // const whisper = await openai.createTranscription(res.file,'whisper-1')
        // console.log('whisper',whisper);
        // const form = new formidable.IncomingForm();
        // form.parse(request,(err, fields, files) => {
        //     if(err){ 
        //         console.error(err);
        //         return NextResponse.json({
        //             error:{message:'Error parsing form data.'}
        //         },{
        //             status:500
        //         })
        //     }
        //     console.log('fields',fields);
        //     console.log('files',files);
        // })
        return NextResponse.json({
            result:'succesfull'
        },{
            status:200
        })
    }catch (error){
        console.error(`${error}`)
        return NextResponse.json({
            error:{
                message:'An error occurred during your request.'
            }
        },{
            status:500
        });
    }
}

export const config = {
    api: {
      bodyParser: false,
    },
};
