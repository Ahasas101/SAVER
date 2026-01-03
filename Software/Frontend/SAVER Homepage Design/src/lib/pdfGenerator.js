import jsPDF from 'jspdf';
import 'jspdf-autotable';
// You might need to import your logo if you want to add it to the PDF
// import logo from '../images/logosaverfinal.png';

export const generateChallanPDF = (vehicleData) => {
  const doc = new jsPDF();
  const totalAmount = vehicleData.challans.reduce((sum, challan) => sum + challan.amount, 0);

  // Add Header
  // doc.addImage(logo, 'PNG', 10, 10, 30, 10); // Uncomment to add a logo
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('Traffic Violation E-Challan', 105, 20, { align: 'center' });
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 200, 30, { align: 'right' });

  // Vehicle Details Section
  doc.setDrawColor(200);
  doc.line(10, 35, 200, 35); // Horizontal line
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Vehicle Details', 15, 45);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const vehicleDetails = [
    ['Vehicle Number:', vehicleData.vehicleNumber],
    ['Owner Name:', vehicleData.ownerName],
    ['Vehicle Model:', `${vehicleData.make} ${vehicleData.model}`],
    ['Registration Date:', vehicleData.registrationDate],
  ];
  doc.autoTable({
    startY: 50,
    body: vehicleDetails,
    theme: 'plain',
    styles: { cellPadding: 2, fontSize: 11 },
    columnStyles: { 0: { fontStyle: 'bold' } },
  });

  // Violation Details Section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Violation(s) Summary', 15, doc.autoTable.previous.finalY + 15);

  const tableColumn = ["ID", "Violation", "Date & Time", "Location", "Amount (₹)"];
  const tableRows = [];

  vehicleData.challans.forEach(challan => {
    const challanData = [
      challan.id,
      challan.violation,
      `${challan.date} ${challan.time}`,
      challan.location,
      challan.amount.toLocaleString(),
    ];
    tableRows.push(challanData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: doc.autoTable.previous.finalY + 20 });

  // Total Amount and Footer
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Total Pending Amount:', 140, doc.autoTable.previous.finalY + 15);
  doc.setTextColor(255, 0, 0); // Red color for amount
  doc.text(`₹${totalAmount.toLocaleString()}`, 198, doc.autoTable.previous.finalY + 15, { align: 'right' });
  doc.setTextColor(0, 0, 0); // Reset color

  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.text('This is a computer-generated document. Please pay the fine within 15 days to avoid further penalties.', 105, 280, { align: 'center' });
  doc.text('SAVER - Smart Automated Vehicle Overspeed Regulator', 105, 285, { align: 'center' });
  
  // Save the PDF
  doc.save(`challan_${vehicleData.vehicleNumber}.pdf`);
};