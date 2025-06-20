const fs = require('fs');
const pdfParse = require('pdf-parse');
const axios = require('axios');
const OLLAMA_API_URL = process.env.OLLAMA_PORT

const uploadResume = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const jobDescription = req.body.jobDescription;
  if (!jobDescription) return res.status(400).json({ error: 'Job Description is required' });

  const filePath = req.file.path;
  const fileName = req.file.filename;

  try {
    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse(buffer);
    const resumeText = data.text;

    // Prompt to send to LLaMA 3
    const prompt = `
You are a technical recruiter.

Compare the following resume and job description. Score how well the resume matches the job description (from 0 to 100) and explain your reasoning.

Resume:
${resumeText}

Job Description:
${jobDescription}

Respond in this format:
Score: XX
Reason: ...
    `;

    // Send to Ollama running llama3
    const llmResponse = await axios.post(OLLAMA_API_URL, {
      model: 'llama3',
      prompt: prompt,
      stream: false
    });

    const scoreOutput = llmResponse.data.response;

    // Schedule deletion of uploaded file after 1 hour
    setTimeout(() => {
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Error deleting ${filePath}:`, err);
        else console.log(`Deleted file: ${filePath}`);
      });
    }, 60 * 60 * 1000); // 1 hour

    res.json({
      message: 'Resume scored successfully',
      filename: fileName,
      score: scoreOutput
    });

  } catch (err) {
    console.error('Error processing resume:', err);
    res.status(500).json({ error: 'Failed to parse or score resume' });
  }
};

module.exports = { uploadResume };
