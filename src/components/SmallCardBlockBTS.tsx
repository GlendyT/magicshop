import React from "react";

interface CardBlockProps {
  data: number | string;
  title?: string;
  icon?: React.ReactNode;
}

const SmallCardBlockBTS = ({ data, title, icon }: CardBlockProps) => {
  return (
    <span className="flex text-xs items-center gap-1">
      {icon}
      {data} {title}
    </span>
  );
};

export default SmallCardBlockBTS;
