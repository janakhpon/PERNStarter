import React from 'react'
import Container from '@material-ui/core/Container'
import PageNavbar from '../shared/navbar'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  layout: {
    marginTop: theme.spacing(2),
  },
}));

const Layout = (props) => {
  const classes = useStyles()
  return (
    <>
      <PageNavbar />
        <Container maxWidth="md" className={classes.layout}>
        {props.children}
      </Container>
    </>
  )

}

export default Layout