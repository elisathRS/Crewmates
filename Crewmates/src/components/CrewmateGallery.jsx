import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CrewmateGallery.css";


const supabaseUrl = import.meta.env.VITE_APP_PROJECT_LINK;
const supabaseKey = import.meta.env.VITE_APP_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

function CrewmateGallery() {
  const [crewmates, setCrewmates] = useState([]);
  const [editingCrewmate, setEditingCrewmate] = useState(null);
  const [editingCrewmateColor, seteditingCrewmateColor] = useState("");

  useEffect(() => {
    fetchCrewmates();
  }, []);

  async function fetchCrewmates() {
    const { data: crewmates, error } = await supabase
      .from("crewmates")
      .select("*");
    if (error) {
      console.error(error);
    } else {
      setCrewmates(crewmates);
    }
  }

  async function updateCrewmate() {
    const { data, error } = await supabase
      .from("crewmates")
      .update({
        name: editingCrewmate.name,
        speed: editingCrewmate.speed,
        color: editingCrewmate.color,
      })
      .eq("id", editingCrewmate.id);
    window.location.reload(); // reload the page

    if (error) {
      console.error(error);
    } else if (data && data.length > 0) {
      // add a check for null/empty data
      const updatedCrewmates = crewmates.map((crewmate) =>
        crewmate.id === data[0].id ? data[0] : crewmate
      );
      setCrewmates(updatedCrewmates);
      setEditingCrewmate(null);
    }
  }

  async function deleteCrewmate(crewmate) {
    const { error } = await supabase
      .from("crewmates")
      .delete()
      .eq("id", crewmate.id);
    if (error) {
      console.error(error);
    } else {
      const updatedCrewmates = crewmates.filter((c) => c.id !== crewmate.id);
      setCrewmates(updatedCrewmates);
    }
  }

  function startEditingCrewmate(crewmate) {
    setEditingCrewmate(crewmate);
  }

  function cancelEditingCrewmate() {
    setEditingCrewmate(null);
  }
  

  return (
    <div className="container">
      <div className="content-container">
        {editingCrewmate ? (
          <div>
            <h3>Edit crewmate:</h3>
            <input
              type="text"
              placeholder="Name"
              value={editingCrewmate.name}
              onChange={(e) =>
                setEditingCrewmate({ ...editingCrewmate, name: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Speed"
              value={editingCrewmate.speed}
              onChange={(e) =>
                setEditingCrewmate({
                  ...editingCrewmate,
                  speed: e.target.value,
                })
              }
            />

            <select
              value={editingCrewmate.color}
              onChange={(e) =>
                setEditingCrewmate({
                  ...editingCrewmate,
                  color: e.target.value,
                })
              }
            >
              <option value="">Select a color...</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
              <option value="Yellow">Yellow</option>
              <option value="Purple">Purple</option>
              <option value="Red">Red</option>
              <option value="Orange">Orange</option>
            </select>

            <button  className= "saveButton" onClick={updateCrewmate}>Save</button>
            <button className="cancelButton" onClick={cancelEditingCrewmate}>Cancel</button>
            
            
          </div>
        ) : (
          <h3>List Crewmates:</h3>
        )}
  {crewmates.length ? (
  <table className="crewmateTable">
    <thead>
      <tr>
        <th>Name</th>
        <th>Speed</th>
        <th>Color</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {crewmates.map((crewmate) => (
        <tr key={crewmate.id}>
          <td>
            <Link to={`/crewmates/${crewmate.id}`}>
              {crewmate.name}
            </Link>
          </td>
          <td>{crewmate.speed} mph</td>
          <td>
            <div className="colorBox" style={{ backgroundColor: crewmate.color }}>
              {crewmate.color}
            </div>
          </td>
          <td>
            <button className="editButton" onClick={() => startEditingCrewmate(crewmate)}>Edit</button>
            <button className="deleteButton" onClick={() => deleteCrewmate(crewmate)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p className="noCrewmates">You have not made a crewmate yet!</p>
)}

      </div>
    </div>
  );
}

export default CrewmateGallery;