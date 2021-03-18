import { gql } from '@apollo/client';
import { client } from './client'

const loginAsync = async (email: String, password: String) => {
  const result = await client.mutate({
    mutation: gql`
      mutation($email: String!, $password: String!) {
        login(input: {email: $email, password: $password}) {
          token
        }
      }
    `,
    variables: {
      email: email,
      password: password
    }
  })
  return result.data
}

export default {
  loginAsync
}
