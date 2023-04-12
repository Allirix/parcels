import { ReactNode } from "react";
import BottomBar from "./Bottom";
import TopBar from "./Top";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="flex-grow overflow-scroll mb-16 bg-gray-700 bg-gradient-to-b from-gray-800 to-gray-900">
        {children}
      </div>
      <BottomBar />
    </div>
  );
}
