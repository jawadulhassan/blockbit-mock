import React, { Component } from 'react';

// const ErrorComponent = ({ error }) => {
//   return (
//     <h1>
//       Something went wrong: {''} {error}
//     </h1>
//   );
// };

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log({ info });
  }

  render() {
    // console.log('hasError', this.state.hasError);
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
