const transporter = require('../middleware/transporter.js');

exports.sendEmail = (req, res) => {
    const { name, email, message, autoReply } = req.body; 
    const emailsset = 'arunalubamunusinghe75@gmail.com';
    const mailOptions = {
        from: process.env.EMAIL,
        to: emailsset,
        subject: 'New Message Notification',
        text: `Hello,

You got a new message from ${name} (${email}):
${message}

Best wishes,
Arunalu Web Team`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #0073e6;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            font-size: 16px;
            color: #333333;
        }
        .message {
            padding: 12px;
            border-left: 4px solid #0073e6;
            font-style: italic;
            background-color: #f9f9f9;
            margin: 20px 0;
        }
        .footer {
            background-color: #0073e6;
            color: #ffffff;
            padding: 10px;
            text-align: center;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            New Message Notification
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>You got a new message from ${name} (${email}):</p>
            <div class="message">
                ${message}
            </div>
            <p>Best wishes,<br>Arunalu Web Team</p>
        </div>
        <div class="footer">
            &copy; 2024 Arunalu Web Team
        </div>
    </div>
</body>
</html>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }

        if (autoReply) { // Ensure autoReply is passed from req.body
            const autoReplyOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Auto-reply: Thank you for your message',
                text: 'Thank you for reaching out. We have received your message and will get back to you shortly.',
                html: `
                    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio Reply</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
        }
        .container {
            max-width: 100%;
            margin: 40px auto;
            background-color: #ffffff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            overflow: hidden;
            transition: transform 0.3s ease;
        }
        .container:hover {
            transform: translateY(-5px);
        }
        .header {
            background-color: #007BFF;
            color: white;
            text-align: center;
            padding: 30px 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 30px 40px;
        }
        .content h1 {
            color: #333;
            font-size: 22px;
            margin-bottom: 20px;
        }
        .content p {
            line-height: 1.8;
            color: #555;
            font-size: 16px;
            margin-bottom: 20px;
        }
        .footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 20px 0;
            font-size: 14px;
            color: #777;
        }
        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 25px;
            background-color: #28a745;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            transition: background-color 0.3s ease;
        }
        .button:hover {
            background-color: #218838;
        }
        .contact-info {
            margin-top: 30px;
            text-align: left;
        }
        .contact-info p {
            margin: 8px 0;
            color: #666;
            font-size: 15px;
        }
        .contact-info a {
            color: #007BFF;
            text-decoration: none;
            font-weight: bold;
            transition: color 0.3s ease;
        }
        .contact-info a:hover {
            color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Thank You for Your Interest</h1>
        </div>
        <div class="content">
            <h1>Dear ${name},</h1>
            <p>Thank you for reaching out regarding my portfolio. I am thrilled to hear about your interest and would love to discuss how my skills and experiences can be a valuable addition to your team.</p>
            <p>My portfolio showcases a variety of projects that highlight my expertise in DevOps. I have included detailed descriptions and links to my work for your convenience. I hope you find them informative and engaging.</p>
            <p>Please feel free to contact me if you have any questions or would like to schedule a meeting. I am looking forward to the possibility of working together.</p>
            <a href="https://github.com/ArunaluB" class="button">View My Work</a>
            <div class="contact-details">
                <h2>Contact Details</h2>
                <p>Email: ${emailsset}</p>
                <p>Phone: +94772187484</p>
                <p>Address: 366/7, Pethiyagoda Road, Mulleriyawa New Town, Angoda</p>
                <p>LinkedIn: <a href="https://www.linkedin.com/in/arunalu-bamunusinghe" target="_blank">Arunalu Bamunusinghe</a></p>
            </div>
            </div>
        </div>
        <div class="footer">
            <p>&copy; 2024 Arunalu Bamunusinghe. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

                `
            };

            transporter.sendMail(autoReplyOptions, (error, info) => {
                if (error) {
                    return res.status(500).send(error.toString());
                }
                res.status(200).send('Email and auto-reply sent: ' + info.response);
            });
        } else {
            res.status(200).send('Email sent: ' + info.response);
        }
    });
};
