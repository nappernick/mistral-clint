import React from 'react';
import ChatBox from './components/ChatBox';
import Embeddings from './components/Embeddings';
import { CssBaseline, Container } from '@mui/material';

function App() {
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <ChatBox />
      <Embeddings />
    </Container>
  );
}

export default App;
