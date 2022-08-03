import React from 'react';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Grid from '@mui/material/Grid';

const CurrentMonthData = ({ user, data, currentMonth, currentYear }) => {
    let monthlyTransactions = 0;
    let monthlyAmount = 0;
    let monthlyPoints = 0;

    let dataList = data.filter((item) => {

        if ((item.customerName === user) && (item.month === currentMonth) && (item.year === currentYear)) {
            return item
        }

    });

    if (dataList.length > 0) {
        monthlyTransactions = dataList.length;
        return (
            <TreeItem nodeId={`${user}-${currentMonth}`} label={currentMonth} className="level-2-tree">
                <Grid container spacing={2} className="tree-data">
                    <Grid item xs={4}>
                        <strong>Amount</strong>
                    </Grid>
                    <Grid item xs={4}>
                        <strong>Date</strong>
                    </Grid>
                    <Grid item xs={4}>
                        <strong>Points</strong>
                    </Grid>
                    {
                        dataList.map((item) => {
                            monthlyAmount += item.amount;
                            monthlyPoints += item.points;
                            return (<React.Fragment key={item._id}>
                                <Grid item xs={4}>
                                    {item.amount}
                                </Grid>
                                <Grid item xs={4}>
                                    {item.createdAt.substring(0, 10)}
                                </Grid>
                                <Grid item xs={4}>
                                    {item.points}
                                </Grid>
                            </React.Fragment>)
                        })
                    }
                </Grid>
                <Grid container>
                   &nbsp;&nbsp;<strong>Monthly Amount </strong>&nbsp;{ monthlyAmount }; &nbsp;<strong>Monthly Transactions: </strong>&nbsp;{ monthlyTransactions }; &nbsp;<strong>Monthly Points: </strong>&nbsp; {monthlyPoints}
                </Grid>
            </TreeItem>
        )
    }
    else {
        return null
    }

}


const TransactionList = ({ names, data }) => {

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let currentMonth = new Date().getMonth();
    let previousMonth2 = currentMonth - 1;
    let previousMonth3 = currentMonth - 2;
    let currentYear = new Date().getFullYear();

    currentMonth = months[currentMonth];
    previousMonth2 = months[previousMonth2];
    previousMonth3 = months[previousMonth3];

    return (
        <div className="last-3-months-details">
            <h3>Last 3 Months Details</h3>
            <div className="tree-container">
                <TreeView
                    aria-label="multi-select"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    multiSelect

                >
                    {
                        names && names.map((item) => {
                            return (
                                <TreeItem key={item.customerName} nodeId={`${item.customerName}`} label={item.customerName} className="level-1-tree">
                                    <CurrentMonthData user={item.customerName} data={data} currentMonth={currentMonth} currentYear={currentYear} />
                                    <CurrentMonthData user={item.customerName} data={data} currentMonth={previousMonth2} currentYear={currentYear} />
                                    <CurrentMonthData user={item.customerName} data={data} currentMonth={previousMonth3} currentYear={currentYear} />
                                </TreeItem>
                            )
                        })
                    }

                </TreeView>
            </div>
        </div>
    )
}

export default TransactionList