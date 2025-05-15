import { 
  checkRequiredTools, 
  sanitizeFilename, 
  startSpinner, 
  splitTranscript,
  extractVideoId
} from "./utils.ts";

import {
  fetchTranscriptWithYtDlp,
  fetchVideoTitle
} from "./transcript-extractor.ts";

import {
  extractEntities,
  extractTopics,
  extractQuotes,
  generateSummary
} from "./analysis.ts";

// Main function
async function main() {
  // Check for command line arguments
  if (Deno.args.length < 1) {
    console.error("Please provide a YouTube URL as an argument");
    Deno.exit(1);
  }
  
  const youtubeUrl = Deno.args[0];
  const videoId = extractVideoId(youtubeUrl);
  
  if (!videoId) {
    console.error("Invalid YouTube URL");
    Deno.exit(1);
  }
  
  // Check for required tools
  await checkRequiredTools();
  
  // Fetch video title
  const videoTitle = await fetchVideoTitle(videoId);
  console.log(`Processing video: ${videoTitle}`);
  
  // Fetch transcript
  const transcript = await fetchTranscriptWithYtDlp(videoId);
  
  if (!transcript || transcript.includes("Failed to extract transcript")) {
    console.error("Could not extract transcript. Please check the URL and try again.");
    Deno.exit(1);
  }
  
  console.log(`Transcript length: ${transcript.length} characters`);
  
  // Start spinner for processing indication
  const spinner = startSpinner();
  
  // Split transcript into manageable chunks
  const chunks = splitTranscript(transcript);
  console.log(`Split transcript into ${chunks.length} chunks for processing`);
  
  // Process first chunk for entity extraction
  const entities = await extractEntities(chunks[0]);
  
  // Process all chunks for topics and quotes
  let allTopics: string[] = [];
  let allQuotes: string[] = [];
  
  for (const chunk of chunks) {
    const chunkTopics = await extractTopics(chunk);
    const chunkQuotes = await extractQuotes(chunk);
    
    allTopics = [...allTopics, ...chunkTopics];
    allQuotes = [...allQuotes, ...chunkQuotes];
  }
  
  // Remove duplicates
  allTopics = [...new Set(allTopics)];
  allQuotes = [...new Set(allQuotes)];
  
  // Stop spinner
  clearInterval(spinner);
  Deno.stdout.writeSync(new TextEncoder().encode("\r                      \r"));
  
  // Generate final summary
  const summary = await generateSummary(transcript, entities, allTopics, allQuotes);
  
  // Create output file
  const sanitizedTitle = sanitizeFilename(videoTitle);
  const outputFile = `${sanitizedTitle}-summary.md`;
  
  // Write summary to file
  await Deno.writeTextFile(outputFile, summary);
  
  console.log(`\n✅ Summary saved to ${outputFile}`);
}

// Run the main function
main();
