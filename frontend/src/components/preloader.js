import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

const Preloader = () => {
  return (
    <div style={{width: '100%', height: '100vh', display:'flex', justifyContent: 'center', alignItems:'center'}}>
      <CircularProgress color="secondary" />
    </div>
  )
}

export default Preloader
