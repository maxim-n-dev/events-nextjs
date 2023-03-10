import fs from 'fs';

function handler(req, res) {
  if(req.method === 'POST') {
    // const email = req.body.email;
    // const feedback = req.body.feedback;
    const { email, enteredFeedback } = req.body;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: enteredFeedback
    }

    // store that in a database or in a file
    const filePath = path.join(process.cwd(), 'data', 'feedback.json');
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(200).json({message: 'Success!', feedback: newFeedback });
  } else {
    res.status(200).json({ok: true, message: 'This works!'});
  }

}

export default handler;