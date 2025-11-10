import Footer from "@/components/Footer";
import { LuxeuryAuthenticationPolicy } from "@/components/footerPage/LuxeuryAuthenticationPolicy";
import Header from "@/components/Header";


export default function page() {
    return (
    <>
      <Header />
      <LuxeuryAuthenticationPolicy/>
      <Footer />
    </>
  );
}