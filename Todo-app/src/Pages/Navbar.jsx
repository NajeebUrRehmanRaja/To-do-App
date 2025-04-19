import React from "react";
import NavbarComponent from "../Components/NavbarComponent.jsx";

const App = () => {
  const links = [
    { label: "Home", href: "/" },
    { label: "MyLists", href: "/mylists" },
  ];

  return (
    <div>
      <NavbarComponent title="NoteAble" links={links} />
      {/* Other components go here */}
    </div>
  );
};

export default App;
