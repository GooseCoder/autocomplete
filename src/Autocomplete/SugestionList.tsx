import React, { useState } from "react";
import "./SugestionList.css";

interface SugestionListProps {
  loading: boolean;
  sugestions: string[];
  onSelect: (sugestion: string) => void;
}

const SugestionList = ({
  loading,
  sugestions,
  onSelect,
}: SugestionListProps) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const handleSelect = (item: string) => {
    setSelectedItem(item);
    console.log(item);
    onSelect(item);
  };

  return (
    <div className="sugestion-list">
      {loading && <div> Loading... </div>}
      {sugestions.length === 0 && !loading && <div> No suggestions </div>}
      {sugestions.map((sugestion: string) => (
        <div
          key={sugestion}
          onClick={handleSelect.bind(null, sugestion)}
          className={`sugestion ${
            selectedItem === sugestion ? "selected" : ""
          }`}
        >
          {sugestion}
        </div>
      ))}
    </div>
  );
};

export default SugestionList;
