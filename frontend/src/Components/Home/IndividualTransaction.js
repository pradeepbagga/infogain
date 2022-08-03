import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransactionAction } from '../../Redux/Slices/Transaction/getTransactionSlice';
import Loader from './../Loader/Loader';
import './Transaction.scss';
import TransactionList from './TransactionList';


const UpdateData = (data) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const newData = data.map((item) => {

        let points = 0;
        let month = 0;
        let year = 0;

        /* *********** GET POINTS *********** */
        if(item.amount > 100) {
            let over100 = item.amount - 100;
            points += over100 * 2;
            let over50 = item.amount - over100;
            over50 = over50 - 50;
            points += over50 * 1;
        }
        if(item.amount > 50 && item.amount < 100) {
            let over50 = item.amount - 50;
            points += over50 * 1;
        }
        /* *********** GET MONTH, YEAR *********** */
        month = new Date(item.createdAt).getMonth();
        month = months[month];
        year = new Date(item.createdAt).getFullYear();

        return {...item, points, month, year }

    });

    return newData;
}

const IndividualTransaction = () => {
    const dispatch = useDispatch();
    const { loader, data } = useSelector((state) => state.getAllTransactions);
    let uniqueNames = [];
    const [dataUpdated, setDataUpdated] = useState();
    const [names, setNames] = useState();

    useEffect(() => {
        dispatch(getAllTransactionAction());
    }, []);

    useEffect(() => {
        if (data) {
            const key = 'customerName';
            uniqueNames = [...new Map(data.map(item => [item[key], item])).values()];

            const result = UpdateData(data);
            setDataUpdated(result);

            setNames(uniqueNames);
        }
    }, [data]);

    return (
        <React.Fragment>
            {
                loader ? <Loader /> : (
                    <div>
                        {
                            (dataUpdated && names) && <TransactionList names={names} data={dataUpdated} />
                        }
                        
                    </div>
                )
            }
        </React.Fragment>
    )
}

export default IndividualTransaction