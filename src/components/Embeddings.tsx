import React, { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { getEmbeddings } from '../MistralService';

const Embeddings: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [embeddings, setEmbeddings] = useState<number[][] | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true); // Set loading to true
    try {
      const response = await getEmbeddings(inputText);
      setEmbeddings(response.data.map((embedding) => embedding.embedding));
    } catch (error) {
      console.error('Error while fetching embeddings from Mistral AI:', error);
    }
    setInputText(''); // Clear the input after submission
    setIsLoading(false); // Set loading to false
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
        disabled={isLoading} // Disable input when loading
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isLoading}>
        Get Embeddings
      </Button>
      {isLoading && <CircularProgress />} {/* Loading indicator */}
      {embeddings && (
        <Typography sx={{ mt: 2 }}>Embeddings: {JSON.stringify(embeddings)}</Typography>
      )}
    </Box>
  );
};

export default Embeddings;