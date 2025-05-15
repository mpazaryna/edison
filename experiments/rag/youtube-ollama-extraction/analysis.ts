import { baseUrl, modelName, loadPrompt } from "./utils.ts";

// STAGE 1: Extract key entities from the transcript
export async function extractEntities(text: string): Promise<any> {
  try {
    console.log("Extracting key entities from transcript...");
    
    const promptTemplate = await loadPrompt("entity-extraction");
    const prompt = promptTemplate.replace("{transcript}", text);

    const response = await fetch(`${baseUrl}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelName,
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    try {
      // Find the JSON in the response
      const jsonMatch = data.response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return {};
    } catch (error) {
      console.error("Error parsing JSON from entity extraction:", error);
      return {};
    }
  } catch (error) {
    console.error("Error extracting entities:", error);
    return {};
  }
}

// STAGE 2: Extract key topics from the transcript
export async function extractTopics(text: string): Promise<string[]> {
  try {
    console.log("Extracting key topics from transcript...");
    
    const promptTemplate = await loadPrompt("topic-extraction");
    const prompt = promptTemplate.replace("{transcript}", text);

    const response = await fetch(`${baseUrl}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelName,
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    try {
      // Find the JSON array in the response
      const jsonMatch = data.response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return [];
    } catch (error) {
      console.error("Error parsing JSON from topic extraction:", error);
      return [];
    }
  } catch (error) {
    console.error("Error extracting topics:", error);
    return [];
  }
}

// STAGE 3: Extract notable quotes from the transcript
export async function extractQuotes(text: string): Promise<string[]> {
  try {
    console.log("Extracting notable quotes from transcript...");
    
    const promptTemplate = await loadPrompt("quote-extraction");
    const prompt = promptTemplate.replace("{transcript}", text);

    const response = await fetch(`${baseUrl}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelName,
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    try {
      // Find the JSON array in the response
      const jsonMatch = data.response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]);
        } catch (parseError) {
          console.error("Error parsing JSON from quote extraction:", parseError);
          // Return empty array instead of failing completely
          return [];
        }
      }
      return [];
    } catch (error) {
      console.error("Error parsing JSON from quote extraction:", error);
      return [];
    }
  } catch (error) {
    console.error("Error extracting quotes:", error);
    return [];
  }
}

// FINAL STAGE: Generate summary using extracted information
export async function generateSummary(transcript: string, entities: any, topics: string[], quotes: string[]): Promise<string> {
  try {
    console.log("Generating final summary...");
    
    // Create a simplified representation of the analysis to include in the prompt
    const analysisData = {
      host: entities.host_name || "The host",
      guest: entities.guest_name || "The guest",
      show_name: entities.show_name || "this show",
      locations: entities.locations || [],
      organizations: entities.organizations || [],
      key_people: entities.key_people || [],
      topics: topics,
      quotes: quotes
    };
    
    const promptTemplate = await loadPrompt("final-summary");
    const prompt = promptTemplate
      .replace("{analysis_data}", JSON.stringify(analysisData, null, 2))
      .replace("{transcript_preview}", transcript.substring(0, 2000));

    const response = await fetch(`${baseUrl}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelName,
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Failed to generate summary.";
  }
}
