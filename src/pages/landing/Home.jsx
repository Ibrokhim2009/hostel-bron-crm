import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center h-full justify-center">
      <button
        onClick={() => navigate('/admin')}
        className="text-3xl px-5 py-2.5 bg-amber-600 text-white rounded-2xl"
      >
        Go to Admin page
      </button>
    </div>
  );
}

export default Home;
