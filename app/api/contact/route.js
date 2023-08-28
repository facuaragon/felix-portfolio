import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
export async function POST(request, res) {
  const { name, email, phone, message } = await request.json();
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: "facundo_aragon@hotmail.com",
      subject: `${name} te ha contactado desde tu Portfolio Personal`,
      html: `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
          }

          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f7f7f7;
          }

          p {
              margin-bottom: 10px;
          }

          .message {
              font-weight: bold;
              margin-top: 20px;
          }

          .banner {
            max-width: 600px;
            margin: 0 auto;
            padding: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color:  #ccc;
          }
          .datos {
              max-width: 600px;
            margin: 0 auto;
            padding: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: white;

          }
          .titulo {
              font-family: Helvetica, sans-serif;
              color:#000
          }

        </style>
      </head>
      <body>
        <div class="container">
          <div class="banner">
              <h1 class="titulo">PORTFOLIO PERSONAL</h1>
          </div>
          <p>Full Name: ${name}</p>
          <p>Email: ${email}</p>
          <p>Phone: ${phone}</p>
          <p>Message:</p>
          <div class="datos">
              <p class="message">${message}</p>
          </div>
        </div>
      </body>
    </html>
    `,
    });
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 500 });
  }
  return NextResponse.json({ message: "Message Sent" }, { status: 200 });
}
