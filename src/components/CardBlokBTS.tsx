import React from 'react'

interface CardBlockProps {
  data: number | string;
  title?: string;
  icon?: React.ReactNode;
}

const CardBlockBTS = ({ data, title }: CardBlockProps) => {
  return (
    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 text-center">
      <h3 className="text-md text-yellow-300  font-extrabold">{data}</h3>
      <p className="text-gray-300 text-xs">{title}</p>
    </div>
  );
};

export default CardBlockBTS