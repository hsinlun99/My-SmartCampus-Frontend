import { useState, useEffect, useCallback } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { useUserValue } from '../contexts/UserContext'

export const GET_FIXEDTAG_LIST_QUERY = gql`
  query getfixedTagList($uNumber: Int!, $cursor: String!, $pageSize: Int!) {
    getUserFixedTagResearchList(
      uNumber: $uNumber
      pageParams: { cursor: $cursor, pageSize: $pageSize }
    ) {
      fixedTags {
        id
        locationName
        coordinates {
          latitude
          longitude
        }
        tags {
          id
          fixedTagId
          createUser {
            uid
          }
          locationName
          floor
          imageUrl
          category {
            categoryType
            categoryName
            categoryDescName
            locationImgUrl
          }
          coordinates {
            latitude
            longitude
          }
          status {
            statusName
            statusDescName
            createTime
          }
          statusHistory {
            statusList {
              statusName
              statusDescName
              createTime
            }
            empty
          }
        }
      }
      cursor
      empty
    }
  }
`

function getUserNumberResearch(userEmail) {
  if (userEmail) {
    // console.log('userEmail: ', userEmail)
    const numberMatch = userEmail.match(/\d+/)

    if (numberMatch) {
      return parseInt(numberMatch[0], 10)
    }
    return 0
  }
  return -1
}

function useFixedTagList() {
  const [fetched, setFetched] = useState(false)
  const [
    getfixedTagList,
    {
      data: {
        getUserFixedTagResearchList: {
          fixedTags = null,
          empty = false,
          cursor = null
        } = {}
      } = {}
    }
  ] = useLazyQuery(GET_FIXEDTAG_LIST_QUERY)
  const [fixedtagList, setfixedTagList] = useState(null)
  const [cachefixedTagList, setfixedCacheTagList] = useState(null)
  const { uid, userEmail } = useUserValue()
  const fetchTagList = useCallback(
    (currentCursor, pageSize) => {
      const uNumber = getUserNumberResearch(userEmail)
      getfixedTagList({
        variables: { uNumber, cursor: currentCursor || '', pageSize }
      })
    },
    [getfixedTagList, userEmail]
  )
  useEffect(() => {
    if (uid && !fetched) {
      fetchTagList('', 10)
      setFetched(true)
    }
  }, [fetchTagList, fetched, uid, userEmail])
  useEffect(() => {
    if (uid && !empty && cursor) {
      fetchTagList(cursor, 100)
      setFetched(true)
    }
  }, [fetchTagList, empty, cursor, uid, userEmail])
  useEffect(() => {
    if (Array.isArray(fixedTags)) {
      setfixedCacheTagList((prevState) => [
        ...(prevState || []).filter(
          (fixedTag) => !fixedTags.map((t) => t.id).includes(fixedTag.id)
        ),
        ...fixedTags
      ])
    }
  }, [fixedTags, empty, cursor])
  useEffect(() => {
    if (cachefixedTagList && (empty || cachefixedTagList.length === 10)) {
      const copiedTagList = cachefixedTagList.map((item) => ({
        ...item,
        tags: item.tags.filter(
          (tag) =>
            tag.createUser.uid === 'JDh8VD63kVOxqOvAnfrewhFjqNt2' ||
            tag.createUser.uid === uid
        )
      }))

      setfixedTagList(copiedTagList)
    }
  }, [cachefixedTagList, empty, uid])
  return { fixedTags: fixedtagList }
}

export default useFixedTagList
