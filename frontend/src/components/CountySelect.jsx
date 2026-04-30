/**
 * CountySelect Component  v1.1
 * Removed search input — dropdown only.
 */

const CountySelect = ({ options = [], value = "", onSelect }) => {

  const handleChange = (e) => {
    if (onSelect) onSelect(e.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      style={{
        width:        "100%",
        padding:      "12px 16px",
        borderRadius: "8px",
        border:       "2px solid #ccc",
        fontSize:     "0.95rem",
        fontFamily:   "var(--font-body)",
        color:        value ? "var(--text-dark)" : "var(--text-light)",
        background:   "var(--white)",
        cursor:       "pointer",
        appearance:   "auto",
      }}
    >
      <option value="">Select a county</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default CountySelect;
