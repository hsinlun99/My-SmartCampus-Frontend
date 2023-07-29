import React from 'react'
import { Drawer, Toolbar, IconButton, Typography, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import CustomButton from '../CustomButton'

const useStyles = makeStyles((theme) => ({
  drawerPaperStyle: {
    borderRadius: '20px 20px 0 0',
    backgroundColor: '#FAFAFA',
    overflow: 'hidden',
    zIndex: '20',
    [theme.breakpoints.up('sm')]: {
      width: '400px'
    }
  },
  drawerContentFull: {
    minHeight: 450,
    height: 'calc(100vh - 100px)'
  },
  titleBar: {
    position: 'sticky',
    top: 0,
    width: '100%',
    height: 40,
    backgroundColor: '#FAFAFA',
    zIndex: 100
  },
  missionContent: {
    backgroundColor: '#FAFAFA',
    paddingBottom: 64
  },
  closeButton: {
    padding: 0
  },
  titleActionContainer: {
    position: 'absolute',
    right: '15px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
}))


const ResearchFormDrawer = (props) => {
  const {
    children,
    open,
    handleClose,
    handleBack,
    fullHeight,
    closeButton,
    title,
    titleActions,
    variant
  } = props
  const classes = useStyles()

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  return(
    <Drawer
      anchor={matches ? 'left' : 'bottom'}
      open={open}
      onClose={handleClose}
      classes={{ paper: classes.drawerPaperStyle }}
      variant={variant}
    >
      {children}

    </Drawer>
  )
}

export default ResearchFormDrawer