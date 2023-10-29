import React, { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import { useParams } from "react-router-dom";
import "./CrewmateDetails.css";

const supabaseUrl = import.meta.env.VITE_APP_PROJECT_LINK;
const supabaseKey = import.meta.env.VITE_APP_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

function CrewmateDetails() {
  const { id } = useParams();
  const [crewmates, setCrewmates] = useState([]);
  const [crewmate, setCrewmate] = useState(null);
  
  useEffect(() => {
    async function fetchCrewmates() {
      const { data, error } = await supabase.from("crewmates").select("*");
      if (error) {
        console.error(error);
      } else {
        setCrewmates(data);
      }
    }
    fetchCrewmates();
  }, []);
  
  useEffect(() => {
    if (crewmates.length > 0) {
      const selectedCrewmate = crewmates.find((crewmate) => crewmate.id === parseInt(id));
      setCrewmate(selectedCrewmate);
    }
  }, [crewmates, id]);

  return (
    <div className="container">
      {crewmate ? (
        <div>
          <h2>{crewmate.name}</h2>
          <p>Speed: {crewmate.speed}</p>
          <p >Color: <span className="colorBox" style={{ backgroundColor: crewmate.color }}> {crewmate.color}</span></p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CrewmateDetails;