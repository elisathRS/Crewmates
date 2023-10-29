import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './CreateCrewmate.css';

const supabaseUrl = import.meta.env.VITE_APP_PROJECT_LINK;
const supabaseKey = import.meta.env.VITE_APP_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

function CreateCrewmate() {
  const [newCrewmateName, setNewCrewmateName] = useState("");
  const [newCrewmateSpeed, setNewCrewmateSpeed] = useState("");
  const [newCrewmateColor, setNewCrewmateColor] = useState("");

  async function addCrewmate() {
    const { data, error } = await supabase.from("crewmates").insert({
      name: newCrewmateName,
      speed: newCrewmateSpeed,
      color: newCrewmateColor,
    });
    if (error) {
      console.error(error);
    } else {
      setNewCrewmateName("");
      setNewCrewmateSpeed("");
      setNewCrewmateColor("");
    }
  }

  return (
    <div className="container">
      <div>
        <h3>Create a New Crewmate</h3>
       
        <input
          type="text"
          placeholder="Name"
          value={newCrewmateName}
          onChange={(e) => setNewCrewmateName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Speed"
          value={newCrewmateSpeed}
          onChange={(e) => setNewCrewmateSpeed(e.target.value)}
        />
        
        <select
          value={newCrewmateColor}
          onChange={(e) => setNewCrewmateColor(e.target.value)}
        >
          <option value="">Select a color</option>
          <option value="Blue">Blue</option>
          <option value="Green">Green</option>
          <option value="Yellow">Yellow</option>
          <option value="Purple">Purple</option>
          <option value="Red">Red</option>
          <option value="Orange">Orange</option>
        </select>

        <button onClick={addCrewmate}>Create a Crewmate</button>
      </div>
    </div>
  );
}

export default CreateCrewmate;