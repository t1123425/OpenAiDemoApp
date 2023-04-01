import { OpenAIApi } from "openai";
import { NextResponse } from "next/server";
import { apiConfirm } from "../apiConfiguration";


const openai = new OpenAIApi(apiConfirm);

function generatePrompt(animal:string) {
    const capitalizedAnimal =
      animal[0].toUpperCase() + animal.slice(1).toLowerCase();
    return `Suggest three names for an animal that is a superhero.
        Animal: Cat
        Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
        Animal: Dog
        Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
        Animal: ${capitalizedAnimal}
        Names:`;
  }
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
        const completion = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: generatePrompt(res.animal),
            temperature: 0.6,
        })
        return NextResponse.json({
            result:completion.data.choices[0].text
        },{
            status:200
        })
        
    } catch (error) {
        console.error(`Error with OpenAI API ${error}`)
        return NextResponse.json({
            error:{
                message:'An error occurred during your request.'
            }
        },{
            status:500
        });
    } 
}