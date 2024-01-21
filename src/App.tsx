import React from 'react';
import ChatBox from './components/ChatBox';
import { CssBaseline, Container } from '@mui/material';

function App() {
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <ChatBox />
    </Container>
  );
}

export default App;