import express from "express";
import { EmailParams, MailerSend } from "mailersend";
import cors from "cors";
import { env } from "process";
const app = express();
const port = env.PORT ?? 3000;

const mailerSend = new MailerSend({
  apiKey:
    "mlsn.4cbaa1dd3d19e68a2b6369d55bf5e50d0dde28ee071f097347b76da8dafb04a8",
});

app.use(cors());
app.use(express.json());

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
