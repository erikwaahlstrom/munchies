import { Routes, Route } from "react-router-dom";
import { Welcome } from "App/Views/Welcome";
import { Resturants } from "App/Views/Resturants";

const routes = [
  {
    path: "/",
    component: Welcome,
  },
  {
    path: "/resturants",
    component: Resturants,
  },
] as const;

export const Views = () => (
  <Routes>
    {routes.map(({ path, component: Component }) => (
      <Route key={path} path={path} element={<Component />} />
    ))}
  </Routes>
);
