import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Transliterated English names for Malayalam birth stars (avoiding Sanskrit & Unicode characters in PDF)
const birthStarsEnglish = {
  'ashwini': 'Aswathy',
  'bharani': 'Bharani',
  'karthika': 'Karthika',
  'rohini': 'Rohini',
  'mrigashira': 'Makayiram',
  'ardra': 'Thiruvathira',
  'punarvasu': 'Punartham',
  'pushya': 'Pooyam',
  'ashlesha': 'Ayilyam',
  'magha': 'Makam',
  'purva_phalguni': 'Pooram',
  'uttara_phalguni': 'Uthram',
  'hasta': 'Atham',
  'chitra': 'Chithira',
  'swati': 'Chothi',
  'vishakha': 'Vishakham',
  'anooradha': 'Anizham',
  'jyeshtha': 'Thrikketta',
  'moola': 'Moolam',
  'purva_ashadha': 'Pooradam',
  'uttara_ashadha': 'Uthradam',
  'shravana': 'Thiruvonam',
  'dhanishta': 'Avittam',
  'shatabhisha': 'Chathayam',
  'purva_bhadrapada': 'Pooruruttathi',
  'uttara_bhadrapada': 'Uthruttathi',
  'revati': 'Revathi'
};

const getBirthStarName = (starId) => {
  if (!starId) return 'N/A';
  return birthStarsEnglish[starId.toLowerCase()] || starId;
};

// Safe date formatter to prevent crashing on invalid dates
const formatDate = (dateVal) => {
  if (!dateVal) return 'N/A';
  const d = new Date(dateVal);
  return isNaN(d.getTime()) ? 'N/A' : d.toLocaleDateString();
};

// Helper to convert image URL to base64
const getBase64ImageFromUrl = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
  }
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('text/html')) {
    throw new Error(`Failed to fetch image: Received HTML response (likely SPA fallback for 404)`);
  }
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
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
    try {
      doc.addImage(logoData, 'JPEG', 14, 12, 22, 22);
      textStartX = 40; // Shift text start right to clear logo
    } catch (imgError) {
      console.error('Error rendering logo in PDF:', imgError);
      textStartX = 14; // Fallback if image load/render fails
    }
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
  doc.text(`Receipt Date: ${formatDate(new Date())}`, 14, 53);

  const receiptNo = details.paymentId ? `REC-${details.paymentId.substring(4, 12).toUpperCase()}` : `REC-${Date.now().toString().slice(-8)}`;
  doc.text(`Receipt No: ${receiptNo}`, 140, 53);

  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.2);
  doc.line(14, 56, 196, 56);

  // Prepare autoTable columns and rows
  const tableData = [];
  if (type === 'donation') {
    tableData.push(
      { field: 'Devotee Name', value: details.name || 'N/A' },
      { field: 'Phone Number', value: details.phoneNumber || 'N/A' },
      { field: 'Purpose of Donation', value: details.purpose ? details.purpose.toUpperCase() : 'GENERAL' },
      { field: 'Message', value: details.message || 'N/A' },
      { field: 'Razorpay Payment ID', value: details.paymentId || 'N/A' },
      { field: 'Payment Status', value: 'COMPLETED (PAID)' },
      { field: 'Donation Amount', value: details.amount !== undefined && details.amount !== null ? `INR ${details.amount}/-` : 'N/A' }
    );
  } else {
    // booking
    // For single booking
    if (details.poojaName) {
      tableData.push(
        { field: 'Devotee Name', value: details.name || 'N/A' },
        { field: 'Birth Star', value: getBirthStarName(details.birthStar) },
        { field: 'Phone Number', value: details.mobileNumber || details.phoneNumber || 'N/A' },
        { field: 'Pooja Name', value: details.poojaName || 'N/A' },
        { field: 'Pooja Date', value: formatDate(details.date) },
        { field: 'Razorpay Payment ID', value: details.paymentId || 'N/A' },
        { field: 'Payment Status', value: 'COMPLETED (PAID)' },
        { field: 'Pooja Price', value: details.price !== undefined && details.price !== null ? `INR ${details.price}/-` : 'N/A' }
      );
    } else if (details.cartItems) {
      // Multiple bookings from cart
      tableData.push(
        { field: 'Devotee Name', value: details.name || 'Devotee' },
        { field: 'Phone Number', value: details.phoneNumber || details.mobileNumber || 'N/A' },
        { field: 'Razorpay Payment ID', value: details.paymentId || 'N/A' },
        { field: 'Payment Status', value: 'COMPLETED (PAID)' }
      );

      details.cartItems.forEach((item, idx) => {
        tableData.push({
          field: `Booking #${idx + 1}`,
          value: `${item.poojaName || 'N/A'} for ${item.name || 'N/A'} (${getBirthStarName(item.birthStar)}) on ${formatDate(item.date)} - INR ${item.price || '0'}/-`
        });
      });

      tableData.push({
        field: 'Total Amount Paid',
        value: details.totalPrice !== undefined && details.totalPrice !== null ? `INR ${details.totalPrice}/-` : 'N/A'
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
  doc.text('© Sri Kainari Ayyappan Kavu. Valamkulam PO, Kerala, India.', 14, 280);

  // Save the PDF
  const filename = `${type}_receipt_${receiptNo}.pdf`;
  doc.save(filename);
};
