import React, { useState } from 'react';
import { Box, TextField, Button, Typography, List, ListItem, CircularProgress } from '@mui/material';
import { generateText } from '../MistralService';

const ChatBox: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [responses, setResponses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true); // Set loading to true
    try {
      const response = await generateText(inputText);
      setResponses([...responses, response]);
    } catch (error) {
      console.error('Error while fetching from Mistral AI:', error);
    }
    setInputText(''); // Clear the input after submission
    setIsLoading(false); // Set loading to false
  };

  return (
    <Box sx={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
      <Typography variant="h4" sx={{ my: 4 }}>Mistral AI Chat</Typography>
      <TextField
        fullWidth
        label="Enter your message"
        value={inputText}
        onChange={handleInputChange}
        margin="normal"
        disabled={isLoading} // Disable input when loading
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isLoading}>
        Send
      </Button>
      {isLoading && <CircularProgress />} {/* Loading indicator */}
      <List sx={{ mt: 2 }}>
        {responses.map((response, index) => (
          <ListItem key={index}>{response}</ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChatBox;