// import React from 'react';
// import { Client } from './apollo/client'
// import { ApolloProvider } from '@apollo/client';

/**
 * 
 * Wraps apollo provider around root element of app. This helps ensure reacts DOM doesn't
 * do unnecessary re-renders
 * Resources:
 * -- https://www.youtube.com/watch?v=wNUg1jpj9T0&list=WL&index=7&t=1305s&ab_channel=ApolloGraphQL
 * -- https://www.youtube.com/watch?v=BrBK4yxodXA&ab_channel=Gatsby
 */

// export const App = ({ root }) => {
//   return (
//     <ApolloProvider client={Client}>
//     {root}
//     </ApolloProvider>
//   )
// };