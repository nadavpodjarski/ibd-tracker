import React, { FC, CSSProperties } from 'react'
import { Grid, Box, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
   socialLoginButton: {
      border: `1px solid rgba(0,0,0,0.1)`,
      borderRadius: '25px',
      color: 'rgba(0,0,0,0.7)',
      width: '100%',
      padding: '12px 8px',
      cursor: 'pointer',
      transition: 'box-shadow 0.2s linear',
      boxShadow: theme.shadows[1],
      '&:hover': {
         boxShadow: theme.shadows[6]
      },
      '&:active': {
         boxShadow: theme.shadows[1]
      }
   },
   socialTypo: {
      whiteSpace: 'nowrap',
      fontSize: '14px',
      height: '100%',
      display: 'flex',
      alignItems: 'center'
   },
   socialLogoWrapper: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      justifyContent: 'center'
   }
}))
const SocialLoginButton: FC<{
   img: string
   onClick: () => void
   title: string
   style?: CSSProperties
}> = ({ img, title, onClick, style }) => {
   const classes = useStyles()
   return (
      <Grid
         container
         alignItems="center"
         className={classes.socialLoginButton}
         onClick={onClick}
         style={style}
      >
         <Grid item xs={3} md={3}>
            <Box className={classes.socialLogoWrapper}>
               <img width="28px" height="28px" src={img} alt="" />
            </Box>
         </Grid>
         <Grid item xs={9}>
            <Typography className={classes.socialTypo}>{title}</Typography>
         </Grid>
      </Grid>
   )
}

export default SocialLoginButton
