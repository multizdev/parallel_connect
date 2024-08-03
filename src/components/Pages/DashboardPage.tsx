import React, { ReactElement } from "react";

import NFTContainer from "@/components/Dashbaoard/NFTContainer/NFTContainer";
import DashboardHeader from "@/components/Dashbaoard/Header/DashboardHeader";

/**
 * Render the dashboard page.
 *
 * @returns {ReactElement} The React element representing the dashboard page.
 */
function DashboardPage(): ReactElement {
  return (
    <div className="w-full min-h-screen bg-center bg-no-repeat bg-cover bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.8)),url('/background/ship.jpg')]">
      <DashboardHeader />
      <NFTContainer />
    </div>
  );
}

export default DashboardPage;
