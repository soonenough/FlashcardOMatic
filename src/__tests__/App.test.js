import React from "react";
import { Router } from "react-router-dom";
import { act, render, screen } from "@testing-library/react";
import App from "../App";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";
import {
  createCard,
  createDeck,
  deleteCard,
  deleteDeck,
  listDecks,
  readCard,
  readDeck,
  updateCard,
  updateDeck,
} from "../utils/api";

require("cross-fetch/polyfill");

jest.mock("../utils/api");

describe("App", () => {
  beforeEach(() => {
    createCard.mockResolvedValue({
      front:
        "Default mock response. If you see this, you probably do not need this API call.",
    });
    createDeck.mockResolvedValue({
      name:
        "Default mock response. If you see this, you probably do not need this API call.",
    });
    deleteCard.mockResolvedValue({
      front:
        "Default mock response. If you see this, you probably do not need this API call.",
    });
    deleteDeck.mockResolvedValue({
      name:
        "Default mock response. If you see this, you probably do not need this API call.",
    });
    listDecks.mockResolvedValue([
      {
        front:
          "Default mock response. If you see this, you probably do not need this API call.",
      },
    ]);
    readCard.mockResolvedValue({
      front:
        "Default mock response. If you see this, you probably do not need this API call.",
    });
    readDeck.mockResolvedValue({
      name:
        "Default mock response. If you see this, you probably do not need this API call.",
    });
    updateCard.mockResolvedValue({
      front:
        "Default mock response. If you see this, you probably do not need this API call.",
    });
    updateDeck.mockResolvedValue({
      name:
        "Default mock response. If you see this, you probably do not need this API call.",
    });
  });

  test('landing on a bad page shows "Not Found" page', () => {
    const history = createMemoryHistory();
    history.push("/some/bad/route");
    render(
      <Router history={history}>
        <App />
      </Router>
    );
    expect(screen.getByText(/Not\s+Found/)).toBeTruthy();
  });

  test("route for /", async () => {
    const mockDecks = [
      {
        name: "Mock Rendering in React",
        description: "MDS42",
        id: 73,
        cards: [
          {
            id: 74,
            front: "What do you call a droid that takes the long way around?",
            back: "R2 detour.",
            deckId: 73
          },
          {
            id: 75,
            front: "Why was 6 afraid of 7?",
            back: "Because 7, 8 (ate), 9",
            deckId: 73
          },
        ],
      },
      {
        name: "Mock React Router",
        description: "RR",
        id: 2,
        cards: [],
      },
    ];

    const mockDecksPromise = Promise.resolve(mockDecks);

    listDecks.mockImplementation(() => mockDecksPromise);

    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    await act(() => mockDecksPromise);

    expect(screen.getByText("Mock Rendering in React")).toBeTruthy();
    expect(screen.getByText("2 cards")).toBeTruthy();
    expect(screen.getByText("Mock React Router")).toBeTruthy();
    expect(screen.getByText("0 cards")).toBeTruthy();
  });
});
