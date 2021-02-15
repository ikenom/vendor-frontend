/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import {App} from './src/App';
import { setMockProvider } from './src/apollo/client'

export const wrapRootElement = setMockProvider;
