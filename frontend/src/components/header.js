import { AppBar, Toolbar, Typography } from '@material-ui/core'
import React from 'react'

const header = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#2d3436',color: '#fff'}}>
    <Toolbar>
      <Typography variant="h6" style={{textAlign: 'center' , width: '100%'}}>
        Dynamic Routine Maker
      </Typography>
    </Toolbar>
  </AppBar>
  )
}

export default header
