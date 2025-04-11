import React from "react";

interface Props {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    //componentDidCatch(error: Error, info: React.ErrorInfo) {
        
    //}

    render() {
        if (this.state.hasError) {
            return this.props.fallback || <h2>Something went wrong.</h2>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;