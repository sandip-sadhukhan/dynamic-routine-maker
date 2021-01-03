import React, { useEffect, useState } from 'react'
import { TextField, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const MyTable = ({ setRoutineTime, routineTime, weekday, totalPeriod, setSubject, subjects }) => {

    const [periodsName, setPeriodsName] = useState([]);
    const [weekdaysName, setWeekdaysName] = useState([]);

    useEffect(() => {
        let list = []
        for (const key in weekday) {
            if (weekday[key]) {
                list.push(key)
            }
        }
        setWeekdaysName(list)
    }, [weekday])

    useEffect(() => {
        let list = []
        for (let i = 1; i <= parseInt(totalPeriod); i++) {
            list.push(i.toString())
        }
        setPeriodsName(list)
    }, [totalPeriod])

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.common.black,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Day/Time</StyledTableCell>
                        {
                            periodsName.map(period => (
                                <StyledTableCell key={period} align="right">
                                    <TextField
                                        id="time"
                                        label={period}
                                        type="time"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                        value={routineTime[period]}
                                        onChange={(e) => { setRoutineTime(period, e.target.value) }}
                                    />
                                </StyledTableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {weekdaysName.map((day) => (
                        <StyledTableRow key={day}>
                            <StyledTableCell component="th" scope="row">
                                {day}
                            </StyledTableCell>
                            {periodsName.map(period => (
                                <StyledTableCell align="right" key={`${day}_${period}`}>
                                    <TextField id="filled-basic" variant="outlined" value={subjects[day][`${period}`]} size={'small'} onFocus={() => {}} onBlur={(e) => setSubject(period, day, e.target.value)} autoComplete='off' />
                                </StyledTableCell>
                            ))
                            }
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MyTable
