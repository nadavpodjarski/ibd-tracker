import React, { FC } from 'react'
import { Box, Typography, makeStyles, Button } from '@material-ui/core'

import Logo from '../../../common/components/app-logo'

import { Link } from 'react-router-dom'
import { homePaths } from '../../../core/routes/routes.config'

const useStyles = makeStyles((theme) => ({
   header: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
   },
   navLinksWrapper: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end'
   },
   innerHeader: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: 1200,
      padding: theme.spacing(2)
   },
   loginButton: {
      border: `1px solid ${theme.palette.primary.main}`,
      textTransform: 'none',
      color: theme.palette.primary.main,
      borderRadius: 25,
      width: 100,
      '&:hover': {
         background:
            'linear-gradient(90deg, rgba(56,163,165,1) 0%, rgba(56,163,165,1) 33%, rgba(80,135,174,1) 65%, rgba(172,28,209,1) 100%, rgba(172,28,209,1) 100%)',
         color: theme.palette.common.white
      },
      transition: 'all 0.2s linear'
   },
   logogWrapper: {
      display: 'flex',
      justifyContent: 'flex-start',
      height: '100%',
      alignItems: 'center',
      textDecoration: 'none',
      color: theme.palette.common.black
   }
}))

const Header: FC<{ loginFormModalToggler: () => void }> = ({
   loginFormModalToggler
}) => {
   const classes = useStyles()
   return (
      <Box className={classes.header}>
         <Box className={classes.innerHeader}>
            <Link to={homePaths.HOME} className={classes.logogWrapper}>
               <Logo size={48} />
               <Typography
                  variant="h4"
                  style={{
                     letterSpacing: 3
                  }}
               >
                  Mitummy
               </Typography>
            </Link>
            <Box className={classes.navLinksWrapper}>
               <Button
                  className={classes.loginButton}
                  onClick={loginFormModalToggler}
               >
                  Login
               </Button>
            </Box>
         </Box>
      </Box>
   )
}

export default Header