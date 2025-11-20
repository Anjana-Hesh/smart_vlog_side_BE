import axios from "axios";
import { Request, Response } from "express";
import { data } from "react-router-dom";

export const generateContent = async (req:Request , resp: Response) => {

    const { prompt , maxToken } = req.body;

    // can use API or SDK

        try {

        const apiResponse = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
            {
                contents: [
                    {
                        parts: [
                            { text: prompt }
                        ]
                    }
                ],
                generationConfig: {
                    maxOutputTokens: maxToken || 150
                },
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-goog-api-key": "AIzaSyCKOKbwv6biBC1JGGd1_zhVA1CtId3ICuc"
                }
            }
        );

        const generatedContent =
            apiResponse.data?.candidates?.[0]?.content?.[0]?.text ||
            apiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No Content Generated";

        console.log(generatedContent);

        resp.status(200).json({
            data: generatedContent
        });

    } catch (error: any) {

        console.error(error);

        resp.status(500).json({
            message: "Failed to generate content",
            error: error.message
        });
    }

}