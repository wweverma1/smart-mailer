require('dotenv').config()

const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------ OpenAI ------------
async function getMailBody(subject) {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Write an email for "+subject,
      temperature: 0.3,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return completion.data.choices[0].text;
  } catch (error) {
    console.log(error);
  }
}
// ------------ OpenAI ------------

app.get('/', (req, res) => {
  console.log("=> home endpoint was hit");
  res.send('Welcome to SmartMailer Server');
});

app.post('/getBody', async (req, res) => {
    console.log("=> getBody endpoint was hit with request body-\n", req.body);
    if (!req.body.subject) {
        return res.status(400).json({"message": "Invalid Subject"});
    }
    
    const mailBody = await getMailBody(req.body.subject);

    if(!mailBody) {
      return res.status(400).json({"message": "Error from OpenAI server"});
    }

    return res.status(200).json({"mailBody": mailBody});
})

app.listen(process.env.PORT || port, () => console.log(`Express app listening at http:://localhost:${port}`));