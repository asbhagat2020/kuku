import Footer from "@/components/Footer";
import { PickuupAndDeliveryPolicy } from "@/components/footerPage/PickuupAndDeliveryPolicy";
import Header from "@/components/Header";


export default function page() {
    return (
    <>
      <Header />
      <PickuupAndDeliveryPolicy/>
      <Footer />
    </>
  );
}