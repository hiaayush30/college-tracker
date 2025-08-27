import { Router } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';

export const geminiRouter = Router();

async function getS3FileAsBase64(s3Url:string) {
  try {
    const response = await axios.get(s3Url, {
      responseType: 'arraybuffer'
    });
    const fileBuffer = Buffer.from(response.data, 'binary');
    return fileBuffer.toString('base64');
  } catch (error) {
    console.error('Error fetching file from S3:', error);
    throw new Error('Failed to retrieve file from S3.');
  }
}

geminiRouter.post('/process-assignment', async (req, res) => {
  const { s3Url, prompt } = req.body;

  if (!s3Url || !prompt) {
    return res.status(400).json({ error: 'S3 URL and prompt are required.' });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const fileBase64 = await getS3FileAsBase64(s3Url);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

    const result = await model.generateContent([
      { text: prompt },
      { inlineData: { data: fileBase64, mimeType: 'application/pdf' } }
    ]);

    const response = await result.response;
    const textResponse = response.text();

    res.json({ result: textResponse });
  } catch (error) {
    console.error('Gemini API call failed:', error);
    res.status(500).json({ error: 'Failed to process assignment with AI.' });
  }
});