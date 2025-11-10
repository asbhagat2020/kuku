import Footer from "@/components/Footer";
import { StorageAndHandlingPolicy } from "@/components/footerPage/StorageAndHeadingPolicy";
import Header from "@/components/Header";


export default function page() {
    return (
    <>
      <Header />
      <StorageAndHandlingPolicy/>
      <Footer />
    </>
  );
}