import { gql } from '@apollo/client';

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id){
        id
        username
        email
        profile_pic_url
        full_name
        bio
        is_private
    }
  }
    `;

export { GET_USER_BY_ID };