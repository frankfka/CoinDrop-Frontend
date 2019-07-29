// import { Container, withStyles } from '@material-ui/core';
// import React from 'react';
//
// const styles = theme => ({
//   pageContainer: {
//     paddingTop: theme.spacing(8),
//     paddingBottom: theme.spacing(8),
//   },
// });
//
// export default function withContainer(ChildComponent) {
//   const wrappedComponent = class extends React.Component {
//     render() {
//       const { classes, ...otherProps } = this.props;
//       const { pageContainer, ...otherClasses } = classes;
//       return (
//         <Container maxWidth="md" className={pageContainer}>
//           <ChildComponent {...otherProps} classes={otherClasses} />
//         </Container>
//       );
//     }
//   };
//   return withStyles(styles)(wrappedComponent);
// }
