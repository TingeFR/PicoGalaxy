// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const aws = require('@aws-sdk/client-ses');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaultProvider } = require('@aws-sdk/credential-provider-node');

const ses = new aws.SES({
  apiVersion: '2010-12-01',
  region: 'eu-west-3',
  defaultProvider,
});

// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
  SES: { ses, aws },
});

export const sendEmail = (
  recettes: string[],
  courses: string[],
  timestamp: Date,
) => {
  const recipientEmail = 'monster44000@gmail.com';
  transporter.sendMail(
    {
      from: '"PicoGalaxy" noreply@picogalaxy.net',
      to: recipientEmail,
      subject: 'Menus de la semaine',
      text: `Envoyés sur Notion avec ❤️ par la meilleure API du monde le ${timestamp.toLocaleString()}`,
      attachments: [
        {
          filename: 'recettes.txt',
          content: recettes.join('\n'),
        },
        {
          filename: 'courses.txt',
          content: courses.join('\n'),
        },
      ],
    },
    (err, info) => {
      console.log(`Email sent to ${recipientEmail}`);
    },
  );
};
