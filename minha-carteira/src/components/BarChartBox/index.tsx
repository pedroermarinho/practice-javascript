import { title } from "process";
import React from "react";

import { ResponsiveContainer, BarChart, Bar, Cell, Tooltip } from "recharts";

import { Container, SideLeft, SideRight,Legend,
    LegendContainer, } from "./styles";

import formatCurrency from "../../utils/formatCurrency";

interface IBarChartProps {
  title: string;
  data: {
    name: string;
    amount: number;
    percent: number;
    color: string;
  }[];
}

const BarChartBox: React.FC<IBarChartProps> = ({ title, data }) => {
  return (
    <Container>
      <SideLeft>
        <h2>{title}</h2>
        <LegendContainer>
          {data.map((indicator) => (
            <Legend color={indicator.color} key={Math.random() * data.length}>
              <div>{indicator.percent}%</div>
              <span>{indicator.name}</span>
            </Legend>
          ))}
        </LegendContainer>
      </SideLeft>
      <SideRight>
        <ResponsiveContainer>
          <BarChart data={data}>
            <Bar dataKey="amount" name="Valor">
              {data.map((indicator) => (
                <Cell
                  key={indicator.name}
                  fill={indicator.color}
                  cursor="pointer"
                />
              ))}
            </Bar>
            <Tooltip formatter={formatCurrency} cursor={{
                fill:'none'
            }} />
          </BarChart>
        </ResponsiveContainer>
      </SideRight>
    </Container>
  );
};

export default BarChartBox;
