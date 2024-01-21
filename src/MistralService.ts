// src/MistralService.ts
import MistralClient, { EmbeddingResponse } from '@mistralai/mistralai';

const apiKey = process.env.REACT_APP_MISTRAL_API_KEY;
if (!apiKey) {
  throw new Error('REACT_APP_MISTRAL_API_KEY is not set in the environment variables');
}
const client = new MistralClient(apiKey);

export const generateText = async (prompt: string): Promise<string> => {
  try {
    const response = await client.chat({
      model: 'mistral-medium',
      messages: [{ role: 'user', content: prompt }],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error while calling Mistral AI API', error);
    throw error;
  }
};

export const getEmbeddings = async (input: string | string[]): Promise<EmbeddingResponse> => {
  try {
    const response = await client.embeddings({
      model: 'mistral-embed',
      input: input,
    });
    return response;
  } catch (error) {
    console.error('Error while calling Mistral AI API for embeddings', error);
    throw error;
  }
};
