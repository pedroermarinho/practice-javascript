import React from "react";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  Container,
  SideLeft,
  Legend,
  LegendContainer,
  SideRight,
} from "./styles";

interface IChartProps {
  data: {
    name: string;
    value: number;
    percent: number;
    color: string;
  }[];
}

const Chart: React.FC<IChartProps> = ({ data }) => (
  <Container>
    <SideLeft>
      <h2>Relação</h2>
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
        <PieChart>
          <Pie data={data} labelLine={false} dataKey="percent">
            {
              data.map((indicator)=> (
                <Cell key={indicator.name} fill={indicator.color}/>
              ))
            }

          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </SideRight>
  </Container>
);

export default Chart;
