import React from "react";
import Header from "./Header";
import CreateDeckButton from "../Home/CreateDeckButton";
import HomeDeck from "../Decks/HomeDeck";
import NotFound from "./NotFound";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <CreateDeckButton />
        <HomeDeck />
        {/* <NotFound /> Should only be shown when no decks are rendered.*/}
      </div>
    </>
  );
}

export default Layout;
