import React, { useMemo, useState, useEffect } from "react";

import SelecInput from "../../components/SelectInput";

import ContentHeader from "../../components/ContentHeader";

import listOfMonths from "../../utils/months";

import { Container, Content } from "./styles";

import expenses from "../../repositories/expenses";
import gains from "../../repositories/gains";

import WallerBox from "../../components/WallerBox";

import MessageBox from "../../components/MessageBox";

import happyImg from "../../assets/happy.svg";
import grinningImg from "../../assets/grinning.svg";
import sadImg from "../../assets/sad.svg";
import Chart from "../../components/Chart";

import HistoryBox from "../../components/HistoryBox";

import BarChartBox from "../../components/BarChartBox";

const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  );
  const [yearSelected, setYearSelected] = useState<number>(2020);

  function handleMonthSelected(month: string): void | undefined {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch (error) {
      throw new Error("invalid month value");
    }
  }

  function handleYearSelected(year: string): void | undefined {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch (error) {
      throw new Error("invalid year value");
    }
  }
  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);
  const years = useMemo(() => {
    let uniqueyears: number[] = [];

    [...gains, ...expenses].forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if (!uniqueyears.includes(year)) {
        uniqueyears.push(year);
      }
    });

    return uniqueyears.map((year) => {
      return {
        value: year,
        label: year,
      };
    });
  }, []);

  const totalExpenses = useMemo(() => {
    let total: number = 0;

    expenses.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error("Invalid amount! Amount must be number");
        }
      }
    });

    return total;
  }, [monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    let total: number = 0;

    gains.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error("Invalid amount! Amount must be number");
        }
      }
    });

    return total;
  }, [monthSelected, yearSelected]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalExpenses, totalGains]);

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: "Que triste",
        description: "Nesse mês, você gastou mais do que deveria.",
        footerText: "Gastos desnecassrio",
        icon: sadImg,
      };
    } else if (totalBalance == 0) {
      return {
        title: "ufa",
        description: "Nesse mês,nesse mês você gastou o que ganhou.",
        footerText: "Tenha cuidado",
        icon: grinningImg,
      };
    } else {
      return {
        title: "Muito bem!",
        description: "Sua carteira está positiva!",
        footerText: "Continue assim. Considere investir o seu saldo.",
        icon: happyImg,
      };
    }
  }, [totalBalance]);

  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses;

    const percentGains = (totalGains / total) * 100;
    const percentExpenses = (totalExpenses / total) * 100;

    const data = [
      {
        name: "Entradas",
        value: totalGains,
        percent: Number(percentGains.toFixed(1)),
        color: "#F7931B",
      },
      {
        name: "Saídas",
        value: totalExpenses,
        percent: Number(percentExpenses.toFixed(1)),
        color: "#E44C4E",
      },
    ];

    console.log(percentExpenses);

    return data;
  }, [totalExpenses, totalGains]);

  const historyData = useMemo(() => {
    return listOfMonths
      .map((_, month) => {
        let amountEntry = 0;

        gains.forEach((gain) => {
          const date = new Date(gain.date);
          const gainMonth = date.getMonth() + 1;
          const gainYear = date.getFullYear();

          if (gainMonth === month && gainYear === yearSelected) {
            try {
              amountEntry += Number(gain.amount);
            } catch (error) {
              throw new Error("amountEntry is invalid");
            }
          }
        });

        let amountOutput = 0;

        expenses.forEach((expense) => {
          const date = new Date(expense.date);
          const expenseMonth = date.getMonth() + 1;
          const expenseYear = date.getFullYear();

          if (expenseMonth === month && expenseYear === yearSelected) {
            try {
              amountOutput += Number(expense.amount);
            } catch (error) {
              throw new Error("amountOutput is invalid");
            }
          }
        });

        return {
          monthNumber: month,
          month: listOfMonths[month].substr(0, 3),
          amountEntry,
          amountOutput,
        };
      })
      .filter((item) => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        return (
          (yearSelected === currentYear && item.monthNumber <= currentMonth) ||
          yearSelected < currentYear
        );
      });
  }, [yearSelected]);

  const relationExpensevesRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    expenses
      .filter((expense) => {
        const date = new Date(expense.date);
        const yaer = date.getFullYear();
        const month = date.getMonth();

        return month === monthSelected && yaer === yearSelected;
      })
      .forEach((expense) => {
        if (expense.frequency === "recorrente") {
          return (amountRecurrent += Number(expense.amount));
        }
        if (expense.frequency === "eventual") {
          return (amountEventual += Number(expense.amount));
        }
      });

    const total = amountRecurrent + amountEventual;

    return [
      {
        name: "Recorrentes",
        amount: amountRecurrent,
        percent: Number(((amountRecurrent / total) * 100).toFixed(1)),
        color: "#F7931B",
      },
      {
        name: "Eventuais",
        amount: amountEventual,
        percent: Number(((amountEventual / total) * 100).toFixed(1)),
        color: "#E44C4E",
      },
    ];
  }, [monthSelected, yearSelected]);

  return (
    <Container>
      <ContentHeader title="Dasborad" lineColor="#fff">
        <SelecInput
          options={months}
          onChange={(e) => handleMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelecInput
          options={years}
          onChange={(e) => handleYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>
      <Content>
        <WallerBox
          title="Saldo"
          color="#4E41F0"
          amount={totalBalance}
          footerLabel="Atulizado com base nas entradas e saídas"
          icon="dollar"
        />
        <WallerBox
          title="Entradas"
          color="#F7931B"
          amount={totalGains}
          footerLabel="Atulizado com base nas entradas e saídas"
          icon="arrowUp"
        />
        <WallerBox
          title="Saídas"
          color="#E44C4E"
          amount={totalExpenses}
          footerLabel="Atulizado com base nas entradas e saídas"
          icon="arrowDown"
        />
        <MessageBox
          title={message.title}
          description={message.description}
          footerText={message.footerText}
          icon={message.icon}
        />
        <Chart data={relationExpensesVersusGains}></Chart>
        <HistoryBox
          data={historyData}
          lineColorAmountEntry="#F7931B"
          lineColorAmountOutput="#E44C4E"
        />
        <BarChartBox 
            title="Saídas"
            data={relationExpensevesRecurrentVersusEventual} 
        />
        <BarChartBox 
            title="Entrada"
            data={relationExpensevesRecurrentVersusEventual} 
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
