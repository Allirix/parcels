import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/layout";
import Loading from "./components/Loading";

const Dashboard = lazy(() => import("./features/Dashboard"));
const Deliveries = lazy(() => import("./features/Deliveries"));
const Locations = lazy(() => import("./features/Locations"));
const Map = lazy(() => import("./features/Map"));
const Settings = lazy(() => import("./features/Settings"));

const App = () => (
  <AppShell>
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Navigate to="/deliveries" />} />
        <Route path="/deliveries" element={<Deliveries />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/map" element={<Map />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  </AppShell>
);

export default App;
