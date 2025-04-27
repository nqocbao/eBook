import { Request, Response } from "express";
import axios from "axios";
import fs from "fs";
const speech = require('@google-cloud/speech');

import dotenv from "dotenv";
dotenv.config();

// [POST] /tts
// [POST] /tts
export const getAudio = async (req: Request, res: Response) => {
    const text = req.body.text;
    const language = req.body.language || 'vi-VN';
    const gender = req.body.gender?.toUpperCase() === 'FEMALE' ? 'FEMALE' : 'MALE';
    const apiKey = process.env.GOOGLE_KEY;

    // Dùng endpoint v1beta1
    const voicesEndpoint = `https://texttospeech.googleapis.com/v1beta1/voices?key=${apiKey}`;

    try {
        // Lấy danh sách các voice từ v1beta1
        const voicesRes = await axios.get(voicesEndpoint);
        const voices = voicesRes.data.voices;

        // Lọc giọng theo ngôn ngữ và giới tính
        const matchedVoice = voices.find(v =>
            v.languageCodes.includes(language) && v.ssmlGender === gender
        );

        if (!matchedVoice) {
            return res.status(400).json({ error: "Không tìm thấy giọng đọc phù hợp." });
        }

        // Gửi request synthesize từ v1beta1
        const synthesizeEndpoint = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${apiKey}`;
        const payload = {
            audioConfig: {
                audioEncoding: "MP3",
                effectsProfileId: ["small-bluetooth-speaker-class-device"],
                pitch: 0,
                speakingRate: 1
            },
            input: { text },
            voice: {
                languageCode: language,
                name: matchedVoice.name
            }
        };

        const response = await axios.post(synthesizeEndpoint, payload);
        res.json(response.data);
    } catch (error: any) {
        console.error("Lỗi khi gọi API Google TTS:", error.response?.data || error.message);
        res.status(500).json({ error: "Google TTS API thất bại" });
    }
};
