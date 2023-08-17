import React, { useState, Fragment, useEffect } from 'react'
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
  Paper,
  FormControl,
  Select,
  MenuItem
} from '@mui/material'
import PropTypes from 'prop-types'
import CustomDrawer from '../../../../components/CustomDrawer'
import { makeStyles } from '@mui/styles'
// import { useUpdateTagStatus } from '../../../../utils/Mutation/updateTagStatus'
import { useUpdateTagStatus } from '../../../../utils/Mutation/updateTagStatusResearch'
import { useTagValue } from '../../../../utils/contexts/TagContext'
import { useUserValue } from '../../../../utils/contexts/UserContext'

import researchStatusType from '../../../../constants/researchStatusType'
import locationEditIcon from '../../../../assets/images/research1-editLocationEditIcon.svg'
import itemTypeEditIcon from '../../../../assets/images/research1-editItemTypeIcon.svg'
import itemEditIcon from '../../../../assets/images/research1-editItemIcon.svg'
import itemDescriptionEditIcon from '../../../../assets/images/research1-editItemDescriptionIcon.svg'
import statusEditIcon from '../../../../assets/images/research1-editStatusEditIcon.svg'
import statusDescriptionIcon from '../../../../assets/images/research1-editStatusDescriptionIcon.svg'
import addPhotoIcon from '../../../../assets/images/research1-editAddPhotoIcon.svg'

const useStyles = makeStyles(() => ({
  paperDetail: {
    variant: 'outlined',
    background: '#D9D9D9',
    textAlign: 'center',
    width: '100%',
    boxShadow: 'none'
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
  const [thisStatusType, setThisStatusType] = useState({})
  const [selectStatusDesc, setSelecStatusDesc] = useState(tagDetail.status.statusDescName)
  const handleSelectChange = (event) => {
    setSelecStatusDesc(event.target.value);
  };

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
            data: {
              locationName: tagDetail.locationName,
              category: {
                categoryType: tagDetail.category.categoryType,
                categoryName: tagDetail.category.categoryName,
                categoryDescName: tagDetail.category.categoryDescName,
                locationImgUrl: tagDetail.category.locationImgUrl
              },
              statusName: tagDetail.status.statusName,
              statusDescName: selectStatusDesc
            }
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

  useEffect(() => {
    researchStatusType.forEach(function(item, index, array) {
      if (tagDetail.status.statusName === item.status) {
        setThisStatusType(item)
      }
    })
  }, [tagDetail])


  return (
    <>
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
              <Grid item xs={2}>
                <Paper className={classes.paperDetail}>
                  {tagDetail.category.categoryType}
                </Paper>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={1} ml={1}>
                <img src={itemEditIcon}  />
              </Grid>
              <Grid item xs={3}>
                回報項目
              </Grid>
              <Grid item xs={2}>
                <Paper className={classes.paperDetail}>
                  {tagDetail.category.categoryName}
                </Paper>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={1} ml={1}>
                <img src={itemDescriptionEditIcon}  />
              </Grid>
              <Grid item xs={3}>
                項目描述
              </Grid>
              <Grid item xs={2}>
                <Paper className={classes.paperDetail}>
                  {tagDetail.category.categoryDescName}
                </Paper>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={1} ml={1}>
                <img src={statusEditIcon}  />
              </Grid>
              <Grid item xs={3}>
                回報狀態
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paperDetail} style={{ background: thisStatusType.statusColor }} >
                  {tagDetail.status.statusName}
                </Paper>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={1} ml={1}>
                <img src={statusDescriptionIcon}  />
              </Grid>
              <Grid item xs={3}>
                狀態描述
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paperDetail} style={{background: '#FDCC4F'}}>
                  <FormControl fullWidth>
                    <Select
                      defaultValue={tagDetail.status.statusDescName}
                      value={selectStatusDesc}
                      onChange={handleSelectChange}
                    >
                      <MenuItem value={'乾淨'}>乾淨</MenuItem>
                      <MenuItem value={'普通'}>普通</MenuItem>
                      <MenuItem value={'髒亂'}>髒亂</MenuItem>
                    </Select>
                  </FormControl>
                </Paper>
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

          <DialogActions>
            <Button color='primary' onClick={handleDrawerComplete}>
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
