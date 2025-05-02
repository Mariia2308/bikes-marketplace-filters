import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ errorInfo });
    // Тут можна відправити лог на сервер
  }

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      return (
        <div style={{ padding: '2rem', color: 'crimson' }}>
          <h2>Щось пішло не так.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
            <br />
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
