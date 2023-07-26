import * as React from "react";
import { FC } from "react";

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className }) => {
  return <img src={""} className={className} alt="logo" />;
};

export default Logo;
