import React, { useState } from "react";

function RecommendationForm({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSubmit(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="I want a phone under $500"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Get Recommendations</button>
    </form>
  );
}

export default RecommendationForm;
