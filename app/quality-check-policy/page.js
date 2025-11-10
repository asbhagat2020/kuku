import Footer from "@/components/Footer";
import { QualityCheckPolicy } from "@/components/footerPage/QualityCheckPolicy";
import Header from "@/components/Header";


export default function page() {
    return (
    <>
      <Header />
      <QualityCheckPolicy/>
      <Footer />
    </>
  );
}