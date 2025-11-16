import axios from "axios";
import Link from "next/link";
import Marquee from "react-fast-marquee";

async function getServices() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/getall`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching services:", error.message);
    return [];
  }
}

const HeroTicker = async () => {
  const services = await getServices();

  return (
    <div className="bg-gradient-to-r from-[#ed1c24] via-[#0b2240] to-[#736328] py-4 border-b border-gray-200">
      <Marquee pauseOnHover={true} speed={100} direction="left">
        {services?.map((service, index) => (
          <Link
            key={index}
            href={`/services/${service?.slug}`}
            className="flex items-center space-x-2 mx-8 min-w-max hover:cursor-pointer group"
          >
            <span className="text-md text-white font-medium tracking-wide group-hover:underline decoration-white decoration-2 transition-all duration-300 ease-in-out">
              {service?.title}
            </span>
          </Link>
        ))}
      </Marquee>
    </div>
  );
};

export default HeroTicker;
