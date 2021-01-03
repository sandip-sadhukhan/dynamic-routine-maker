import React, { useState } from 'react'
import { Container, Typography, Button, Snackbar, CircularProgress, Paper } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Header from '../components/header'
import Inputs from '../components/inputs'
import MyTable from '../components/mytable'
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
const SERVER_URL = 'https://dynamic-routine.herokuapp.com'


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}



const CreateScreen = () => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }
    const initialState = {
        yourName: '',
        routineName: '',
        table: {
            Sunday: {},
            Monday: {},
            Tuesday: {},
            Wednesday: {},
            Thursday: {},
            Friday: {},
            Saturday: {}
        },
        time: {}
    }



    const [open, setOpen] = useState(false);
    const [done, setDone] = useState(false);
    const [slug, setSlug] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('Error!');
    const [routineData, setRoutineData] = useState(initialState);
    const [totalPeriod, setTotalPeriod] = useState("9");
    const [weekday, setWeekday] = useState({
        Sunday: false,
        Monday: true,
        Tuesday: true,
        Wednesday: true,
        Thursday: true,
        Friday: true,
        Saturday: true
    });

    const setYourName = (name) => {
        setRoutineData({
            ...routineData,
            yourName: name
        })
    }

    const setRoutineName = (name) => {
        setRoutineData({
            ...routineData,
            routineName: name
        })
    }

    const setRoutineTime = (periodNumber, time) => {
        setRoutineData({
            ...routineData,
            time: { ...routineData.time, [periodNumber]: time }
        })
    }

    const handleWeekdayChange = (event) => {
        setWeekday({ ...weekday, [event.target.name]: !weekday[event.target.name] });
    };

    const setSubject = (period, day, subject) => {
        // console.log(period, day, subject)
        setRoutineData({
            ...routineData,
            table: { ...routineData.table, [day]: { ...routineData.table[day], [period]: subject } }
        })
    }

    const saveRoutine = async () => {
        let yourName = routineData.yourName.trim()
        let routineName = routineData.routineName.trim()
        let isEmptyPeriodTime = false;
        for (let i = 1; i <= parseInt(totalPeriod); i++) {
            if (!routineData.time[i]) {
                isEmptyPeriodTime = true
                break;
            }
        }
        let isSorted = true;
        let keys = Object.keys(routineData.time)
        for (let i = 0; i < keys.length - 1; i++) {
            if (routineData.time[keys[i]] > routineData.time[keys[i + 1]]) {
                isSorted = false
                break;
            }
        }

        if (yourName === '' || routineName === '' || isEmptyPeriodTime || !isSorted) {
            if (yourName === '') {
                setErrorMsg('Please enter your name')
            }
            else if (routineName === '') {
                setErrorMsg('Please enter routine name')
            }
            else if (isEmptyPeriodTime) {
                setErrorMsg('Please enter all period\'s time')
            }
            else if (!isSorted) {
                setErrorMsg('Please enter all period\'s time in accending order')
            }
            setOpen(true)
            return;
        }

        // save
        let savedDict = {}



        for (const key in weekday) {
            if (weekday[key]) {
                let data = routineData.table[key] || {}
                for (const period in data) {
                    if (!savedDict[key]) {
                        savedDict[key] = []
                    }
                    savedDict[key].push({
                        'time': routineData.time[period],
                        'subject': data[period]
                    })
                }
            }
        }

        setLoading(true)

        // async
        let sentData = {
            'routine': savedDict,
            'yourName': yourName,
            'routineName': routineName
        }

        // console.log(JSON.stringify(sentData))
        let returnedData = await axios.post(`${SERVER_URL}/create/`, sentData)

        // console.log(returnedData.data)

        // Save to local storage
        localStorage.setItem(returnedData.data.slug, JSON.stringify(sentData))

        // go to routine page
        setSlug(returnedData.data.slug)
        setDone(true)

        setLoading(false)
    }



    return (
        <>
            {done ? <Redirect to={`/${slug}`} /> : <>
                <Header />
                <Container maxWidth="lg" style={{ marginTop: 20, textAlign: 'center' }}>
                    <Inputs yourName={routineData.yourName} routineName={routineData.routineName}
                        setYourName={setYourName} setRoutineName={setRoutineName} totalPeriod={totalPeriod} setTotalPeriod={setTotalPeriod} handleWeekdayChange={handleWeekdayChange} weekday={weekday} />
                    <MyTable setRoutineTime={setRoutineTime} routineTime={routineData.time} weekday={weekday} totalPeriod={totalPeriod} setSubject={setSubject} subjects={routineData.table} />
                    <Button disabled={loading} variant="contained" color="secondary" style={{ marginTop: 20, marginBottom: 10 }} onClick={saveRoutine}>
                        Submit
      {loading ? <CircularProgress color="secondary" /> : < ArrowRightAltIcon />}
                    </Button>
                    {/* <Typography variant="overline" display="block" gutterBottom>
        Made by <a href="https://sandipsadhukhan.tk" target="blank">Sandip Sadhukhan</a>
      </Typography> */}
                </Container >
                <Paper style={{ marginTop: 20, padding: 10, backgroundColor: '#2d3436' }}>
                    <Container>
                        <Typography variant="overline" display="block" style={{ textAlign: 'center', color: '#fff' }}>
                            Made by <a style={{ color: '#fff', textDecoration: 'none' }} href="https://sandipsadhukhan.tk" target="blank">Sandip Sadhukhan</a>
                        </Typography>
                    </Container>
                </Paper>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        {errorMsg}
                    </Alert>
                </Snackbar>
            </>}
        </>
    )
}

export default CreateScreen
