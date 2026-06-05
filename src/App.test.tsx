import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders home hero", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByRole("heading", { level: 1, name: /Amanda Welt/i })).toBeInTheDocument();
});
