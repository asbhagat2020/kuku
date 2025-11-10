import Footer from "@/components/Footer";
import { ActiveAccountPolicy } from "@/components/footerPage/ActiveAccountPolicy";
import Header from "@/components/Header";


export default function page() {
    return (
    <>
      <Header />
       <ActiveAccountPolicy/>
      <Footer />
    </>
  );
}