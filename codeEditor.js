const axios = require('axios');
const ContextManager = require('./contextManager');

class CodeEditor {
  constructor() {
    this.contextManager = new ContextManager();
    this.languageModelAPI = 'https://api.openai.com/v1/engines/davinci-codex/completions'; // Replace with your actual API endpoint
  }

  async generateCodeEdits(name, block) {
    const spatialContext = await this.contextManager.gatherSpatialContext(name, block);
    const temporalContext = await this.contextManager.gatherTemporalContext(name, block);
    const linearContext = await this.contextManager.linearizeContext(spatialContext, temporalContext);

    const prompt = this.createPrompt(linearContext);
    const codeEdits = await this.requestCodeEdits(prompt);

    return codeEdits;
  }

  createPrompt(linearContext) {
    let prompt = '';
    for (const block in linearContext) {
      prompt += `Block: ${block}\nSpatial Context: ${linearContext[block].spatial}\nTemporal Context: ${linearContext[block].temporal}\n`;
    }
    return prompt;
  }

  async requestCodeEdits(prompt) {
    const response = await axios.post(this.languageModelAPI, {
      prompt: prompt,
      max_tokens: 200, // Adjust as needed
      temperature: 0.5, // Adjust as needed
    }, {
      headers: {
        'Authorization': `Bearer YOUR_OPENAI_API_KEY`, // Replace with your actual API key
        'Content-Type': 'application/json'
      }
    });

    if (response.data && response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].text.trim();
    } else {
      throw new Error('Failed to generate code edits');
    }
  }
}

module.exports = CodeEditor;
