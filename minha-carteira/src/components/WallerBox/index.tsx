import React, { useMemo } from "react";

import CountUp from  'react-countup';

import { Container } from "./styles";

import dollarImg from "../../assets/dolar.svg";
import arrowUpImg from "../../assets/arrow-up.svg";
import arrowDownImg from "../../assets/arrow-down.svg";

interface IWalletBoxProps {
  title: string;
  amount: number;
  footerLabel: string;
  icon: "dollar" | "arrowUp" | "arrowDown";
  color: string;
}

const WallerBox: React.FC<IWalletBoxProps> = ({
  title,
  amount,
  footerLabel,
  icon,
  color,
}) => {
  const iconSelected = useMemo(() => {
    if ("dollar" === icon) return dollarImg;
    if ("arrowUp" === icon) return arrowUpImg;
    if ("arrowDown" === icon) return arrowDownImg;
    return arrowDownImg;
  }, [icon]);

  return (
    <Container color={color}>
      <span>{title}</span>
      <h1>
          <CountUp  
                end={amount}
                prefix={"R$ "}
                separator="."
                decimal=","
                decimals={2}
          />
      </h1>
      <small>{footerLabel}</small>
      {<img src={iconSelected} alt={title} />}
    </Container>
  );
};

export default WallerBox;
