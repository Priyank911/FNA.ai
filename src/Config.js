import { createChatBotMessage } from 'react-chatbot-kit';
import { ChatBubbleOutline } from '@mui/icons-material';

const config = {
  botName: "GeminiBot",
  initialMessages: [
    createChatBotMessage("Hello, I am GeminiBot! How can I help you today?"),
  ],
  customComponents: {
    botAvatar: (props) => <ChatBubbleOutline style={{ color: "#4caf50" }} />,
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: "#4caf50",
    },
    chatButton: {
      backgroundColor: "#4caf50",
    },
  },
};

export default config;
