import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { getEmbeddings } from '../MistralService';

const Embeddings: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [embeddings, setEmbeddings] = useState<number[][] | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    if (!inputText.trim()) return;
    try {
      const response = await getEmbeddings(inputText);
      setEmbeddings(response.data.map((embedding) => embedding.embedding));
      setInputText(''); // Clear the input after submission
    } catch (error) {
      console.error('Error while fetching embeddings from Mistral AI:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
      <Typography variant="h4" sx={{ my: 4 }}>Mistral AI Embeddings</Typography>
      <TextField
        fullWidth
        label="Enter your text"
        value={inputText}
        onChange={handleInputChange}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Get Embeddings
      </Button>
      {embeddings && (
        <Typography sx={{ mt: 2 }}>Embeddings: {JSON.stringify(embeddings)}</Typography>
      )}
    </Box>
  );
};

export default Embeddings;
