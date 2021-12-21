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

import listOfMonths from '../../utils/months';

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

    const [data, setData] = useState<IData[]>([]);
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth()+1);
    const [yearSelected, setYearSelected] = useState<number>(2020);
    const [selectedFrequency, setSelectedFrequency] = useState<string[]>(['recorrente','eventual']);

    const { type } = useParams();

    const pagData = useMemo(() => {
        return type === 'entry-balance' ? {
            title: 'Entradas',
            lineColor: '#F7931B',
            data: gains,
        } : {
            title: 'Saídas',
            lineColor: '#E44C4E',
            data: expenses,
        };
    }, [type]);

    

    const years = useMemo(()=>{
        let uniqueyears: number[] = [];

        pagData.data.forEach(item=> {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if(!uniqueyears.includes(year)){
                uniqueyears.push(year);
            }
        })

        return uniqueyears.map(year=>{
            return {
                value: year,
                label: year
            }
        });

    },[pagData]);

    const months = useMemo(()=>{
       return listOfMonths.map((month,index)=>{
           return {
               value: index+1,
               label: month
           }
       });

    },[]);


    function handleFrequencyClick(frequency: string): void {
        const alreadySelected = selectedFrequency.findIndex(item=> item=== frequency);

        if(alreadySelected>= 0){
            const filtered = selectedFrequency.filter(item => item !== frequency);
            setSelectedFrequency(filtered);
        }else{
            setSelectedFrequency((prev) => [...prev, frequency]);
        }
    }

    function handleMonthSelected(month: string): void | undefined {
        try{
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        }catch(error){
            throw new Error('invalid month value');
        }
    }
    
    function handleYearSelected(year: string): void | undefined {
        try{
            const parseYear = Number(year);
            setYearSelected(parseYear);
        }catch(error){
            throw new Error('invalid year value');
        }
    }

    useEffect(() => {
        const filteredData = pagData.data.filter(item => {

            const date = new Date(item.date);
            const month = date.getMonth()+1;
            const year = date.getFullYear();

            return month === monthSelected && year === yearSelected && selectedFrequency.includes(item.frequency);
        });

        const formattedData = filteredData.map(item => {
            

            return {
                id: String(Math.random() * filteredData.length),
                description: item.description,
                amountFormatted:formatCurrency( Number(item.amount)),
                type: item.type,
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency==='recorrente'?'#4E41F0':'#E44C4E',
            }
        });

        setData(formattedData);
    },[data.length, pagData, monthSelected, yearSelected,selectedFrequency]);


    

    return (
        <Container>
            <ContentHeader lineColor={pagData.lineColor} title={pagData.title}>
                <SelecInput options={months} onChange={(e)=> handleMonthSelected(e.target.value)} defaultValue={monthSelected}/>
                <SelecInput options={years} onChange={(e)=> handleYearSelected(e.target.value)} defaultValue={yearSelected }/>
            </ContentHeader>
            <Filters>
                <button type="button" className=
                {` tag-filter tag-filter-recurrent ${selectedFrequency.includes('recorrente') && 'tag_actived'} `}
                onClick={()=> handleFrequencyClick('recorrente')}
                >
                    Recorrentes
                </button>
                <button type="button" className=
                {`tag-filter tag-filter-eventual ${selectedFrequency.includes('eventual') && 'tag_actived'} `}
                onClick={()=> handleFrequencyClick('eventual')}
                >
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




