import React, { useMemo, useState, useEffect } from "react";

import { useParams } from 'react-router-dom';

import ContentHeader from "../../components/ContentHeader";

import SelecInput from "../../components/SelectInput";

import HistoryFinanceCard from "../../components/HistoryFinanceCard";

import { Container, Content, Filters } from "./styles";

import expenses from "../../repositories/expenses";
import gains from "../../repositories/gains";

import formatCurrency from '../../utils/formatCurrency';

import formatDate from '../../utils/fromatDate';

interface IData {
    id: string;
    description: string;
    amountFormatted: string;
    type: string;
    frequency: string;
    dateFormatted: string;
    tagColor: string;
}

const List: React.FC = () => {

    const [data, setData] = useState<IData[]>([

    ]);

    const { type } = useParams();

    const title = useMemo(() => {
        return type === 'entry-balance' ? {
            title: 'Entradas',
            lineColor: '#F7931B'
        } : {
            title: 'Saídas',
            lineColor: '#E44C4E'
        };
    }, [type]);

    const listData = useMemo(() => {
        return type === 'entry-balance' ? gains : expenses;
    }, [type])

    const months = [
        { value: 7, label: "Julho" },
        { value: 8, label: "Agosto" },
        { value: 9, label: "Setembro" },
    ];

    const years = [
        { value: 2022, label: 2022 },
        { value: 2019, label: 2019 },
        { value: 2018, label: 2018 },
    ];

    useEffect(() => {
        const response = listData.map(item => {
            return {
                id: String(Math.random() * data.length),
                description: item.description,
                amountFormatted:formatCurrency( Number(item.amount)),
                type: item.type,
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency==='recorrente'?'#4E41F0':'#E44C4E',
            }
        });

        setData(response);
    },[data.length, listData]);

    return (
        <Container>
            <ContentHeader lineColor={title.lineColor} title={title.title}>
                <SelecInput options={months} />
                <SelecInput options={years} />
            </ContentHeader>
            <Filters>
                <button type="button" className="tag-filter tag-filter-recurrent">
                    Recorrentes
                </button>
                <button type="button" className="tag-filter tag-filter-eventual">
                    Eventuais
                </button>
            </Filters>
            <Content>


                {
                    data.map(item => (
                        <HistoryFinanceCard
                        key={item.id}
                            amount={item.amountFormatted}
                            subtitle={item.dateFormatted}
                            tagColor={item.tagColor}
                            title={item.description}
                        />
                    ))
                }


            </Content>
        </Container>
    );
};

export default List;
