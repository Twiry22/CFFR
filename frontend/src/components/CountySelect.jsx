import { useState } from "react";

const CountySelect = ({ options = [], value = "", onSelect }) => {
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    const selectedValue = e.target.value;

    if (onSelect) {
      onSelect(selectedValue); // 🔥 THIS is what moves you forward
    }
  };

  return (
    <div>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search county..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {/* Dropdown */}
      <select
        value={value}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      >
        <option value="">Select a county</option>
        {filteredOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountySelect;