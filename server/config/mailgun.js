const mailgun = require('mailgun-js');

// Initialize Mailgun client
const DOMAIN = 'your_mailgun_domain';
const mg = mailgun({ apiKey: 'your_mailgun_api_key', domain: DOMAIN });

module.exports = mg;
