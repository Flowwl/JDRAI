import { FC } from "react";
import LoginView from "@/views/login/LoginView";
import MainView from "@/views/main/MainView";

type RouteKeys = "HOME" | "LOGIN";
export const ROUTES: Record<RouteKeys, AppRouteInterface> = {
  /** MENU */
  HOME: {
    path: "/",
    component: MainView,
    type: "PUBLIC"
  },

  /** CONNEXION */
  LOGIN: {
    path: "/login",
    component: LoginView,
    type: "PUBLIC"
  }
  //
  // NOT_FOUND: {
  //   path: "/404",
  //   component: NotFoundView,
  //   type: "PUBLIC"
  // },
  //
  // COMPONENTS: {
  //   path: "/composants",
  //   component: ComponentsView,
  //   type: "ADMIN"
  // }
};

export interface AppRouteInterface {
  path: string;
  component: FC;
  type: "PUBLIC" | "PRIVATE";
}
