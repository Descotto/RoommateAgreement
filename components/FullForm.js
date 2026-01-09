"use client";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


export default function FullForm({ formData, prorated, proratedData }) {
  const { proratedRent } = formData;
  const formRef = useRef();

  const handlePrint = () => {
    if (!formRef.current) return;

    document.title = `${formData.roommateName}-Roommate-Agreement-${formData.startDate}`;

    const buttons = formRef.current.querySelectorAll("button");
    buttons.forEach((button) => (button.style.display = "none"));

    window.print();

    buttons.forEach((button) => (button.style.display = ""));
  };




  return (
    <div
      ref={formRef}
      className={`p-6 max-w-2xl mx-auto ${prorated ? "text-[15px]" : "text-[15px]"}`}
    >

      <h1 className="text-2xl font-bold">ROOMMATE AGREEMENT</h1>

      <ul className="mt-4 space-y-3">
        <li>
          <strong>This Roommate Agreement is made between</strong>{" "}
          {formData.landlordName} ("Landlord") and {formData.roommateName} (“Roommate”).
        </li>

        <li>
          <strong>{formData.landlordName}</strong> (“Landlord”) resides at the premises commonly known as <strong>{formData.address}</strong> (“the
          premises”). The Premises do not include the garden or any other common areas of the building.
        </li>

        <li>
          The Roommate will rent a room in the Premises and will have use of the room, the kitchen, and the bathrooms of the Premises.
        </li>

        <li>
          This Agreement will commence on <strong>{formData.startDate}</strong> and
          will terminate on <strong>{formData.endDate}</strong> at noon.
        </li>

        <li>
          The Roommate will pay a total monthly rent of{" "}
          <strong>${formData.rent}</strong> in full to{" "}
          <strong>{formData.landlordName}</strong> on or before the first day of each month.
          Utilities and Wi‑Fi are included in this amount.
          {prorated && proratedData.month && proratedData.amount && (
            <div>
              <strong>Prorated Rent:</strong> For {proratedData.month}:{" "}
              <strong>${proratedData.amount}</strong>
            </div>
          )}
        </li>

        <li>
          The security deposit is <strong>${formData.deposit}</strong>. The Roommate has
          paid <strong>${formData.deposit}</strong> to{" "}
          <strong>{formData.landlordName}</strong> as a security deposit.
          Deductions permitted by California law, including any damages or unpaid rent,
          may be made from the security deposit, and the remainder, if any,
          shall be returned to the Roommate within 21 days of the termination of the tenancy.
          The security deposit may not be used as the last month’s rent.
        </li>

        <li>
          <strong>Termination of Agreement:</strong> Either party may terminate this Agreement at any time and without cause,
          provided that <strong>30 days’ written notice</strong> is given to the other party.
          The Roommate is advised to contact the San Francisco Rent Board for any questions
          regarding this Agreement, including the termination of the Agreement without cause.
        </li>

        <li>
          <strong>Overnight Guests:</strong> The Roommate must obtain the permission from <strong>{formData.landlordName}</strong> ("Landlord") prior to the stay
          of any overnight guests. Guests may not stay more than <strong>four (4) nights total per 30-day period</strong> (an exception may be made for immediate family members).
          Guests may not be in the unit unless the Roommate is present
          (an exception may be made for immediate family members).
          Guests are not permitted to use the kitchen or laundry facilities.
        </li>

        <li><strong>The Roommate agrees not to share the door code with anyone</strong>. </li>
        <li>The Roommate agrees to participate in biannual safety and compliance inspections.</li>
        <li>Working from home full-time is not allowed.</li>

        <li>
          <strong>Furnishings:</strong> Furnishings shall not be moved or altered without the permission of <strong>{formData.landlordName}</strong> ("Landlord").
          Bicycles, electric bicycles, scooters, and similar items are not permitted in the unit.
        </li>

        <li>
          <strong>House rules:</strong> The Roommate agrees to clean and maintain their room as well as the common areas.
          This includes dusting, vacuuming, emptying trash, and performing any other necessary household maintenance.
          All Roommates agree to act responsibly in their dealings with each other and to refrain from any behavior, action,
          or inaction that they know, or reasonably should know, will interfere with other Roommates’ quiet enjoyment.
          All Roommates agree to respect each other’s property, privacy, and sleep schedules and to comply with any reasonable
          request whenever possible. Quiet hours are from <strong>10:00 PM to 7:00 AM</strong>.
          The Roommate agrees to conserve water and electricity, and to properly separate recyclables,
          compostables, and landfill waste.
          Any surcharges or penalties incurred due to improper recycling or excessive
          utility usage by the Roommate will be the Roommate’s responsibility.
        </li>

        <li>
          Smoking is not permitted in or around the house.
          IF THERE IS ANY EVIDENCE OF SMOKING ON THE LEASED PREMISES AT ANY TIME DURING THE LEASE,
          THE ENTIRE SECURITY DEPOSIT WILL BE FORFEITED.
        </li>

        <li>
          The Premises are in good condition.
          Upon termination of this Agreement for any cause,
          the Roommate shall leave the Premises in their original condition,
          except for reasonable wear and tear. The Roommate is responsible for
          repairing any damage resulting from their own actions or the actions of their guests.
        </li>

        <li>
          <strong>Subleasing and Assignment:</strong> The Roommate may not sublease or assign the Premises.
        </li>

        <li>
          Complete and Binding Agreement.
          All preliminary negotiations between the Parties are merged into and superseded by the terms of this Agreement.
          This Agreement will not be enforceable until signed by both Parties.
          Any modifications to this Agreement must be in writing and signed by both Parties.
        </li>
      </ul>

      <div className="mt-8">
        <p className="mb-6">We, the Undersigned, agree to the above terms.</p>

        <div className="flex justify-between gap-12">
          {/* Landlord */}
          <div className="flex-1">
            <strong>{formData.landlordName}</strong>

            <div className="mt-8 border-t border-black w-full"></div>
            <p className="text-sm mt-1">Signature</p>

            <div className="mt-6 border-t border-black w-full"></div>
            <p className="text-sm mt-1">Date</p>
          </div>

          {/* Roommate */}
          <div className="flex-1">
            <strong>{formData.roommateName}</strong>

            <div className="mt-8 border-t border-black w-full"></div>
            <p className="text-sm mt-1">Signature</p>

            <div className="mt-6 border-t border-black w-full"></div>
            <p className="text-sm mt-1">Date</p>
          </div>
        </div>

        <div className="mt-8">
          <p>Emergency contact (name / ph. #):</p>

          <div className="mt-4">
            <p>
              Landlord’s insurance does not cover roommate belongings.
            </p>
            <p>Roommate is advised to get renter's insurance.</p>
          </div>
        </div>
      </div>


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
