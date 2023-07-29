import React, { useState, Fragment } from 'react'
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  DialogActions,
  Dialog,
  CircularProgress,
  TextField,
  FormGroup,
  Grid,
  Input,
  Drawer,
  Paper
} from '@mui/material'
import PropTypes from 'prop-types'
import CustomDrawer from '../../../../components/CustomDrawer'
import { makeStyles } from '@mui/styles'
import ResearchFormDrawer from '../../../../components/CustomDrawer/ResearchFormDrawer'
import { useUpdateTagStatus } from '../../../../utils/Mutation/updateTagStatus'
import { useTagValue } from '../../../../utils/contexts/TagContext'
import { useUserValue } from '../../../../utils/contexts/UserContext'

import locationEditIcon from '../../../../assets/images/research1-locationEditIcon.svg'
import itemTypeEditIcon from '../../../../assets/images/research1-itemTypeIcon.svg'
import itemEditIcon from '../../../../assets/images/research1-itemIcon.svg'
import itemDescriptionEditIcon from '../../../../assets/images/research1-itemDescriptionIcon.svg'
import statusEditIcon from '../../../../assets/images/research1-statusEditIcon.svg'
import statusDescriptionIcon from '../../../../assets/images/research1-statusDescriptionIcon.svg'
import addPhotoIcon from '../../../../assets/images/research1-addPhotoIcon.svg'

const useStyles = makeStyles(() => ({
  paperDetail: {
    variant: 'outlined',
    background: '#D9D9D9',
    textAlign: 'center',
    width: '100%'
  },
}))


function ChangeStatus(props) {
  const { stateDrawer, tagDetail, setStateDrawer, status } = props
  const classes = useStyles()
  const [temporaryTagState, setTemporaryTagState] = useState(
    tagDetail.status.statusName
  )
  const { fetchTagDetail } = useTagValue()
  const { token } = useUserValue()
  const [loading, setLoading] = useState(false)
  const resetTemporaryTagState = () => {
    setTemporaryTagState(tagDetail.status.statusName)
  }
  const [newDescription, setNewDescription] = useState(
    tagDetail.status.description
  )
  const handleChangeDescription = (event) => {
    setNewDescription(event.target.value)
  }
  const handleDrawerClose = () => {
    setStateDrawer(false)
    resetTemporaryTagState()
  }
  const { updateStatus } = useUpdateTagStatus()
  const handleDrawerComplete = async () => {
    setLoading(true)
    if (token) {
      try {
        await updateStatus({
          context: {
            headers: {
              authorization: token ? `Bearer ${token}` : ''
            }
          },
          variables: {
            tagId: tagDetail.id,
            statusName: temporaryTagState,
            description: newDescription
          }
        })
        await fetchTagDetail()
        setLoading(false)
        setStateDrawer(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
        setStateDrawer(false)
      }
    }
  }

  console.log(tagDetail)
  return (
    <>
    {/* <ResearchFormDrawer
      open={stateDrawer}
      handleClose={handleDrawerClose}
      closeButton
      title='更新回報資訊'
    >
        <Grid container spacing={2}>
          <Grid item xs={1} ml={1}>
            <img src={locationEditIcon}  />
          </Grid>
          <Grid item xs={3}>
            回報地點
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={1} ml={1}>
            <img src={itemTypeEditIcon}  />
          </Grid>
          <Grid item xs={3}>
            回報類別
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={1} ml={1}>
            <img src={itemEditIcon}  />
          </Grid>
          <Grid item xs={3}>
            回報項目
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={1} ml={1}>
            <img src={itemDescriptionEditIcon}  />
          </Grid>
          <Grid item xs={3}>
            項目描述
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={1} ml={1}>
            <img src={statusEditIcon}  />
          </Grid>
          <Grid item xs={3}>
            回報狀態
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={1} ml={1}>
            <img src={statusDescriptionIcon}  />
          </Grid>
          <Grid item xs={3}>
            狀態描述
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={1} ml={1}>
            <img src={addPhotoIcon}  />
          </Grid>
          <Grid item xs={3}>
            新增照片
          </Grid>
        </Grid>
    </ResearchFormDrawer> */}
        

      <CustomDrawer
        open={stateDrawer}
        handleClose={handleDrawerClose}
        closeButton
        title='更新回報資訊'
      >
        <Box
          display='flex'
          width='100%'
          flexDirection='column'
          justifyContent='space-around'
        >
          <Grid container padding={2}>
            <Grid container>
              <Grid item xs={1} ml={1}>
                <img src={locationEditIcon}  />
              </Grid>
              <Grid item xs={3}>
                回報地點
              </Grid>
              <Grid item xs={2} mr={1}>
                <Paper className={classes.paperDetail}>
                  {tagDetail.locationName}
                </Paper>
              </Grid>
              <Grid item xs={1.5}>
                <Paper className={classes.paperDetail}>
                  {tagDetail.floor+"樓"}
                </Paper>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={1} ml={1}>
                <img src={itemTypeEditIcon}  />
              </Grid>
              <Grid item xs={3}>
                回報類別
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={1} ml={1}>
                <img src={itemEditIcon}  />
              </Grid>
              <Grid item xs={3}>
                回報項目
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={1} ml={1}>
                <img src={itemDescriptionEditIcon}  />
              </Grid>
              <Grid item xs={3}>
                項目描述
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={1} ml={1}>
                <img src={statusEditIcon}  />
              </Grid>
              <Grid item xs={3}>
                回報狀態
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={1} ml={1}>
                <img src={statusDescriptionIcon}  />
              </Grid>
              <Grid item xs={3}>
                狀態描述
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={1} ml={1}>
                <img src={addPhotoIcon}  />
              </Grid>
              <Grid item xs={3}>
                新增照片
              </Grid>
            </Grid>

          </Grid>
          
          {/* <List component='nav'>
            {status.map((item, index) => (
              <Fragment key={item.statusName}>
                <ListItem
                  onClick={() => setTemporaryTagState(item.statusName)}
                >
                  <ListItemIcon>
                    <img
                      src={
                        item.statusName === temporaryTagState
                          ? item.statusOnIcon
                          : item.statusIcon
                      }
                      alt=''
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.statusName}
                    style={{
                      color:
                        item.statusName === temporaryTagState
                          ? item.statusColor
                          : `black`
                    }}
                  />
                </ListItem>
                {item.statusName === temporaryTagState && (
                  <TextField
                    multiline
                    minRows={3}
                    variant='outlined'
                    placeholder={tagDetail.status.description}
                    onChange={handleChangeDescription}
                    style={{
                      width: '90%',
                      marginLeft: '5%',
                      marginBottom: '20px'
                    }}
                  />
                )}
                {index !== status.length - 1 && <Divider variant='middle' />}
              </Fragment>
            ))}
          </List> */}
          <DialogActions>
            <Button color='primary' onClick={() => handleDrawerComplete()}>
              確定
            </Button>
          </DialogActions>
        </Box>
      </CustomDrawer>
      <Dialog
        open={loading}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            width: '50px',
            height: '50px'
          }
        }}
      >
        <CircularProgress />
      </Dialog>
    </>
  )
}

ChangeStatus.propTypes = {
  stateDrawer: PropTypes.bool.isRequired,
  tagDetail: PropTypes.object.isRequired,
  setStateDrawer: PropTypes.func.isRequired,
  status: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ChangeStatus
