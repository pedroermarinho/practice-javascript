import React, { useMemo, useState, useEffect } from "react";

import SelecInput from "../../components/SelectInput";

import ContentHeader from "../../components/ContentHeader";

import listOfMonths from '../../utils/months';

import { Container, Content } from "./styles";

import expenses from "../../repositories/expenses";
import gains from "../../repositories/gains";

import WallerBox from "../../components/WallerBox";


const Dashboard: React.FC = ()=> {

    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth()+1);
    const [yearSelected, setYearSelected] = useState<number>(2020);

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
    const months = useMemo(()=>{
        return listOfMonths.map((month,index)=>{
            return {
                value: index+1,
                label: month
            }
        });
 
     },[]);
     const years = useMemo(()=>{
        let uniqueyears: number[] = [];

        [...gains,...expenses].forEach(item=> {
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

    },[]);

  
    return (
        <Container>
            <ContentHeader title="Dasborad" lineColor="#fff">
            <SelecInput options={months} onChange={(e)=> handleMonthSelected(e.target.value)} defaultValue={monthSelected}/>
                <SelecInput options={years} onChange={(e)=> handleYearSelected(e.target.value)} defaultValue={yearSelected }/>
            </ContentHeader>
            <Content>
                <WallerBox 
                    title="Saldo"
                    color="#4E41F0"
                    amount={150.00}
                    footerLabel="Atulizado com base nas entradas e saídas"
                    icon="dollar"
                />
                <WallerBox 
                    title="Entradas"
                    color="#F7931B"
                    amount={5000.00}
                    footerLabel="Atulizado com base nas entradas e saídas"
                    icon="arrowUp"
                />
                <WallerBox 
                    title="Saídas"
                    color="#E44C4E"
                    amount={150.00}
                    footerLabel="Atulizado com base nas entradas e saídas"
                    icon="arrowDown"
                />
            </Content>
        </Container>
    );
}

export default Dashboard; 