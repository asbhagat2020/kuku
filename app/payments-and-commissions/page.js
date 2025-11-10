import Footer from "@/components/Footer";
import { PaymentsAndCommissions } from "@/components/footerPage/PaymentsAndCommissions";
import Header from "@/components/Header";


export default function page() {
    return (
    <>
      <Header />
      <PaymentsAndCommissions/>
      <Footer />
    </>
  );
}