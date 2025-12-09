"use client";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


export default function FullForm({ formData, prorated, proratedData }) {
  const { proratedRent } = formData;
  const formRef = useRef();

  const handlePrint = () => {
    if (!formRef.current) return;

    const buttons = formRef.current.querySelectorAll("button");
    buttons.forEach((button) => (button.style.display = "none"));

    window.print();

    buttons.forEach((button) => (button.style.display = ""));
  };

  // const handleDownloadPDF = () => {
  //   if (!formRef.current) return;

  //   const buttons = formRef.current.querySelectorAll("button");
  //   buttons.forEach((button) => (button.style.display = "none"));

  //   const originalStyles = [];
  //   const elements = formRef.current.querySelectorAll("*");

  //   elements.forEach((element) => {
  //     originalStyles.push({
  //       element,
  //       color: element.style.color,
  //       backgroundColor: element.style.backgroundColor,
  //       border: element.style.border,
  //     });

  //     element.style.color = "black";
  //     element.style.backgroundColor = "transparent";
  //     element.style.border = "none";
  //   });

  //   const contentWidth = formRef.current.scrollWidth;
  //   const contentHeight = formRef.current.scrollHeight;

  //   html2canvas(formRef.current, {
  //     scale: 1.4,
  //     backgroundColor: "transparent",
  //     width: contentWidth,
  //     height: contentHeight,
  //   })
  //     .then((canvas) => {
  //       const imgData = canvas.toDataURL("image/png");
  //       const pdf = new jsPDF("p", "mm", "a4");

  //       const pdfWidth = 210;
  //       const pdfHeight = 297;
  //       const imgHeight = (canvas.height * pdfWidth) / canvas.width;

  //       let yOffset = 0;
  //       while (yOffset < imgHeight) {
  //         if (yOffset > 0) pdf.addPage();
  //         pdf.addImage(imgData, "PNG", 0, -yOffset, pdfWidth, imgHeight);
  //         yOffset += pdfHeight - 20;
  //       }

  //       pdf.save("Roommate_Agreement.pdf");

  //       originalStyles.forEach(({ element, color, backgroundColor, border }) => {
  //         element.style.color = color;
  //         element.style.backgroundColor = backgroundColor;
  //         element.style.border = border;
  //       });

  //       buttons.forEach((button) => (button.style.display = ""));
  //     })
  //     .catch((error) => {
  //       console.error("Error generating PDF:", error);
  //       buttons.forEach((button) => (button.style.display = ""));
  //     });
  // };

  return (
    <div
      ref={formRef}
      className={`p-6 max-w-2xl mx-auto ${prorated ? "text-[17px]" : "text-lg"}`}
    >

      <h1 className="text-2xl font-bold">ROOMMATE AGREEMENT</h1>

      <ul className="mt-4 space-y-3">
        <li>
          <strong>This Roommate Agreement is made between</strong>{" "}
          {formData.landlordName} and {formData.roommateName} (“roommate”).
        </li>

        <li>
          <strong>{formData.landlordName}</strong> resides in the premises
          commonly known as <strong>{formData.address}</strong> (“the
          premises”). The premises do not include the garden or any of the other
          common areas of the building.
        </li>

        <li>
          Roommate will rent a room in the premises and will have the use of the
          room, the kitchen, and bathrooms of the premises.
        </li>

        <li>
          This agreement will start on <strong>{formData.startDate}</strong> and
          will terminate on <strong>{formData.endDate}</strong> at noon.
        </li>

        <li>
          Roommate will pay a total monthly rent of{" "}
          <strong>${formData.rent}</strong> in full to{" "}
          <strong>{formData.landlordName}</strong> on or by the first day of
          each month.
          {prorated && proratedData.month && proratedData.amount && (
            <div>
              <strong>Prorated Rent:</strong> For {proratedData.month}:{" "}
              <strong>${proratedData.amount}</strong>
            </div>
          )}
        </li>

        <li>
          Security deposit is <strong>${formData.deposit}</strong>. Roommate has
          paid <strong>${formData.deposit}</strong> to{" "}
          <strong>{formData.landlordName}</strong> as a security deposit…
        </li>

        <li>
          <strong>Termination of Agreement:</strong> Either party may terminate
          this Agreement…
        </li>

        <li>
          <strong>Overnight Guests:</strong> Roommate needs permission…
        </li>

        <li>Roommate agrees not to give the door code to anyone.</li>
        <li>Roommate agrees to biannual safety and compliance inspections.</li>
        <li>Working from home full-time is not allowed.</li>

        <li>
          <strong>Furnishings:</strong> Furnishings shall not be moved or
          altered without permission…
        </li>

        <li>
          <strong>House rules:</strong> Roommate agrees to clean and maintain
          the room…
        </li>

        <li>
          Smoking is not allowed… deposit will be automatically forfeited.
        </li>

        <li>
          The premises are in good condition… roommate responsible for repairs.
        </li>

        <li>
          <strong>Subleasing and Assignment:</strong> Roommate may not sublease.
        </li>

        <li>
          Complete and Binding Agreement… modifications must be in writing.
        </li>
      </ul>

      <ul className="mt-4">
        <li>We, the Undersigned, agree to the above terms.</li>

        <div>
          <li>
            <h1>
              <strong>{formData.landlordName}</strong>
              <p>Signature</p>
              <p>Date:</p>
            </h1>
          </li>
        </div>

        <div>
          <li>
            <h1>
              <strong>{formData.roommateName}</strong>
              <p>Signature</p>
              <p>Date:</p>
            </h1>
          </li>
        </div>

        <div>
          <li>
            <p>Emergency contact (name / ph. #):</p>
          </li>

          <li>
            <p>
              Landlord’s insurance does not cover roommate belongings…
            </p>
            <p>Roommate is advised to get renter's insurance.</p>
          </li>
        </div>
      </ul>

      <div>
        <button className="mt-4 bg-green-500 text-white p-2" onClick={handlePrint}>
          Print
        </button>

        <button
          className="mt-4 bg-gray-500 text-white p-2"
          onClick={() => window.location.reload()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
