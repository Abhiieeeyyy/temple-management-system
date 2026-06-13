import nodemailer from 'nodemailer';

// Configure SMTP transporter
// Note: For Gmail, EMAIL_PASS must be an App Password, not the personal login password.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || ''
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify SMTP connection on startup
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter.verify((error, success) => {
    if (error) {
      console.error('❌ Nodemailer transporter verification failed:', error.message);
    } else {
      console.log('📧 Nodemailer SMTP connection verified successfully - ready to send emails');
    }
  });
} else {
  console.warn('⚠️  Nodemailer: EMAIL_USER and EMAIL_PASS environment variables are not configured.');
}

/**
 * Sends an email notification to the temple when a pooja is booked.
 * @param {Object} booking - The saved booking document
 */
export const sendBookingNotification = async (booking) => {
  if (booking.paymentStatus !== 'paid') {
    console.log(`ℹ️  Skipping booking email notification because paymentStatus is '${booking.paymentStatus}' (not 'paid')`);
    return;
  }

  const templeEmail = process.env.TEMPLE_EMAIL || 'srikainariayyappatemple@gmail.com';
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.warn('⚠️  Email credentials missing (EMAIL_USER/EMAIL_PASS). Skipping booking email notification.');
    return;
  }

  const formattedDate = booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A';
  const price = booking.price !== undefined ? `₹${booking.price}` : 'N/A';

  const mailOptions = {
    from: emailUser,
    to: templeEmail,
    subject: `🔔 New Pooja Booking Alert - ${booking.poojaName || 'Pooja'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <h2 style="color: #962814; text-align: center; border-bottom: 2px solid #962814; padding-bottom: 10px;">
          Sri Kainari Ayyappan Kavu
        </h2>
        <h3 style="color: #333; margin-top: 20px;">New Pooja Booking Received</h3>
        <p style="color: #666; line-height: 1.5;">
          A new devotee booking has been recorded on the temple website. Below are the details:
        </p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; width: 35%;">Devotee Name</td>
            <td style="padding: 10px; border: 1px solid #eee;">${booking.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #eee; font-weight: bold;">Birth Star</td>
            <td style="padding: 10px; border: 1px solid #eee;">${booking.birthStar || 'N/A'}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #eee; font-weight: bold;">Mobile Number</td>
            <td style="padding: 10px; border: 1px solid #eee;">${booking.mobileNumber || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #eee; font-weight: bold;">Pooja booked</td>
            <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; color: #962814;">${booking.poojaName || 'Pooja'}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #eee; font-weight: bold;">Performance Date</td>
            <td style="padding: 10px; border: 1px solid #eee;">${formattedDate}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #eee; font-weight: bold;">Amount Paid</td>
            <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; color: #2e7d32;">${price}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #eee; font-weight: bold;">Payment ID</td>
            <td style="padding: 10px; border: 1px solid #eee; font-family: monospace;">${booking.paymentId || 'N/A'}</td>
          </tr>
        </table>
        <p style="margin-top: 25px; text-align: center; color: #888; font-size: 12px; border-top: 1px solid #eee; padding-top: 15px;">
          This is an automated notification. Please access the website Admin Panel to view all booking records.
        </p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Booking notification email sent successfully:', info.response);
  } catch (error) {
    console.error('❌ Failed to send booking notification email:', error.message);
  }
};

/**
 * Sends an email notification to the temple when a donation is received.
 * @param {Object} donation - The saved donation document
 */
export const sendDonationNotification = async (donation) => {
  if (donation.status !== 'completed') {
    console.log(`ℹ️  Skipping donation email notification because status is '${donation.status}' (not 'completed')`);
    return;
  }

  const templeEmail = process.env.TEMPLE_EMAIL || 'srikainariayyappatemple@gmail.com';
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.warn('⚠️  Email credentials missing (EMAIL_USER/EMAIL_PASS). Skipping donation email notification.');
    return;
  }

  const amount = donation.amount !== undefined ? `₹${donation.amount}` : 'N/A';

  const mailOptions = {
    from: emailUser,
    to: templeEmail,
    subject: `💖 New Temple Donation Alert - ${amount}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <h2 style="color: #962814; text-align: center; border-bottom: 2px solid #962814; padding-bottom: 10px;">
          Sri Kainari Ayyappan Kavu
        </h2>
        <h3 style="color: #333; margin-top: 20px; text-align: center;">New Donation Received</h3>
        <p style="color: #666; line-height: 1.5;">
          A new donation has been successfully contributed on the temple website. Below are the details:
        </p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; width: 35%;">Donor Name</td>
            <td style="padding: 10px; border: 1px solid #eee;">${donation.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #eee; font-weight: bold;">Phone Number</td>
            <td style="padding: 10px; border: 1px solid #eee;">${donation.phoneNumber || 'N/A'}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #eee; font-weight: bold;">Seva Purpose</td>
            <td style="padding: 10px; border: 1px solid #eee; text-transform: uppercase;">${donation.purpose || 'GENERAL'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #eee; font-weight: bold;">Message</td>
            <td style="padding: 10px; border: 1px solid #eee; font-style: italic;">${donation.message || 'None'}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #eee; font-weight: bold;">Donated Amount</td>
            <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; color: #2e7d32; font-size: 16px;">${amount}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #eee; font-weight: bold;">Payment ID</td>
            <td style="padding: 10px; border: 1px solid #eee; font-family: monospace;">${donation.paymentId || 'N/A'}</td>
          </tr>
        </table>
        <p style="margin-top: 25px; text-align: center; color: #888; font-size: 12px; border-top: 1px solid #eee; padding-top: 15px;">
          This is an automated notification. Please access the website Admin Panel to view all donation records.
        </p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Donation notification email sent successfully:', info.response);
  } catch (error) {
    console.error('❌ Failed to send donation notification email:', error.message);
  }
};
