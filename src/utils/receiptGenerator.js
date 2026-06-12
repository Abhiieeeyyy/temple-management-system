import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Helper to convert image URL to base64
const getBase64ImageFromUrl = async (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/jpeg');
      resolve(dataURL);
    };
    img.onerror = (error) => {
      reject(error);
    };
    img.src = url;
  });
};

/**
 * Generates and downloads a PDF receipt for Pooja Booking or Donation.
 * @param {string} type - 'booking' or 'donation'
 * @param {Object} details - receipt data
 */
export const generateReceiptPDF = async (type, details) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Load logo image
  let logoData = null;
  try {
    logoData = await getBase64ImageFromUrl('/images/temple9.jpg');
  } catch (error) {
    console.error('Error loading logo for receipt:', error);
  }

  // Draw elegant double border around page
  doc.setDrawColor(220, 150, 50); // Gold accent border
  doc.setLineWidth(0.5);
  doc.rect(5, 5, 200, 287); // outer border
  doc.rect(6, 6, 198, 285); // inner border

  // Header Logo
  let textStartX = 14;
  if (logoData) {
    doc.addImage(logoData, 'JPEG', 14, 12, 22, 22);
    textStartX = 40; // Shift text start right to clear logo
  }

  // Header Details
  doc.setTextColor(150, 40, 20); // Deep crimson/maroon for Temple Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('SRI KAINARI AYYAPPAN KAVU', textStartX, 18);

  doc.setTextColor(80, 80, 80);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Sri Kainari Ayyappan Kavu Temple, Valamkulam PO, Kerala, India', textStartX, 24);
  doc.text('Email: srikainariayyappatemple@gmail.com | Mobile: +91 9895922357', textStartX, 29);

  // Decorative divider line
  doc.setDrawColor(150, 40, 20);
  doc.setLineWidth(0.8);
  doc.line(14, 38, 196, 38);

  // Receipt Title
  doc.setTextColor(150, 40, 20);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(type === 'donation' ? 'DONATION RECEIPT' : 'POOJA BOOKING RECEIPT', 14, 46);

  // Meta Info: Date and Receipt No
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Receipt Date: ${new Date().toLocaleDateString()}`, 14, 53);

  const receiptNo = details.paymentId ? `REC-${details.paymentId.substring(4, 12).toUpperCase()}` : `REC-${Date.now().toString().slice(-8)}`;
  doc.text(`Receipt No: ${receiptNo}`, 140, 53);

  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.2);
  doc.line(14, 56, 196, 56);

  // Prepare autoTable columns and rows
  const tableData = [];
  if (type === 'donation') {
    tableData.push(
      { field: 'Devotee Name', value: details.name },
      { field: 'Phone Number', value: details.phoneNumber || 'N/A' },
      { field: 'Purpose of Donation', value: details.purpose ? details.purpose.toUpperCase() : 'GENERAL' },
      { field: 'Message', value: details.message || 'N/A' },
      { field: 'Razorpay Payment ID', value: details.paymentId || 'N/A' },
      { field: 'Payment Status', value: 'COMPLETED (PAID)' },
      { field: 'Donation Amount', value: `INR ${details.amount}/-` }
    );
  } else {
    // booking
    // For single booking
    if (details.poojaName) {
      tableData.push(
        { field: 'Devotee Name', value: details.name },
        { field: 'Birth Star', value: details.birthStar || 'N/A' },
        { field: 'Phone Number', value: details.mobileNumber || 'N/A' },
        { field: 'Pooja Name', value: details.poojaName },
        { field: 'Pooja Date', value: details.date ? new Date(details.date).toLocaleDateString() : 'N/A' },
        { field: 'Razorpay Payment ID', value: details.paymentId || 'N/A' },
        { field: 'Payment Status', value: 'COMPLETED (PAID)' },
        { field: 'Pooja Price', value: `INR ${details.price}/-` }
      );
    } else if (details.cartItems) {
      // Multiple bookings from cart
      tableData.push(
        { field: 'Devotee Name', value: details.name || 'Devotee' },
        { field: 'Razorpay Payment ID', value: details.paymentId || 'N/A' },
        { field: 'Payment Status', value: 'COMPLETED (PAID)' }
      );

      details.cartItems.forEach((item, idx) => {
        tableData.push({
          field: `Booking #${idx + 1}`,
          value: `${item.poojaName} for ${item.name} (${item.birthStar}) on ${new Date(item.date).toLocaleDateString()} - INR ${item.price}/-`
        });
      });

      tableData.push({
        field: 'Total Amount Paid',
        value: `INR ${details.totalPrice}/-`
      });
    }
  }

  // Generate Table
  autoTable(doc, {
    startY: 61,
    margin: { left: 14, right: 14 },
    body: tableData,
    columns: [
      { header: 'Detail Field', dataKey: 'field' },
      { header: 'Information', dataKey: 'value' }
    ],
    theme: 'striped',
    headStyles: {
      fillColor: [150, 40, 20],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    styles: {
      fontSize: 9,
      cellPadding: 3
    },
    columnStyles: {
      field: { fontStyle: 'bold', width: 45 },
      value: { width: 135 }
    }
  });

  // Add notes / thank you message
  const finalY = doc.lastAutoTable.finalY + 12;
  doc.setTextColor(150, 40, 20);
  doc.setFont('helvetica', 'bolditalic');
  doc.setFontSize(10);
  doc.text('Offerings are accepted with divine gratitude.', 14, finalY);

  doc.setTextColor(80, 80, 80);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Note: This is a system-generated receipt and does not require a physical signature.', 14, finalY + 5);
  doc.text('May the blessings of Lord Ayyappa be with you and your family.', 14, finalY + 9);

  // Decorative footer border
  doc.setDrawColor(220, 150, 50);
  doc.setLineWidth(0.5);
  doc.line(14, 275, 196, 275);
  doc.setFontSize(7.5);
  doc.text('© Sri Kainari Ayyappan Kavu. Valaamkulam PO, Kerala, India.', 14, 280);

  // Save the PDF
  const filename = `${type}_receipt_${receiptNo}.pdf`;
  doc.save(filename);
};
