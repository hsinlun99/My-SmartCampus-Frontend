import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

export const UPDATE_TAG_STATUS_MUTATION = gql`
  mutation updateTagStatus($tagId: ID!, $statusName: String!) {
    updateTagStatus(tagId: $tagId, statusName: $statusName) {
      statusName
      createTime
    }
  }
`

export const useUpdateTagStatus = () => {
  const [updateStatus] = useMutation(UPDATE_TAG_STATUS_MUTATION)
  return { updateStatus }
}
