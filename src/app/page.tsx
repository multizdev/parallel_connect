import React, { ReactElement } from "react";

import AuthPage from "@/components/Pages/AuthPage";

/**
 * Renders the Home component.
 * @returns {ReactElement} The rendered Home component.
 */
export default function Home(): ReactElement {
  return (
    <main>
      <AuthPage />
    </main>
  );
}
