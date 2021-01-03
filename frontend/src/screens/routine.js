import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NotFound from '../components/notFound'
import { AppBar, Container, Toolbar, Typography, Paper, Button, Table, TableRow, TableHead, TableBody, TableCell } from '@material-ui/core'
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import getWeekday from '../utils/getWeekday'
import logo from '../giphy.webp'
import Preloader from '../components/preloader'

const SERVER_URL = 'https://dynamic-routine.herokuapp.com'

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

const RoutineScreen = ({ match }) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [heading, setHeading] = useState('Today\'s Class')
    const [routineName, setRoutineName] = useState('')
    const [createrName, setCreaterName] = useState('')
    const [routineTime, setRoutineTime] = useState([])

    // routineTime - [{1,2:30, math}, {2,....}]


    useEffect(() => {
        // if not available in localstorage save in localstorage
        const getData = async () => {
            let fetchData = localStorage.getItem(match.params.slug)
            let routineName;
            let yourName;
            let timetable;
            if(fetchData){
                routineName = JSON.parse(fetchData).routineName
                yourName = JSON.parse(fetchData).yourName
                timetable = JSON.parse(fetchData).routine
            }else{
                let { data } = await axios.get(`${SERVER_URL}/routine/${match.params.slug}`)
                // console.log("fetching...")
                if (!data.success) {
                    setError(true)
                } else {
                    setError(false)
                    // calculation
                    routineName = data.routine.routineName
                    yourName = data.routine.yourName
                    timetable = JSON.parse(data.routine.routine)
                    localStorage.setItem(match.params.slug, JSON.stringify({
                        yourName, routineName, routine: timetable
                    }))
                }
                
            }
            setRoutineName(routineName)
            setCreaterName(yourName)
            // console.log(timetable)

            // get current time
            let currentDate = new Date()
            let currentWeekday = getWeekday(currentDate.getDay())

            let currentWeekdayRoutine = timetable[currentWeekday]

            // holiday
            if(!currentWeekdayRoutine || currentWeekdayRoutine.length === 0){
                setHeading("Today is Holiday Enjoy 😉")
                setLoading(false)
                return;
            }else{
                let list = []
                currentWeekdayRoutine.forEach((sub, index) => {
                    list.push({
                        period: index+1,
                        time: sub['time'],
                        subject: sub['subject']
                    })
                })
                setRoutineTime(list)
            }
            setLoading(false)
        }
        getData()
    },[match.params.slug])

    return (
        <div>
            {loading? <Preloader />:
            <>
            {error ? <NotFound /> : (
                <>
                    <AppBar position="static" style={{ backgroundColor: '#2d3436',color: '#fff'}}>
                        <Toolbar>
                            <Typography variant="h6" style={{ textAlign: 'center' , width: '100%'}}>
                                {heading}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Container style={{marginTop: 20}}>
                        {routineTime.length>0
                        ?<Table>
                        <TableHead style={{backgroundColor: '#222f3e'}}>
                            <TableRow>
                                <TableCell style={{color: '#fff'}}>Period</TableCell>
                                <TableCell style={{color: '#fff'}} align="right">Time</TableCell>
                                <TableCell style={{color: '#fff'}} align="right">Subjects</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                routineTime.map(sub => (
                                    <StyledTableRow key={sub.period}>
                                        <TableCell>{sub.period}</TableCell>
                                        <TableCell align="right">{sub.time}</TableCell>
                                        <TableCell align="right">{sub.subject}</TableCell>
                                    </StyledTableRow>
                                ))
                            }
                        </TableBody>
                    </Table> 
                        :<div style={{ width:'100%', textAlign:'center'}}><img src={logo} style={{width:'100%', height:'100%', maxHeight:'90vh'}} alt='HMM:)' /></div>}
                        
                    </Container>
                    <Paper style={{marginTop: 20, padding: 10, backgroundColor: '#2d3436'}}>
                        <Container>
                            <Typography variant="overline" display="block" style={{ textAlign: 'center', color: '#fff' }}>
                                {routineName} is Created by {createrName}
                            </Typography>
                            <div style={{textAlign:'center', width:'100%', marginTop:10}}>
                            
                            <Link to='/' style={{ textDecoration: 'none' }}>
                                <Button variant="contained" color="secondary">Create Your Own Routine</Button>
                            </Link>
                            </div>
                        </Container>
                    </Paper>
                </>
            )}
            </>
        }
        </div>
    )
}

export default RoutineScreen
