import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Paper from '@material-ui/core/Paper'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
import CustomTextField from '../CustomTextField'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import axios from 'axios'
import moment from 'moment'
import * as URL from '../../config'
import { useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    Dialog: {
        background: '#1d3557',
        color: 'white',
    },
    Paper: {
        background: '#1d3557',
        color: 'white',
        height: '100%',
        width: '100%',
        padding: '0.5rem',
    }
}));

const NOTI_VALUES = {
    msg: '',
    err: ""
}

const Item = ({ task }) => {

    const INITIAL_STATE = {
        _id: task ? (task._id) : (''),
        description: task ? (task.description) : (''),
        created_at: task ? (task.created_at) : (''),
    }
    const [values, setValues] = React.useState(INITIAL_STATE)
    const [open, setOpen] = React.useState(false)
    const [noti, setNoti] = React.useState(NOTI_VALUES)
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
            let url = `${URL.urlid}${values._id}`
            let data = {
                description: values.description
            }
            let res = await axios({
                method: 'put',
                url: url,
                data: data,
                config: { headers: { 'Content-Type': 'application/json' } }
            })
            console.log(res)

        } catch (err) {
            setNoti({ err: "session expired! Login again" })
        }
    }


    const handleRemove = async (e) => {
        e.preventDefault()
        try {
            let url = `${URL.urlid}${values._id}`
            let res = await axios({
                method: 'delete',
                url: url,
                config: { headers: { 'Content-Type': 'application/json' } }
            })
            console.log(res)

        } catch (err) {
            setNoti({ err: "session expired! Login again" })
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <Grid item xs={12} className={classes.itemcontainer} id={values._id}>
                <Paper elevation={3} className={classes.Paper}>
                    <Grid container direction="row" justify="center" alignitems="center">
                        <Grid item xs={12} md={8}>
                            <p> {values.description} | {moment(values.created_at).fromNow()}</p>
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                                UPDATE
                            </Button>
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <Button variant="contained" color="secondary" onClick={handleRemove}>
                                REMOVE
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <hr className="hidden" />
            </Grid>
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
                        value={values.description}
                        autoFocus
                        margin="dense"
                        id="name"
                        name="description"
                        label="Your todo description ... "
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
        </>
    )
}

export default Item