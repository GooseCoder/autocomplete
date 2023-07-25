import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Autocomplete from "./Autocomplete";

test("renders autocomplete suggestions", async () => {
  const getEntriesMock = jest.fn();
  getEntriesMock.mockReturnValue(Promise.resolve([
    "apple",
    "banana",
    "cherry",
    "date"
  ]));
  render(<Autocomplete getEntries={getEntriesMock} />);
  const input = await screen.findByTestId("text-filter") as HTMLInputElement;
  fireEvent.change(input, { target: { value: "apple" } });
  const suggestion = await screen.findByText("apple");
  expect(suggestion).toBeInTheDocument();
});