import { gql, useMutation } from '@apollo/client'

export const TAG_UPDATE_MUTATION = gql`
  mutation updateTagData($tagId: ID!, $data: updateTagResearchDataInput!) {
    updateTagResearchData(tagId: $tagId, data: $data) {
      tagResearch {
        id
        locationName
        category {
          categoryType
          categoryName
          categoryDescName
          locationImgUrl
        }
        floor
        status {
          statusName
          statusDescName
        }
      }
      imageUploadNumber
      imageUploadUrls
      imageDeleteStatus
    }
  }
`

export const useUpdateTagStatus = () => {
  const [updateStatus] = useMutation(TAG_UPDATE_MUTATION)
  return { updateStatus }
}
