import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "@/components/routes/Router";

function App() {
  toast.onChange(() => {
    toast.clearWaitingQueue();
  });
  return (
    <div className="App overflow-hidden h-screen font-light text-sm">
      <ErrorBoundary fallbackRender={(error) => <div>{error.error.message}</div>}>
        <Router />
      </ErrorBoundary>
      <ToastContainer
        theme="colored"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
      />
    </div>
  );
}

export default App;
