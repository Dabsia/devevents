"use client";

import { useState } from "react";

const BookEvent = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
    }, 500);
  };
  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">Thank You for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit} className="">
          <div>
            <label className="text-white" htmlFor="email">
              Email{" "}
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              id="email"
              className="outline-none text-primary"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="button-submit" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
