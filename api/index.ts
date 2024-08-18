const express = require("express");
const { EmailParams, MailerSend } = require("mailersend");
const cors = require("cors");
const { env } = require("process");

const mailerSend = new MailerSend({
  apiKey:
    "mlsn.4cbaa1dd3d19e68a2b6369d55bf5e50d0dde28ee071f097347b76da8dafb04a8",
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Express on Vercel"));

app.post("/email", async (req, res) => {
  const emailParams = new EmailParams()
    .setFrom(req.body.from)
    .setTo(req.body.to)
    .setSubject(req.body.subject)
    .setText(req.body.text);
  console.log(req.body);

  await mailerSend.email
    .send(emailParams)
    .then(() => res.send("Ok"))
    .catch((d) => res.send("Oops, não foi possível enviar" + d));
});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
