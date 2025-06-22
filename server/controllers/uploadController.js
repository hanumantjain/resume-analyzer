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

    // Prompt to send to mistral 
    const prompt = `
You are a senior technical recruiter evaluating the fit between a candidate's resume and a job description.

Evaluate based on the following five categories:
1. Technical Skills
2. Work Experience Relevance
3. Technology & Tool Familiarity
4. Soft Skills & Communication
5. Keyword and Terminology Overlap

Instructions:
- Assign a score out of 100 for overall fit.
- Include sub-scores (1–5) for each category.
- Highlight at least 5 **matching** and 5 **missing** key skills or keywords.
- Explain strengths and weaknesses in a detailed paragraph (~150 words).
- Conclude with actionable suggestions for improving the resume alignment.

Resume:
${resumeText}

Job Description:
${jobDescription}

Respond in this format:
Overall Score: XX

Sub-scores:
1. Technical Skills: X/20
2. Work Experience Relevance: X/20
3. Technology & Tool Familiarity: X/20
4. Soft Skills & Communication: X/20
5. Keyword and Terminology Overlap: X/20

Matching Keywords: [...]
Missing Keywords: [...]

Reasoning:
<detailed paragraph>

Suggestions:
- <tip 1>
- <tip 2>
- ...
`;



    // Send to Ollama running mistral
    const llmResponse = await axios.post(OLLAMA_API_URL, {
      model: 'gemma:2b',
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
