import React from "react";

export interface Partner {
  name: string;
  href: string;
  img: string;
}

interface PartnerSliderProps {
  partners: Partner[];
  title?: string;
  duration?: number;
}

const PartnerSlider: React.FC<PartnerSliderProps> = ({
  partners,
  title = "ĐỐI TÁC",
  duration = 20,
}) => {
  const doublePartners = [...partners, ...partners];

  return (
    <div className="w-full bg-[#23263a] py-8 shadow-xl overflow-hidden my-8 relative">
      <h2 className="text-2xl font-bold text-center tracking-wider text-[#dab2ff] mb-6 select-none">
        {title}
      </h2>
      <div className="relative w-full overflow-hidden">
        <div
          className="flex w-max animate-logo-scroll"
          style={{
            animation: `logo-scroll ${duration}s linear infinite`,
          }}
        >
          {doublePartners.map((p, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center mt-6 mx-7 w-[180px] select-none"
            >
              <a href={p.href} target="_blank" rel="noopener noreferrer">
                <img
                  src={p.img}
                  alt={p.name + " logo"}
                  className="w-[300px] h-[152px] object-contain rounded-xl bg-white mb-3 shadow hover:scale-105 transition-transform duration-200"
                  draggable={false}
                />
                {/* <div className="text-yellow-400 text-base font-medium hover:underline hover:text-blue-400 transition-colors duration-200 text-center">
                  {p.name}
                </div> */}
              </a>
            </div>
          ))}
        </div>
      </div>
      <style>
        {`
          @keyframes logo-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
};

export default PartnerSlider;
