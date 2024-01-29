import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="max-w-screen-md mx-auto p-2">
      <Outlet />
    </div>
  );
}
