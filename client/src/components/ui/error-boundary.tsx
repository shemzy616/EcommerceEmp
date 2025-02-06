
import React from "react";
import { Alert, AlertDescription } from "./alert";

interface Props {
  children: React.ReactNode;
  FallbackComponent?: React.ComponentType<{ error: Error }>;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      if (this.props.FallbackComponent) {
        return <this.props.FallbackComponent error={this.state.error} />;
      }
      return (
        <Alert variant="destructive">
          <AlertDescription>{this.state.error.message}</AlertDescription>
        </Alert>
      );
    }
    return this.props.children;
  }
}
