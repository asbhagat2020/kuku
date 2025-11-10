import Footer from "@/components/Footer";
import { PrivacyPolicy } from "@/components/footerPage/PrivacyPolicy";
import Header from "@/components/Header";


export default function page() {
    return (
    <>
      <Header />
      <PrivacyPolicy/>
      <Footer />
    </>
  );
}