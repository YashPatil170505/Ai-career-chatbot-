const express = require("express");
const router = express.Router();
const { getLLMResponse } = require("../services/llmService");

router.post("/", async (req, res) => {
  try {
    const { skills, goal } = req.body;

    const prompt = `
You are an AI career advisor.

User Skills: ${skills}
Career Goal: ${goal}

Provide:
1. Best career options
2. Missing skills
3. Learning roadmap
4. Tools to learn
`;

    const response = await getLLMResponse(prompt);

    res.json({
      message: "Career guidance generated",
      response,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating career advice" });
  }
});

module.exports = router;