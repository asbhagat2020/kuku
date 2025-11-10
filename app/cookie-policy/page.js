import Footer from "@/components/Footer";
import { CookiePolicy } from "@/components/footerPage/CookiePolicy";
import Header from "@/components/Header";


export default function page() {
    return (
    <>
      <Header />
      <CookiePolicy/>
      <Footer />
    </>
  );
}