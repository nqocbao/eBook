// import say from "say";

// const books = [
//     { id: 1, title: 'Dế Mèn Phiêu Lưu Ký', content: 'Hello World' },
//     { id: 2, title: 'Tắt Đèn', content: 'Chị Dậu run rẩy bước ra khỏi nhà...' }
// ];

// const gTTS = require('node-gtts')('vi'); // vi = Vietnamese
// const path = require('path');

// const filePath = path.join(__dirname, 'output.mp3');
// gTTS.save(filePath, 'Xin chào, tôi là trình đọc màn hình.', () => {
//   console.log('Audio đã lưu. Đang phát...');
//   require('child_process').exec(`start ${filePath}`); // Windows: mở file
// });

// import fs from 'fs';
// import path from 'path';
// import { exec } from 'child_process';
// import axios from "axios";

// app.post('/api/tts', async (req: Request, res: Response) => {
//     const text = req.body.text;
//     const apiKey = "AIzaSyDrIlFfF5Qx3kWIGqvTVv76gGYeWm18N-0";
//     const endpoint = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${apiKey}`;

//     const payload = {
//         audioConfig: {
//             audioEncoding: "MP3",
//             effectsProfileId: ["small-bluetooth-speaker-class-device"],
//             pitch: 0,
//             speakingRate: 1
//         },
//         input: {
//             text: text
//         },
//         voice: {
//             languageCode: "en-US",
//             name: "en-US-Chirp3-HD-Achernar"
//         }
//     };

//     try {
//         const response = await axios.post(endpoint, payload);
//         const audioContent = response.data.audioContent;

//         if (!audioContent) {
//             res.status(500).json({ error: "No audio content received" });
//             return;
//         }

//         // 🧠 Lưu file MP3 tạm thời
//         const outputPath = path.join(__dirname, 'output.mp3');
//         fs.writeFileSync(outputPath, audioContent, 'base64');
//         console.log("✅ Audio saved to:", outputPath);

//         // 🔊 Phát âm thanh (tùy hệ điều hành)
//         const command = process.platform === "win32"
//             ? `start ${outputPath}`              // Windows
//             : process.platform === "darwin"
//                 ? `afplay ${outputPath}`         // macOS
//                 : `mpg123 ${outputPath}`;        // Linux

//         exec(command, (err) => {
//             if (err) {
//                 console.error("❌ Failed to play sound:", err.message);
//             } else {
//                 console.log("🔊 Audio is playing...");
//             }
//         });

//         res.json({ success: true, message: "Audio played" });

//     } catch (error: any) {
//         console.error("❌ TTS API error:", error.message);
//         res.status(500).json({ error: "Google TTS API failed" });
//     }
// });
import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// [POST] /tts
export const getAudio = async (req: Request, res: Response) => {
    const text = req.body.text;
    const apiKey = process.env.GOOGLE_KEY;
    const endpoint = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${apiKey}`;
    const payload = {
        "audioConfig": {
          "audioEncoding": "MP3",
          "effectsProfileId": [
            "small-bluetooth-speaker-class-device"
          ],
          "pitch": 0,
          "speakingRate": 1
        },
        "input": {
          "text": text
        },
        "voice": {
          "languageCode": "en-US",
          "name": "en-US-Chirp3-HD-Achernar"
        }
    }

    // try {
        const response = await axios.post(endpoint, payload);
        res.json(response.data);
    // } catch (error: any) {
    //     console.error("Error calling Google API:", error.response?.data || error.message);
    //     res.status(500).json({ error: "Google TTS API failed" });
    // }
}