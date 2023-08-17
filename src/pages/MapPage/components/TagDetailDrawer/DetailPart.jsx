import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Paper, Button, CircularProgress, IconButton, Link } from '@mui/material'
import { makeStyles } from '@mui/styles'
import moment from 'moment'
import { useSnackbar } from 'notistack'
import noImage from '../../../../assets/images/no-image.svg'
import EditIcon from '../../../../assets/images/edit.svg'
import EditHistory from './editHistory'
import { useUpdateVote } from '../../../../utils/Mutation/useVoteTag'
import { useUserValue } from '../../../../utils/contexts/UserContext'
import UserDialog from '../UserDialog/UserDialog'
import useModal from '../../../../utils/hooks/useModal'
import { CenterFocusStrong } from '@mui/icons-material'
import researchStatusType from '../../../../constants/researchStatusType'
import LocationIcon from '../../../../assets/images/research1-detailLocation.svg'
import ReportItem from '../../../../assets/images/research1-detailReportItem.svg'

const useStyles = makeStyles(() => ({
  clickableFont: {
    fontSize: '0.8em',
    color: 'gray',
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  paperDetail: {
    variant: 'outlined',
    background: '#D9D9D9',
    textAlign: 'center',
    width: '100%',
    boxShadow: 'none'
  }
}))

const DetailPart = (props) => {
  const { tagDetail, setLargeImg, setStateDrawer, threshold } = props
  const classes = useStyles()
  const { isGuest, signOut } = useUserValue()
  const [openHistory, setOpenHistory] = useState(false)
  const handleHistoryClose = () => {
    setOpenHistory(false)
  }
  const { upVote } = useUpdateVote()
  const [numberOfVote, setNumberOfVote] = useState(0)
  const [hasUpVote, setHasUpVote] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const userDialogControl = useModal()
  const [thisStatusType, setThisStatusType] = useState({})

  useEffect(() => {
    researchStatusType.forEach(function(item, index, array) {
      if (tagDetail.status.statusName === item.status) {
        setThisStatusType(item)        
      }
    })

  }, [tagDetail])


  useEffect(() => {
    setNumberOfVote(tagDetail ? tagDetail.status.numberOfUpVote : 0)
    setHasUpVote(tagDetail ? tagDetail.status.hasUpVote : false)
    if (tagDetail.status.statusName === '已解決' && tagDetail) {
      enqueueSnackbar(
        `再${
          tagDetail ? threshold - tagDetail.status.numberOfUpVote : threshold
        }人投票即可刪除回報`,
        {
          variant: 'warning'
        }
      )
    }
  }, [tagDetail, enqueueSnackbar, threshold])
  const handleUopVote = () => {
    if (isGuest) {
      signOut()
      return
    }
    setNumberOfVote((prevNumberOfVote) =>
      hasUpVote ? prevNumberOfVote - 1 : prevNumberOfVote + 1
    )
    upVote(tagDetail.id, !hasUpVote)
    setHasUpVote((prevHasUpVote) => !prevHasUpVote)
  }
  
  return (
    <>
      {tagDetail.id ? (
        <>
          <div
            style={{
              width: '100%',
              margin: '4vw 0 0 0',
              height: '100%',
              flexGrow: '1',
              overflowX: 'scroll',
              overflowY: 'hidden',
              display: '-webkit-flex',
              flexDirection: 'row'
            }}
          >
            {/* 回報圖片 */}
            {tagDetail.imageUrl.length === 0 ? (
              <div
                style={{
                  width: '100%',
                  flexShrink: '0',
                  overflow: 'hidden',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundImage: `url(${noImage})`
                }}
              />
            ) : (
              tagDetail.imageUrl.map((url) => {
                if (tagDetail.imageUrl.length === 1) {
                  return (
                    <Button
                      key={url}
                      onClick={() => setLargeImg(`${url}`)}
                      style={{
                        width: '100%',
                        flexShrink: '0',
                        overflowY: 'hidden',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${url})`
                      }}
                    />
                  )
                }
                return (
                  <Button
                    key={url}
                    onClick={() => setLargeImg(`${url}`)}
                    style={{
                      width: '80%',
                      flexShrink: '0',
                      overflowY: 'hidden',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundImage: `url(${url})`
                    }}
                  />
                )
              })
            )}
          </div>
          
          <div
            style={{
              width: '90%',
              borderTop: 'solid 0.5px lightgray',
              // borderBottom:
              //   activeTag.category.missionName === missionName[1] &&
              //   'solid 0.5px lightgray',
              paddingBottom: '2'
            }}
          >
            {/* 地點、樓層 */}
            <Grid container marginTop={0.5}>
              <Grid container item xs={1}>
                <img src={LocationIcon} alt="" />
              </Grid>
              <Grid container item xs={4} marginRight={1}>
                <Paper className={classes.paperDetail} >
                  {tagDetail.locationName}
                </Paper>
              </Grid>
              <Grid container item xs={1.5} >
                <Paper className={classes.paperDetail}>
                  {tagDetail.floor+"樓"}
                </Paper>
              </Grid>
            </Grid>

            {/* 回報項目 */}
            <Grid container marginTop={0.5}>
              <Grid container item xs={1}>
                <img src={ReportItem} alt="" />
              </Grid>
              <Grid container item xs={4} marginRight={1}>
                <Paper className={classes.paperDetail}>
                  {tagDetail.category.categoryDescName}
                </Paper>
              </Grid>
            </Grid>

            {/* 狀態 */}
            <Grid container marginTop={0.5}>
              <Grid container item xs={1}>
                <img src={thisStatusType.statusIcon} />
              </Grid>
              <Grid container item xs={4} >
                <Paper className={classes.paperDetail} style={{ background: thisStatusType.statusColor }}>
                  {tagDetail.status.statusName+"："+tagDetail.status.statusDescName}
                </Paper>                
              </Grid>
            </Grid>
              {/* 此回報上次編輯時間 */}
              <Box display='flex' flexDirection='column' alignItems='flex-end'>
                <Box m={0.5} style={{ fontSize: '0.8em', color: 'gray' }}>
                  <Box
                    display='inline'
                    className={classes.clickableFont}
                    style={{ fontSize: '1em' }}
                    onClick={() => userDialogControl.setOpen(true)}
                    mr={1}
                  >
                    {
                      tagDetail?.createUser?.displayName
                    }
                  </Box>
                  編輯於{' '}
                  {moment(
                    tagDetail?.statusHistory?.statusList?.[0]?.createTime
                  ).format('YYYY-MM-DD h:mm')}
                </Box>
              </Box>
          </div>

          <Box 
            display='flex'
            alignItems='center'
            flexDirection='row'
            justifyContent='center'
            m={2}
            width='90%'
          >
            <Button
              id='changeStatusButton'
              onClick={() => {
                if (isGuest) {
                  signOut()
                } else {
                  setStateDrawer(true)
                }
              }}
              style={{
                background: '#FDCC4F',
                /* Primary_light */
                borderRadius: '20px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)'
              }}
              variant='contained'
            >
              更新回報
            </Button>
          </Box> 
          {/* end of 第二行詳細資訊 */}
      
          <UserDialog
            userId={tagDetail?.createUser?.uid}
            control={userDialogControl}
          />
        </>
      // end of "if tagDetail.id is not a null"
      ) : (
        <Box
          height='100%'
          display='flex'
          alignItems='center'
          style={{ flexGrow: '1', display: '-webkit-flex' }}
        >
          <CircularProgress />
        </Box>
      )}
      {tagDetail.id && (
        <EditHistory
          open={openHistory}
          handleHistoryClose={handleHistoryClose}
          // tagMissionIndex={undefined}
          tagDetail={tagDetail}
        />
      )}
    </>
  )
}

DetailPart.propTypes = {
  tagDetail: PropTypes.object.isRequired,
  setLargeImg: PropTypes.func.isRequired,
  setStateDrawer: PropTypes.func.isRequired,
  threshold: PropTypes.number.isRequired
}

export default DetailPart
