const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");

const { getLLMResponse } = require("../services/llmService");

// Storage config
const upload = multer({ dest: "uploads/" });

// Upload + Analyze Resume
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const filePath = req.file.path;

    // Read PDF
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);

    const resumeText = pdfData.text;

    // Send to AI
    const prompt = `
You are a professional career coach.

Analyze this resume and provide:
1. Strengths
2. Weaknesses
3. Missing Skills
4. Suggestions for improvement

Resume:
${resumeText}
`;

    const feedback = await getLLMResponse(prompt);

    res.json({
      message: "Resume analyzed successfully",
      feedback,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error analyzing resume" });
  }
});

module.exports = router;