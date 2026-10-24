import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/common/Button";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/** React Error Boundary ต้องเป็น class component ตามข้อกำหนดของ React */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled UI error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 bg-cream">
          <h1 className="text-2xl font-bold text-charcoal mb-2">
            เกิดข้อผิดพลาดที่ไม่คาดคิด
          </h1>
          <p className="text-charcoal/70 mb-6">
            กรุณาลองรีเฟรชหน้านี้ใหม่ หรือกลับไปหน้าแรก
          </p>
          <Button href="/" external={false}>
            กลับไปหน้าแรก
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
