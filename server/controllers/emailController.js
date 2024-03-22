const mg = require('../config/mailgun');

// Function to send an email
exports.sendEmail = async (to, subject, text, html) => {
  try {
    // Compose email message
    const data = {
      from: 'your_sender_email',
      to,
      subject,
      text,
      html,
    };

    // Send email
    await mg.messages().send(data);

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
