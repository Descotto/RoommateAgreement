import RoommateAgreement from "@/components/RoommateAgreement";
import Image from "next/image";

export const metadata = {
  title: "Roommate Agreement",
};

export default function Home() {
  return (
    <div>
      <RoommateAgreement />
    </div>
  );
}
