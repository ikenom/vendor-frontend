// import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider} from '@apollo/client';
import { MockedProvider } from "@apollo/client/testing";
import React from 'react'



// const cache = new InMemoryCache();
// const link = createHttpLink({ uri: 'https://test-backend:8000/'})

// export const Client = new ApolloClient( {cache, link});


export const setMockProvider = ({ root }) => {
  return (
    <MockedProvider >
      {root}
    </MockedProvider>
  )
}


