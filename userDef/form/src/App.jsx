import { useState } from 'react'

function App() {

  const [form, setForm] = useState({
    name: "",
    regno: "",
    mobile: "",
    course: "",
    slot: "A",
    session: "Morning"
  });

  const [display, setDisplay] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisplay(form);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Course Registration Form</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <br /><br />

        <input type="text" name="regno" placeholder="Register Number" onChange={handleChange} />
        <br /><br />

        <input type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} />
        <br /><br />

        <input type="text" name="course" placeholder="Course Name" onChange={handleChange} />
        <br /><br />

        {/* Dropdown */}
        <label>Slot: </label>
        <select name="slot" onChange={handleChange}>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
          <option value="G">G</option>
        </select>
        <br /><br />

        {/* Radio */}
        <label>Session: </label>
        <input
          type="radio"
          name="session"
          value="Morning"
          checked={form.session === "Morning"}
          onChange={handleChange}
        /> Morning

        <input
          type="radio"
          name="session"
          value="Afternoon"
          onChange={handleChange}
        /> Afternoon

        <br /><br />

        <button type="submit">Display</button>
      </form>

      {/* ✅ OUTPUT */}
      {display && (
        <div style={{ marginTop: "20px" }}>
          <h3>Entered Details</h3>
          <p>Name: {display.name}</p>
          <p>Reg No: {display.regno}</p>
          <p>Mobile: {display.mobile}</p>
          <p>Course: {display.course}</p>
          <p>Slot: {display.slot}</p>
          <p>Session: {display.session}</p>
        </div>
      )}
    </div>
  );
}

export default App;