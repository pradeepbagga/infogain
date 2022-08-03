import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import './Form.scss';
import { addTransactionAction, clearError, clearMessage } from '../../Redux/Slices/Transaction/transactionSlice';
import { useAlert } from 'react-alert';
import Loader from '../Loader/Loader';

const AddTransaction = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, loader, message } = useSelector((state) => state.transaction);

    const userNames = ["Pradeep", "Vikas", "Amit", "Sunny"];

    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(null);
    const [newDate, setNewDate] = useState("");


    useEffect(() => {
        if (date) {
            // console.log("TYPE ", date);
            let newDate = new Date(date);
            newDate = new Date(`${date.getFullYear()
                }-${String(101 + date.getMonth()).substr(1)
                }-${String(100 + date.getDate()).substr(1)
                }`).toISOString();
            setNewDate(newDate);
        }
    }, [date]);

    useEffect(() => {
        if (name) {
            const indexValue = userNames.indexOf(name);
            setId(indexValue + 1);
        }

        if (error) {
            if (typeof (error) == "object") {
                let newError = [];
                error.forEach((err, index) => {
                    return newError.push(<p key={index}>{err}</p>)
                });
                alert.error(newError);
                dispatch(clearError());
            }
            else {
                alert.error(error);
                dispatch(clearError());
            }
        }
        if (message) {
            alert.success(message);
            dispatch(clearMessage());
        }

    }, [name, id, alert, error, message, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            customerId: id,
            customerName: name,
            amount,
            createdAt: newDate
        };

        dispatch(addTransactionAction(formData));

        setId(null);
        setName("");
        setAmount("");
        setDate(null);
        setNewDate("");
    }

    return (
        <React.Fragment>
            {
                loader ? <Loader /> : (
                    <div className="form-add-transaction">
                        <form onSubmit={(e) => handleSubmit(e)}>

                            <div className="form-row">
                                <TextField
                                    select
                                    label="Customer Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                    {
                                        userNames.map((option, index) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))
                                    }
                                </TextField>
                            </div>
                            <div className="form-row">
                                <TextField
                                    label="Amount"
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                            <div className="form-row">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Choose Date"
                                        renderInput={(params) => <TextField {...params} />}
                                        value={date}
                                        onChange={(newValue) => {
                                            setDate(newValue);
                                        }}
                                        maxDate={new Date()}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div className="form-row">
                                <Button variant="contained" type='submit'>Add Transaction</Button>
                            </div>
                        </form>
                    </div>
                )
            }

        </React.Fragment>
    )
}

export default AddTransaction