// import { Link } from "gatsby";
// import * as React from "react";
// import { Segment, Icon, Container, Sidebar } from "semantic-ui-react";
// import "../css/styles.css";
// import "../css/responsive.css";
// import "../css/semantic.min.css";
// import "prismjs/themes/prism-okaidia.css";
// import { Provider } from "react-redux";
// import { store } from "../store";

// export const menuItems = [
//   { name: "Home", path: "/", exact: true, icon: "home", inverted: true },
//   { name: "About", path: "/about/", exact: true, icon: "info circle" },
//   { name: "Blog", path: "/blog/", exact: false, icon: "newspaper" },
// ];

// export interface LayoutProps {
//   location: {
//     pathname: string;
//   };
//   children: any;
// }

// const Layout = (props: LayoutProps) => {
//   const { pathname } = props.location;
//   const isHome = pathname === "/";

//   return (
//     <Provider store={store}>
//       <Sidebar.Pushable as={Segment}>
//       </Sidebar.Pushable>
//     </Provider>
//   );
// };

// export default Layout;

// export const withLayout = <P extends object>(WrappedComponent: React.ComponentType<P>) =>
//   class WithLayout extends React.Component<P & LayoutProps> {
//     render() {
//       return (
//         <Layout location={this.props.location}>
//           <WrappedComponent {...this.props} />
//         </Layout>
//       );
//     }
//   };
