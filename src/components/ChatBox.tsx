import React, { useState } from 'react';
import { Box, TextField, Button, Typography, List, ListItem } from '@mui/material';
import { generateText } from '../MistralService';

const ChatBox: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [responses, setResponses] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    if (!inputText.trim()) return;
    try {
      const response = await generateText(inputText);
      setResponses([...responses, response]);
      setInputText(''); // Clear the input after submission
    } catch (error) {
      console.error('Error while fetching from Mistral AI:', error);
    }
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
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Send
      </Button>
      <List sx={{ mt: 2 }}>
        {responses.map((response, index) => (
          <ListItem key={index}>{response}</ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChatBox;
