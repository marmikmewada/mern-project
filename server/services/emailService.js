const mg = require('../config/mailgun');

// Service for sending emails using Mailgun
exports.sendEmail = async (to, subject, htmlContent) => {
  try {
    const data = {
      from: 'your_sender_email',
      to,
      subject,
      html: htmlContent,
    };
    await mg.messages().send(data);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
