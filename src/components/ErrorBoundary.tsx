import React, { ReactNode } from "react";
import { AlertCircle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error) {
    console.error("Error caught by boundary:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <AlertCircle className="h-8 w-8 text-red-600 flex-shrink-0" />
              <h1 className="text-xl font-bold text-slate-900">Terjadi Kesalahan</h1>
            </div>
            
            <p className="text-slate-600 mb-4">
              Aplikasi mengalami masalah yang tidak terduga. Silakan refresh halaman atau hubungi administrator.
            </p>

            {import.meta.env.DEV && (
              <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
                <p className="text-xs text-red-800 font-mono break-words">
                  {this.state.error?.message}
                </p>
              </div>
            )}

            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors"
            >
              Refresh Halaman
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
