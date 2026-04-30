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
  const [errors, setErrors] = useState({}); // ✅ NEW

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ✅ SIMPLE VALIDATION FUNCTION
  const validate = () => {
    let err = {};

    if (!form.name.trim()) {
      err.name = "Name is required";
    }

    if (!/^[2-6]{2}[A-Z]{3}[0-9]{4}$/.test(form.regno)) {
      err.regno = "Enter valid register number";
    }

    if (!/^[1-9]{10}$/.test(form.mobile)) {
      err.mobile = "Enter valid 10-digit mobile number";
    }

    if (!form.course.trim()) {
      err.course = "Course is required";
    }

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // ❌ show errors
      setDisplay(null);
    } else {
      setErrors({});
      setDisplay(form); // ✅ show data
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Course Registration Form</h2>

      <form onSubmit={handleSubmit}>

        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <br />
        {errors.name && <span style={{color:"red"}}>{errors.name}</span>}
        <br />

        <input type="text" name="regno" placeholder="Register Number" onChange={handleChange} />
        <br />
        {errors.regno && <span style={{color:"red"}}>{errors.regno}</span>}
        <br />

        <input type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} />
        <br />
        {errors.mobile && <span style={{color:"red"}}>{errors.mobile}</span>}
        <br />

        <input type="text" name="course" placeholder="Course Name" onChange={handleChange} />
        <br />
        {errors.course && <span style={{color:"red"}}>{errors.course}</span>}
        <br />

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

      {/* OUTPUT */}
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