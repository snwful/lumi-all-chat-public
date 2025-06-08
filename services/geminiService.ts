
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage, MessageSender, AIMode } from '../types';

// This is where you'd initialize the actual Gemini client
// Ensure process.env.API_KEY is available in your environment
let ai: GoogleGenAI | null = null;
try {
    if (process.env.API_KEY) {
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    } else {
        console.warn("API_KEY environment variable not found. Gemini API will be mocked.");
    }
} catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
    ai = null;
}

const GEMINI_MODEL = 'gemini-2.5-flash-preview-04-17';

const formatChatHistoryForGemini = (history: ChatMessage[]) => {
    // Gemini expects alternating user/model roles. We map Customer to user, Agent/AI to model.
    return history.map(msg => ({
        role: msg.sender === MessageSender.Customer ? 'user' : 'model',
        parts: [{ text: msg.text }]
    }));
};


export const generateAiReply = async (
    prompt: string, 
    chatHistory: ChatMessage[], 
    mode: AIMode
): Promise<{ text: string; suggestions?: string[] }> => {
    console.log(`Generating AI reply in ${mode} mode for prompt: "${prompt}"`);

    // Mocked responses for now
    if (!ai || !process.env.API_KEY) {
        console.log("Using MOCKED Gemini responses as API key is not configured or AI client failed to init.");
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        if (mode === AIMode.Auto) {
            if (prompt.toLowerCase().includes("ราคา") || prompt.toLowerCase().includes("price")) {
                return { text: "สินค้าราคา 500 บาทค่ะ" };
            } else if (prompt.toLowerCase().includes("มีของไหม") || prompt.toLowerCase().includes("available")) {
                return { text: "สินค้ามีพร้อมส่งค่ะ" };
            }
            return { text: `AI (Auto): ${prompt} - ขอบคุณที่สอบถามค่ะ` };
        } else if (mode === AIMode.SemiAuto) {
            return {
                text: `AI Suggestion 1: ${prompt} - ลองตอบแบบนี้นะคะ`,
                suggestions: [
                    `AI Suggestion 1: ${prompt} - ลองตอบแบบนี้นะคะ`,
                    `AI Suggestion 2: ${prompt} - หรืออาจจะตอบแบบนี้ก็ได้ค่ะ`,
                    `AI Suggestion 3: ${prompt} - อีกทางเลือกหนึ่งค่ะ`,
                ],
            };
        }
        return { text: "ไม่สามารถประมวลผลคำขอได้ในขณะนี้ (mock)" };
    }

    // Actual Gemini API call
    try {
        const contents = formatChatHistoryForGemini(chatHistory);
        contents.push({ role: 'user', parts: [{ text: prompt }] });
        
        // System instruction can be tailored based on the shop's persona
        const systemInstruction = "You are a friendly and helpful AI assistant for an online shop. Respond in Thai. Keep answers concise and helpful.";

        if (mode === AIMode.Auto || mode === AIMode.SemiAuto) {
             const result: GenerateContentResponse = await ai.models.generateContent({
                model: GEMINI_MODEL,
                contents: contents,
                config: {
                    systemInstruction: systemInstruction,
                    temperature: 0.7, // Adjust for creativity vs. factuality
                    // thinkingConfig: { thinkingBudget: 0 } // Disable thinking for lower latency if needed
                }
            });
            
            const responseText = result.text;

            if (mode === AIMode.Auto) {
                return { text: responseText };
            } else { // SemiAuto
                // For semi-auto, we might want to generate a few suggestions.
                // This could be done by calling the API multiple times with slight variations or asking for multiple options in one prompt if supported.
                // For simplicity here, we'll return the first response and mock additional ones.
                return {
                    text: responseText, // Main suggestion
                    suggestions: [
                        responseText,
                        "อีกทางเลือก: " + responseText.substring(0,20) + "...", // Mocked variation
                        "ลองดู: " + responseText.substring(0,15) + "..." // Mocked variation
                    ]
                };
            }
        }
        return { text: "AI mode not handled for actual API call yet." };

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        // Fallback to a mock error response
        return { text: "ขออภัยค่ะ ระบบ AI ขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้ง (API Error)" };
    }
};
