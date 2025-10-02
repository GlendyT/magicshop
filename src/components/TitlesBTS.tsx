import React from "react";

type TitlesBTSProps = {
  icon: React.ReactNode;
  data: number | string;
  title: string;
};

const TitlesBTS = ({ icon, data, title }: TitlesBTSProps) => {
  return (
    <p className="flex items-center gap-1">
      {icon}
      {data} {title}
    </p>
  );
};

export default TitlesBTS;
