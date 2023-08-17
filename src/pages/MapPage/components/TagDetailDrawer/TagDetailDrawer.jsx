import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, Dialog, DialogTitle } from '@mui/material'
import { Lightbox } from 'react-modal-image'

import tagStatus from '../../../../constants/tagData'
import ChangeStatus from './ChangeStatus'
import DetailPart from './DetailPart'
import { useMissionValue } from '../../../../utils/contexts/MissionContext'
import { useTagValue } from '../../../../utils/contexts/TagContext'
import { useUserValue } from '../../../../utils/contexts/UserContext'
import CustomDrawer from '../../../../components/CustomDrawer'
import { useViewCount } from '../../../../utils/hooks/useViewCount'
import CustomButton from '../../../../components/CustomButton'

function TagDetailDialog(props) {
  const { activeTag, onClose, tagDetail, ...rest } = props
  const { handleStartEdit, isInMission } = useMissionValue()
  const { userAddTags, threshold, fetchTagDetail, deleteTag } = useTagValue()
  const { isGuest } = useUserValue()
  const [largeImg, setLargeImg] = useState(null)
  const [stateDrawer, setStateDrawer] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const { incrementViewCount } = useViewCount()
  const checkTagOwner = () => {
    if (userAddTags) {
      return userAddTags.find((userAddTag) => userAddTag.id === activeTag.id)
    }
    return false
  }
  useEffect(() => {
    if (!isGuest) {
      incrementViewCount(activeTag.id)
    }
  }, [incrementViewCount, activeTag, isGuest])
  useEffect(() => {
    fetchTagDetail()
  }, [fetchTagDetail])

  return (
    <>
      <CustomDrawer
        open={activeTag && !isInMission}
        handleClose={onClose}
        height='full'
        closeButton={false}
        title={
          tagDetail.category.categoryType+"/"+tagDetail.category.categoryName
        }
      >
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          flexGrow={1}
        >
          {tagDetail.id && (
            <Box
              display='flex'
              alignItems='center'
              flexDirection='row'
              justifyContent='space-between'
              width='100%'
            >
            </Box>
          )}
          <DetailPart
            tagDetail={tagDetail}
            setLargeImg={setLargeImg}
            setStateDrawer={setStateDrawer}
            threshold={threshold}
          />
        </Box>
      </CustomDrawer>
      {tagDetail.id && (
        <ChangeStatus
          stateDrawer={stateDrawer}
          tagDetail={tagDetail}
          setStateDrawer={setStateDrawer}
          status={(() => tagStatus[0])()}
        />
      )}
      {largeImg && (
        <Lightbox
          large={largeImg}
          onClose={() => setLargeImg(null)}
          hideDownload
          hideZoom
        />
      )}
    </>
  )
}

TagDetailDialog.propTypes = {
  activeTag: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  tagDetail: PropTypes.object.isRequired
}
TagDetailDialog.defaultProps = {
  activeTag: null
}

export default TagDetailDialog
