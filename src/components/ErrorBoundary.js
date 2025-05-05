import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate that an error has been caught
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log the error and info
    this.setState({ error, info });
    defaultOnCaughtError(error);  // Call the default error handling function
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children; 
  }
}

function defaultOnUncaughtError(error) {
  console.warn(
    "%s\n\n%s\n",
    "An error occurred in one of your React components.",
    "Consider adding an error boundary to your tree to customize error handling behavior.\nVisit https://react.dev/link/error-boundaries to learn more about error boundaries."
  );
}

function defaultOnCaughtError(error) {
  console.warn(
    "The above error occurred in one of your React components.",
    "React will try to recreate this component tree from scratch using the error boundary you provided."
  );
}

export default ErrorBoundary;

