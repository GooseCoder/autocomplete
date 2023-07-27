import React, { useEffect, useRef, useState } from "react";
import TextFilter from "./TextFilter";
import SugestionList from "./SugestionList";
import "./Autocomplete.css";

interface AutocompleteProps {
  getEntries: (filter: string) => Promise<string[]>;
}

const Autocomplete = ({getEntries}: AutocompleteProps) => {
  const [filter, setFilter] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const filterHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setIsVisible(true);
    setSuggestions([]);
    setLoading(true);
  };

  const handleClickOutside = (event: any) => {
    if (listRef.current && !listRef.current.contains(event.target as Node)) {
      setIsVisible(false);
    }
  };

  const focusHandler = () => {
    if (filter.length < 3) return;
    setIsVisible(true);
  };

  const emptyFilter = () => {
    setFilter("");
    setIsVisible(false);
  };

  useEffect(() => {
    if (filter.length < 3) {
      setSuggestions([]);
      setLoading(false);
      return;
    }
    getEntries(filter).then((response) => {
      setSuggestions(response);
      setLoading(false);
    });
  }, [filter, getEntries]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="auto-complete-container">
      <div className="filter-container">
        <TextFilter
          value={filter}
          onChange={filterHandler}
          onFocus={focusHandler}
        />
        <button className='filter-clear-button' onClick={emptyFilter}>X</button>
      </div>
      <div
        className="list-container"
        style={{ display: isVisible ? "block" : "none" }}
        ref={listRef}
      >
        <SugestionList
          loading={loading}
          sugestions={suggestions}
          onSelect={(sugestion: string) => {
            console.log(sugestion);
            setFilter(sugestion);
            setIsVisible(false);
          }}
        />
      </div>
    </div>
  );
};

export default Autocomplete;
