import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import ViewDeck from "./Layout/ViewDeck";
import CreateDeck from "./Layout/CreateDeck";
import CreateCard from "./Layout/CreateCard";
import EditDeck from "./Layout/EditDeck";
import EditCard from "./Layout/EditCard";
import Study from "./Layout/Study";
import "./App.css";
import NotFound from "./Layout/NotFound";

function App() {
  return (
    <div className="app-routes">
      <Switch>
        
        <Route path="/decks/new">
          <CreateDeck />
        </Route>

        <Route path="/decks/:deckId/study/">
          <Study />
        </Route>

        <Route path="/decks/:deckId/edit">
          <EditDeck />
        </Route>

        <Route path="/decks/:deckId/cards/new">
          <CreateCard />
        </Route>

        <Route path="/decks/:deckId/cards/:cardId/edit">
          <EditCard />
        </Route>

        <Route path="/decks/:deckId">
          <ViewDeck />
        </Route>

        <Route path="/">
          <Layout />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
