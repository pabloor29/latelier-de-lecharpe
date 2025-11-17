import React from "react";

interface PlatSuggestProps {
  src: string;
  alt: string;
  title: string;
}

const PlatSuggest: React.FC<PlatSuggestProps> = ({src, alt, title}) => {
  return (
    <div className="flex flex-col items-center justify-center lg:space-y-6">
      <img src={src} alt={alt} />
      <h4 className="text-5xl text-[#002E6D] font-spaceTransit tracking-wide">{title}</h4>
    </div>
  );
};

export default PlatSuggest;
