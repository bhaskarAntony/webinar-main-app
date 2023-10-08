const UserEmail = (name) => {
    return `
      <html>
        <head>
          <style>
            /* Add your inline CSS styles here */
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 10px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            .header {
              background-color: #007bff;
              color: #fff;
              text-align: center;
              padding: 10px;
              border-radius: 10px 10px 0 0;
            }
            .content {
              padding: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Our Webinar!</h1>
            </div>
            <div class="content">
              <p>Hello ${name},</p>
              <p>Thank you 👍 for registering for our webinar. We look forward to seeing you there.</p>
              <p>Event Details:</p>
              <ul>
                <li>Date: October 14, 2023</li>
                <li>Time: 9:00 AM - 2:00 PM</li>
                <li>Location: Be-Practical Tech Solutions</li>
              </ul>
              <p>Feel free to contact us if you have any questions or need further information.</p>
              <p>Best regards,<br>Your Webinar Team</p>
            </div>
          </div>
          <p class="footer">
            If you have any questions or need further assistance, please contact us at <b>Chandini.cv@be-practical.com</b>
        </p>
        </body>
      </html>
    `;
  };
  
  module.exports = UserEmail;
  