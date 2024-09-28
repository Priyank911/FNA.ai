class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase();
  
      if (lowerCaseMessage.includes("hello")) {
        this.actionProvider.handleGreeting();
      } else if (lowerCaseMessage.includes("gemini")) {
        this.actionProvider.handleGeminiQuery(lowerCaseMessage);
      } else {
        this.actionProvider.handleGreeting(); // Default action
      }
    }
  }
  
  export default MessageParser;
  