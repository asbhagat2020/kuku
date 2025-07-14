// // "use client"

// // import Footer from '@/components/Footer';
// // import Header from '@/components/Header';
// // import ReturnOrderPage from '@/components/ReturnOrderPage';


// // import React from 'react';

// // const page = ({ searchParams }) => {
// //   return (
// //     <>
// //       <Header />
// //       {/* <ReturnOrderPage /> */}
// //       <ReturnOrderPage searchParams={searchParams} />
// //       <Footer />
// //     </>
// //   );
// // };

// // export default page;







// // app/returnorder/page.jsx
// "use client";

// import Footer from '@/components/Footer';
// import Header from '@/components/Header';
// import ReturnOrderPage from '@/components/ReturnOrderPage';
// import React from 'react';

// export default function ReturnOrder({ searchParams }) {
//   return (
//     <>
//       <Header />
//       <ReturnOrderPage searchParams={searchParams} />
//       <Footer />
//     </>
//   );
// }


"use client";

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ReturnOrderPage from '@/components/ReturnOrderPage';
import React from 'react';

export default function ReturnOrder() {
  return (
    <>
      <Header />
      <ReturnOrderPage /> {/* searchParams prop ki zarurat nahi */}
      <Footer />
    </>
  );
}