import Footer from "@/components/Footer";
import { QcFailPolicies } from "@/components/footerPage/QcFailPolicies";
import Header from "@/components/Header";


export default function page() {
    return (
    <>
      <Header />
      <QcFailPolicies/>
      <Footer />
    </>
  );
}