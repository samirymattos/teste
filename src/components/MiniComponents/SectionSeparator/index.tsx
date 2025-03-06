import React from "react";
import { FaServer } from "react-icons/fa";

interface SectionSeparatorProps {
  title: string;
}

const SectionSeparator: React.FC<SectionSeparatorProps> = ({ title }) => {
  return (
    <div className="container-conteudo-small mb-4 flex justify-between items-center">
      <h3 className="text-white text-xl font-bold">{title}</h3>
      <FaServer color="white" size={20} />
    </div>
  );
};

export default React.memo(SectionSeparator);