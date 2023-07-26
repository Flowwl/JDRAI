import * as React from "react";
import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateElement from "@/components/routes/PrivateElement";
import { ROUTES } from "@/components/routes/constants/routes";
import { AuthProvider } from "@/modules/auth";

const Router: FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes data-testid="routes">
          {/** PUBLIC */}
          {Object.values(ROUTES)
            .filter((route) => route.type === "PUBLIC")
            .map((route) => (
              <Route key={route.path} path={route.path} element={<route.component />} />
            ))}

          {/** PRIVATE */}
          {Object.values(ROUTES)
            .filter((route) => route.type === "PRIVATE")
            .map((route) => (
              <Route key={route.path} path={route.path} element={<PrivateElement element={<route.component />} />} />
            ))}
          <Route path="*" element={<Navigate to={ROUTES.HOME.path} />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
