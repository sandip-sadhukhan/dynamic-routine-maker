import { Grid, TextField, Switch, FormControlLabel, Typography } from '@material-ui/core'
import React from 'react'

const inputs = ({ yourName, routineName, setYourName, setRoutineName, totalPeriod, setTotalPeriod, handleWeekdayChange, weekday }) => {
    return (
        <Grid container spacing={3} style={{ marginBottom: 20 }}>
            <Grid item xs={12} sm={5}>
                <TextField fullWidth id="outlined-basic" label="Your Name" variant="outlined" value={yourName} onChange={(e) => setYourName(e.target.value)} autoComplete='off' />
            </Grid>
            <Grid item xs={12} sm={5}>
                <TextField fullWidth id="outlined-basic" label="Routine Name" variant="outlined" value={routineName} onChange={(e) => setRoutineName(e.target.value)} autoComplete='off' />
            </Grid>
            <Grid item xs={12} sm={2}>
                <TextField fullWidth id="outlined-select-currency-native" select label="Total Periods" value={totalPeriod} onChange={(e) => setTotalPeriod(e.target.value)} helperText="Select total periods"
                    variant="outlined" SelectProps={{
                        native: true,
                    }}>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))
                    }
                </TextField>
            </Grid>
            <Grid item xs={12} sm={12}>
                <Grid item xs={6} sm={12}>
                <Typography variant="h6" style={{textAlign: 'center', marginBottom:20}}>
                    Choose Days
                </Typography>
                </Grid>
                <Grid container spacing={3} style={{ marginBottom: 20 }}>
                    <Grid item xs={6} sm={3}>
                        <FormControlLabel
                            control={<Switch checked={weekday["Sunday"]} name="Sunday" onChange={handleWeekdayChange} />}
                            label="Sunday"
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <FormControlLabel
                            control={<Switch checked={weekday["Monday"]} name="Monday" onChange={handleWeekdayChange}/>}
                            label="Monday"
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <FormControlLabel
                            control={<Switch checked={weekday["Tuesday"]} name="Tuesday" onChange={handleWeekdayChange}/>}
                            label="Tuesday"
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <FormControlLabel
                            control={<Switch checked={weekday["Wednesday"]} name="Wednesday" onChange={handleWeekdayChange}/>}
                            label="Wednesday"
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <FormControlLabel
                            control={<Switch checked={weekday["Thursday"]} name="Thursday" onChange={handleWeekdayChange}/>}
                            label="Thursday"
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <FormControlLabel
                            control={<Switch checked={weekday["Friday"]} name="Friday" onChange={handleWeekdayChange}/>}
                            label="Friday"
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <FormControlLabel
                            control={<Switch checked={weekday["Saturday"]} name="Saturday" onChange={handleWeekdayChange}/>}
                            label="Saturday"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default inputs
