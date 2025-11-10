import Footer from "@/components/Footer";
import { PickupAndDeliveryPolicy } from "@/components/footerPage/PickupAndDeliveryPolicy";
import Header from "@/components/Header";


export default function page() {
    return (
    <>
      <Header />
      <PickupAndDeliveryPolicy/>
      <Footer />
    </>
  );
}