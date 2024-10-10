"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import DownloadKuku from "@/components/home/DownloadKuku";

export default function Renting() {
    return(

<>
<Header/>
    <div class="px-[70px] py-[70px]">
      <div className="text-[#070707] text-[36.8px] font-normal  font-luckiest leading-[44.16px] mb-6">
      Review Offer
      </div>
      <div style={styles.cardGrid}>
      
        {/* Card 1 */}
        <div style={{...styles.card,...styles.firstCard}}>
        <div className="flex gap-2 ">
      <img className="w-[199px] h-[197px] rounded-[9.48px]" src="/Rectangle 5201.png" alt="Product" />
      <div>
      <h2 className="text-start text-black text-[18px] font-bold font-karla">AMIRI | Men Oversize T-shirt</h2>
         <p className="text-start text-[#b4b4b4] font-karla text-base">Lorem ipsum dollor dummy text</p>
        
         <div className="flex items-center gap-6 mt-4">
           {/* Size */}
           <div className="flex items-center gap-4">
             <span className="text-[#383838] text-[16px] font-bold font-karla">SIZE</span>
             <div className="w-[37px] h-[37px] border border-[#e4086f] flex items-center justify-center">
               <span className="text-[#e4086f] text-[16px] font-karla">OS</span>
             </div>
           </div>
        
           {/* Condition */}
           <div className="flex items-center gap-4 ">
             <span className="text-[#383838] text-[16px] font-karla font-bold">CONDITION:</span>
             <span className="text-[#515151] text-[16px] font-karla font-bold">GOOD</span>
           </div>         
         </div>
       </div>
     </div>
          
        </div>

        {/* Card 2 */}
        <div style={{...styles.card,...styles.SecondCard}}>
  <div>
    <h2 className="flex text-black text-[18px] font-karla font-bold mb-4">Buyer</h2>
    <div className="flex items-center justify-between gap-4 border-2 border-[#ededed] rounded-2xl p-4 mr-6">
      {/* Buyer Image */}
      <div className="flex items-center gap-4">
        <img
          className="w-[52.82px] h-[52.82px] rounded-full"
          src="/Ellipse 1632.png"
          alt="Buyer"
        />
        {/* Buyer Name */}
        <h3 className="text-black text-[16px] font-karla font-medium">Abu Salim</h3>
      </div>

      {/* Alert Icon */}
      <img
        className="w-[52.82px] h-[52.82px] rounded-full"
        src="/alert-circle.svg"
        alt="alert"
      />
    </div>
  </div>
</div>
   
        

        {/* Card 3 */}
        <div style={{...styles.card,...styles.ThirdCard}}>
  <div className="mt-[-10px]">
    {/* Price Information Title */}
    <h2 className="text-black text-[18px] font-karla font-bold text-left">Price Information</h2>
    
    {/* Pricing Grid */}
    <div className=" mt-5">
      
      {/* Buyer's Offer Section */}
      <div className="flex items-center justify-between">
  <span className="text-black font-karla text-[16px] font-bold">Buyer’s Offer</span>
  
  <div className="flex items-center gap-0"> {/* Removed padding, kept items centered */}
    <img
      className="w-[29.82px] h-[29.82px] rounded-full "  // Added margin-right for spacing
      src="/dirham-coin-outline-icon 1.svg"
      alt="coin"
    />
    <span className="text-[#eda702] font-karla text-[16px] font-bold mr-8">120.00</span>
  </div>
</div>
      
    </div>
  </div>
</div>




        {/* Card 4 */}
        <div style={{...styles.card,...styles.FourthCard}}>
  <div className="mt-10">
    <div className="flex items-center justify-between">
      <span className="text-black text-[16px] font-karla font-bold">Buyer’s Offer</span>
      
      <div className="flex items-center gap-0">  {/* Removed spacing between image and price */}
        <img
          className="w-[29.82px] h-[29.82px] rounded-full "
          src="/dirham-coin-outline-icon 1.svg"
          alt="coin"
        />
        <span className="text-[#eda702] text-[16px] font-karla font-bold mr-8">140.00</span>
      </div>
    </div>
  </div>
</div>



  
</div>
<div className="h-[72px] p-5 flex justify-end items-start mb-8 gap-5">
  {/* Reject Button */}
  <button className="w-[200px] h-[60px] rounded-[20px] border-2 border-[#383838] flex justify-center items-center gap-[11px] transition-colors hover:bg-[#383838] hover:text-white">
    <span className="w-[78px] text-[#070707] text-xl font-bold font-karla uppercase leading-snug">Reject</span>
  </button>

  {/* Accept Button */}
  <button className="w-[200px] h-[60px] bg-[#fde504] rounded-[20px] border-2 flex justify-center items-center gap-[11px] transition-colors hover:bg-[#b2b200]">
    <span className="text-[#070707] text-xl font-bold font-karla uppercase leading-snug">Accept</span>
  </button>
</div>
</div>
<DownloadKuku/>
<Footer/>
</>
  );
}

// Inline CSS styles for the grid and cards
const styles = {
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0px',
    padding: '20px',
    
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: '20px',
    
    textAlign: 'center',
    border: '1px solid #ededed',
    borderRadius: '0px', // Square corners for all cards
  },
  firstCard: {
    borderTopLeftRadius: '10px', // Round the top left corner of the first card
  },
  SecondCard: {
    borderTopRightRadius: '10px', // Round the top left corner of the first card
  },
  ThirdCard:{
    borderBottomLeftRadius:'10px',
  },
  FourthCard:{
    borderBottomRightRadius:'10px',
  }
};





        

