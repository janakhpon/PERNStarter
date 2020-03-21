import React, { useEffect, useState } from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Layout from '../components/layout'
import Button from '@material-ui/core/Button'
import Head from 'next/head'
import Grid from '@material-ui/core/Grid'
import CustomTextField from '../components/CustomTextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper'
import axios from 'axios'
import Item from '../components/Item'
import moment from 'moment'
import URL from '../config'
import { useTheme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  itemcontainer: {
    marginTop: theme.spacing(4),
  },
  Dialog: {
    background: '#1d3557',
    color: 'white',
  },
  vspacing: {
    height: '0.5rem',
    marginBottom: '2rem',
  },
  item: {
    margin: '0.2rem',
  }
}));

const NOTI_VALUES = {
  msg: '',
  err: ""
}

const INITIAL_STATE = {
  text: ""
}

const index = () => {
  const [values, setValues] = useState(INITIAL_STATE)
  const [resdata, setResdata] = useState([])
  const [noti, setNoti] = React.useState(NOTI_VALUES)
  const [open, setOpen] = useState(false)

  let time = moment().format("dddd, MMMM Do YYYY, h:mm:ss a")

  useEffect(() => {
    let isSubscribed = true

    const getText = async () => {
      try {
        let res = await axios.get(`${URL.url}`)
        if (isSubscribed) {
          setResdata(res)
          setNoti({ msg: `Login as` })
        }
      } catch (err) {
        setNoti({ err: "session expired! Login again" })
      }
    }

    try {
      getText()
    } catch (err) {
      setNoti({ err: "session expired! Login again" })
    }
    return () => isSubscribed = false
  }, [resdata])



  const classes = useStyles()
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const handleChange = (e) => {
    e.persist();
    setValues(previousValues => ({
      ...previousValues, [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let url = `${URL.url}`
      let data = {
        text: values.text
      }
      let res = await axios({
        method: 'post',
        url: url,
        data: data,
        config: { headers: { 'Content-Type': 'application/json' } }
      })
      console.log(res)

    } catch (err) {
      setNoti({ err: "session expired! Login again" })
    }
  }


  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Layout>
      <Head>
        <title>HOME</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <link rel="shortcut icon" href="https://avatars1.githubusercontent.com/u/46496244?s=400&u=9611ffb5e3cb7039ee5c6bdee55ee12668d53a7c&v=4" />
      </Head>

      <Paper elevation={0} className={classes.Dialog}>
        <Grid container direction="row" justify="center" alignitems="center">
          <Grid item xs={4}>
            <Fab color="primary" aria-label="add">
              <AddIcon onClick={handleClickOpen} />
            </Fab>
          </Grid>
          <Grid item xs={8}>
            <p> {time} </p>
          </Grid>
        </Grid>
      </Paper>
      <Grid container direction="row" justify="center" alignitems="center" className={classes.vspacing}>
        <Grid item xs={12}>

        </Grid>
      </Grid>
      {
        resdata && resdata.data ? (
          resdata.data.map((task, key) => {
            return <Item task={task} key={key} />
          })
        ) :
          ('')
      }
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-text"
        PaperProps={{
          classes: {
            root: classes.Dialog
          }
        }}
      >
        <DialogTitle id="responsive-dialog-text">{" Don't leave a thing when it comes to implementation! List them all .. "}</DialogTitle>
        <DialogContent>
          <CustomTextField
            onChange={handleChange}
            value={values.text}
            autoFocus
            margin="dense"
            id="name"
            name="text"
            label="Your todo text ..."
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="contained" color="primary" onClick={handleSubmit}>
            SAVE
          </Button>
          <Button onClick={handleClose} variant="contained" color="secondary">
            NOPE
          </Button>
        </DialogActions>
      </Dialog>

    </Layout>
  )
}

export default index