const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initialize();
  }

  initialize() {
    // Create reusable transporter using Gmail SMTP
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,     // Your Gmail address
        pass: process.env.EMAIL_PASSWORD  // Your Gmail App Password
      }
    });

    // Verify connection configuration
    this.transporter.verify((error, success) => {
      if (error) {
        console.error('[EmailService] ✗ Email service configuration error:', error.message);
        console.log('[EmailService] ⚠️  Email sending will fail. Please configure EMAIL_USER and EMAIL_PASSWORD in .env');
      } else {
        console.log('[EmailService] ✓ Email service ready to send messages');
      }
    });
  }

  /**
   * Send welcome email to newly registered student
   */
  async sendWelcomeEmail(studentData) {
    const { fullName, email, department, studentId, enrollmentYear } = studentData;

    const mailOptions = {
      from: {
        name: 'EduConnect Student Management',
        address: process.env.EMAIL_USER
      },
      to: email,
      subject: `Welcome to EduConnect - ${department}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #667eea; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
            .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
            h1 { margin: 0; font-size: 28px; }
            h2 { color: #667eea; margin-top: 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 Welcome to EduConnect!</h1>
              <p>Your journey in higher education begins here</p>
            </div>
            <div class="content">
              <h2>Hello ${fullName}! 👋</h2>
              <p>Congratulations on your enrollment at EduConnect University! We're thrilled to have you join our academic community.</p>
              
              <div class="info-box">
                <h3>📋 Your Registration Details</h3>
                <p><strong>Student ID:</strong> ${studentId}</p>
                <p><strong>Full Name:</strong> ${fullName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Department:</strong> ${department}</p>
                <p><strong>Enrollment Year:</strong> ${enrollmentYear}</p>
              </div>

              <h3>🚀 Next Steps:</h3>
              <ul>
                <li>Check your student portal for course registration</li>
                <li>Download the EduConnect mobile app</li>
                <li>Join your department's orientation session</li>
                <li>Connect with your academic advisor</li>
              </ul>

              <p><strong>Important:</strong> Please save this email for your records. Your Student ID (${studentId}) will be required for all university services.</p>

              <center>
                <a href="http://localhost:3000/" class="button">Access Student Portal</a>
              </center>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} EduConnect University. All rights reserved.</p>
              <p>This is an automated message. Please do not reply to this email.</p>
              <p>Questions? Contact us at support@educonnect.edu</p>
            </div>
          </div>
        </body>
        </html>
      `,
      // Plain text version for email clients that don't support HTML
      text: `
Welcome to EduConnect, ${fullName}!

Congratulations on your enrollment at EduConnect University!

Your Registration Details:
- Student ID: ${studentId}
- Full Name: ${fullName}
- Email: ${email}
- Department: ${department}
- Enrollment Year: ${enrollmentYear}

Next Steps:
- Check your student portal for course registration
- Download the EduConnect mobile app
- Join your department's orientation session
- Connect with your academic advisor

Important: Please save this email for your records. Your Student ID (${studentId}) will be required for all university services.

© ${new Date().getFullYear()} EduConnect University. All rights reserved.
Questions? Contact us at support@educonnect.edu
      `
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`[EmailService] ✓ Welcome email sent successfully to ${email}`);
      console.log(`[EmailService] Message ID: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error(`[EmailService] ✗ Failed to send email to ${email}:`, error.message);
      throw error;
    }
  }

  /**
   * Send update notification email
   */
  async sendUpdateNotification(studentData, updatedFields) {
    const { fullName, email, studentId } = studentData;

    const mailOptions = {
      from: {
        name: 'EduConnect Student Management',
        address: process.env.EMAIL_USER
      },
      to: email,
      subject: 'Profile Update Notification - EduConnect',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #667eea; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #ffa500; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📝 Profile Update Notification</h2>
            </div>
            <div class="content">
              <p>Hello ${fullName},</p>
              <p>Your student profile has been updated successfully.</p>
              
              <div class="info-box">
                <p><strong>Student ID:</strong> ${studentId}</p>
                <p><strong>Updated Fields:</strong> ${updatedFields.join(', ')}</p>
                <p><strong>Updated At:</strong> ${new Date().toLocaleString()}</p>
              </div>

              <p>If you did not authorize this change, please contact the administration immediately.</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} EduConnect University</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hello ${fullName},

Your student profile has been updated successfully.

Student ID: ${studentId}
Updated Fields: ${updatedFields.join(', ')}
Updated At: ${new Date().toLocaleString()}

If you did not authorize this change, please contact the administration immediately.

© ${new Date().getFullYear()} EduConnect University
      `
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`[EmailService] ✓ Update notification sent to ${email}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error(`[EmailService] ✗ Failed to send update notification to ${email}:`, error.message);
      throw error;
    }
  }
}

// Export singleton instance
module.exports = new EmailService();