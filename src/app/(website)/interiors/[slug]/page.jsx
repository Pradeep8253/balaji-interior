import OfferHero from "../../components/hero/OfferHero";
import WhatWeOffer from "../../components/WhatWeOffer";

function page({ params }) {
  const type = params?.slug;

  return (
    <>
      <OfferHero type={type} />
      <WhatWeOffer type={type} />;
    </>
  );
}

export default page;
