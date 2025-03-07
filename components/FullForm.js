"use client";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export default function FullForm({ formData, prorated, proratedData }) {
  // Check if prorated data exists in the formData object
  const { proratedRent } = formData;
  const formRef = useRef(); // Ref to capture the form content

  const handlePrint = () => {
    if (!formRef.current) {
      console.error("Form reference is null.");
      return;
    }

    // Select and hide the buttons before printing
    const buttons = formRef.current.querySelectorAll("button");
    buttons.forEach((button) => (button.style.display = "none"));

    // Trigger print
    window.print();

    // Show the buttons again after printing
    buttons.forEach((button) => (button.style.display = ""));
  };

  const handleDownloadPDF = () => {
    if (!formRef.current) {
      console.error("Form reference is null.");
      return;
    }

    // Select and hide the buttons before capturing
    const buttons = formRef.current.querySelectorAll("button");
    buttons.forEach((button) => (button.style.display = "none"));

    // Temporarily override certain styles
    const originalStyles = [];
    const elements = formRef.current.querySelectorAll("*");

    elements.forEach((element) => {
      originalStyles.push({
        element,
        color: element.style.color,
        backgroundColor: element.style.backgroundColor,
        border: element.style.border,
      });

      element.style.color = "black"; // Ignore color
      element.style.backgroundColor = "transparent"; // Ignore background color
      element.style.border = "none"; // Ignore border
    });

    // Get content dimensions
    const contentWidth = formRef.current.scrollWidth;
    const contentHeight = formRef.current.scrollHeight;

    html2canvas(formRef.current, {
      scale: 1.4, // Reduce scale to make text smaller
      backgroundColor: "transparent",
      width: contentWidth,
      height: contentHeight,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = 210; // A4 width in mm
        const pdfHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * pdfWidth) / canvas.width; // Maintain aspect ratio

        let yOffset = 0;
        while (yOffset < imgHeight) {
          if (yOffset > 0) pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, -yOffset, pdfWidth, imgHeight);
          yOffset += pdfHeight - 20; // Adjust to avoid cutting off text
        }

        pdf.save("Roommate_Agreement.pdf");

        // Restore original styles
        originalStyles.forEach(({ element, color, backgroundColor, border }) => {
          element.style.color = color;
          element.style.backgroundColor = backgroundColor;
          element.style.border = border;
        });

        // Show the buttons again after capturing
        buttons.forEach((button) => (button.style.display = ""));
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        // Show buttons again if there's an error
        buttons.forEach((button) => (button.style.display = ""));
      });
  };










  return (
    <div ref={formRef} className="p-6 max-w-2xl mx-auto">

      <h1 className="text-2xl font-bold">ROOMMATE AGREEMENT</h1>
      <ul className="mt-4 space-y-3">
        <li>
          <strong>This Roommate Agreement is made between
          </strong> {formData.landlordName} and {formData.roommateName} (“roommate”).
        </li>
        <li>
          <strong>{formData.landlordName}</strong> resides in the premises commonly known as <strong>{formData.address}</strong> (“the premises”).
          The premises do not include the garden or any of the other common areas of the building.
        </li>
        <li>
          Roommate will rent a room in the premises and will have the use of the room, the kitchen,
          and bathrooms of the premises.
        </li>
        <li>
          This agreement will start on <strong>{formData.startDate}</strong> and will terminate
          on <strong>{formData.endDate}</strong> at noon.
        </li>
        <li>
          Roommate will pay a total monthly rent of <strong>${formData.rent}</strong> in full
          to <strong>{formData.landlordName}</strong> on or by the first day of each month.
          {prorated && proratedData.month && proratedData.amount && (
            <div>
              <strong>Prorated Rent:</strong> For {proratedData.month}: <strong>${proratedData.amount}</strong>

            </div>
          )}
        </li>
        <li>
          Security deposit is <strong>${formData.deposit}</strong>. Roommate has paid <strong>${formData.deposit}</strong> to <strong>{formData.landlordName}</strong> as
          a security deposit. Deductions permitted by California law, including any damage and
          unpaid rent, may be made from the security deposit and the remainder, if any,
          shall be returned to roommate within 21 days of the termination of roommate’s tenancy.
          The security deposit may not be used as a last month’s rent.
        </li>
        <li>
          <strong>Termination of Agreement:</strong> Either party may terminate this Agreement at
          any time and without cause provided that 30 days’ written notice is given to the other party.
          Roommate is advised to contact the SF Rent Board for any questions regarding this
          Agreement and, in particular, the termination of this Agreement without cause.
        </li>
        <li>
          <strong>Overnight Guests:</strong> Roommate needs to obtain the
          permission of <strong>{formData.landlordName}</strong> prior to the stay of any overnight guest.
          Guests may not stay more than 4 nights total per 30 days (exception may be made for
          immediate family members). Guests may not be in the unit without the roommate being
          present with them (exception may be made for immediate family members).
          Guests are not permitted to use the kitchen and laundry.
        </li>
        <li>
          Roommate agrees not to give the code to the front door to anyone.
        </li>
        <li>
          Roommate agrees to biannual safety and compliance inspections of the room.
        </li>
        <li>
          Working from home full-time is not allowed.
        </li>
        <li>
          <strong>Furnishings:</strong> Furnishings shall not be moved, removed,
          or altered without permission of <strong>{formData.landlordName}</strong>. Bicycles,
          electric bikes, and electric scooters are not allowed in the unit.
        </li>
        <li>
          <strong>House rules:</strong> Roommate agrees to clean and maintain her/his
          room as well as the common areas. This includes dusting, vacuuming, emptying
          the trash, and any other household maintenance. All Roommates agree to act
          responsibly with their dealings with each other and to refrain from any behavior,
          action or inaction that they know, or reasonably ought to know, will interfere with
          other Roommates' quiet enjoyment. All Roommates agree to respect each other's property,
          privacy, and sleep schedules and to comply with any reasonable request whenever possible.
          Quiet time is 10pm-7am. Roommate agrees to conserve water, electricity, and to
          separate her/his recyclables, compostables, and landfill trash. Any surcharges or
          penalties incurred from improper recycling or/and excessive utility usage by the
          roommate will be his/her responsibility.
        </li>
        <li>
          Smoking is not allowed in, or around the house. IF THERE IS ANY EVIDENCE OF SMOKING ON
          THE LEASED PREMISES AT ANYTIME DURING THE LEASE, THE ENTIRE AMOUNT OF THE DEPOSIT WILL
          BE AUTOMATICALLY FORFEITED.
        </li>
        <li>
          The premises are in good condition. Upon termination of this Agreement for any cause,
          Roommate will leave the Premises in their original good condition, except for reasonable
          wear and tear. Roommate is responsible for the repair of any damage resulting from the
          act or neglect of Roommate or those persons who are invitees of the Roommate.
        </li>
        <li>
          <strong>Subleasing and Assignment:</strong> Roommate may not sublease, or assign the Premises.
        </li>
        <li>
          Complete and Binding Agreement. All preliminary negotiations between the Parties are
          merged into, and superseded by, the terms of this Agreement.
          This Agreement will not be enforceable until signed by both parties.
          Any modifications to this Agreement must be in writing, signed by both.
        </li>
      </ul>
      <ul className="mt-4">
        <li>
          We, the Undersigned, agree to the above-stated terms.
        </li>
        <div>
          <li>
            <h1><strong>{formData.landlordName}</strong><p>Signature</p><p>Date:</p></h1>
          </li>
        </div>
        <div>
          <li>
            <h1><strong>{formData.roommateName}</strong><p>Signature</p><p>Date:</p></h1>
          </li>
        </div>
        <div>
          <li>
            <p>Emergency contact (name / ph. #):</p>
          </li>
          <li>
            <p>Landlord’s insurance does not cover any damage/loss to the Roommate's belongings.</p>
            <p>Roommate is advised to get renter's insurance.</p>
          </li>
        </div>
      </ul>

      <div>
        <button className="mt-4 bg-green-500 text-white p-2" onClick={handlePrint}>Print</button>
        <button className="mt-4 bg-gray-500 text-white p-2" onClick={() => window.location.reload()}>Go Back</button>
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 w-full" onClick={handleDownloadPDF} >Download PDF</button>
      </div>

    </div>
  );
}
