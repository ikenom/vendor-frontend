import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider} from '@apollo/client';
// import { MockedProvider } from "@apollo/client/testing";
// import React from 'react'

const cache = new InMemoryCache();
const link = createHttpLink({ uri: 'http://localhost:5020/graphql'})

export const client = new ApolloClient( {cache, link});


// export const setMockProvider = ({ root }) => {
//   return (
//     <MockedProvider >
//       {root}
//     </MockedProvider>
//   )
// }


