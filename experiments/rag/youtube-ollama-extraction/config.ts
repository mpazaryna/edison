// Configuration for YouTube Ollama Extraction

// Ollama API settings
export const baseUrl = "http://localhost:11434";
//export const modelName = "llama3.2";
export const modelName = "qwen2.5:7b"

// Additional configuration options can be added here
export const config = {
  // Maximum chunk size for transcript processing (in characters)
  maxChunkSize: 6000,
  
  // Prompt templates directory
  promptsDir: "./prompts",
  
  // Maximum filename length
  maxFilenameLength: 100
};
