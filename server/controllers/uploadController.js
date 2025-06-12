const fs = require('fs');
const pdfParse = require('pdf-parse');

const uploadResume = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const filePath = req.file.path;
  const fileName = req.file.filename;

  try {
    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse(buffer);

    // Schedule deletion after 1 hour
    setTimeout(() => {
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Error deleting ${filePath}:`, err);
        else console.log(`Deleted file: ${filePath}`);
      });
    }, 60 * 60 * 1000);

    res.json({
      message: 'File uploaded and parsed successfully',
      filename: fileName,
      text: data.text,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to parse PDF' });
  }
};

module.exports = { uploadResume };
