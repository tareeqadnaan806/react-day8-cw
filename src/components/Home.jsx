import React, { useState } from "react";

const Home = () => {
  const [newSubject, setNewSubject] = useState("");
  const [newHours, setNewHours] = useState("");
  const [subject, setSubject] = useState([]);

  // Load subjects and hours from local storage
  const savedSubjects = JSON.parse(localStorage.getItem("subjects")) || [];
  if (savedSubjects.length > 0 && subject.length === 0) {
    setSubject(savedSubjects);
  }

  const fnadd = () => {
    if (newSubject && newHours) {
      const updatedSubjects = [
        ...subject,
        { subject: newSubject, hours: parseInt(newHours) },
      ];
      setSubject(updatedSubjects);
      setNewSubject("");
      setNewHours("");

      // Update local storage
      localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
    }
  };

  const add = (index) => {
    const updatedSubjects = [...subject];
    updatedSubjects[index].hours += 1;
    setSubject(updatedSubjects);

    // Update local storage
    localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
  };

  const sub = (index) => {
    const updatedSubjects = [...subject];
    if (updatedSubjects[index].hours > 0) {
      updatedSubjects[index].hours -= 1;
      setSubject(updatedSubjects);

      // Update local storage
      localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div>
          <h1 className="text-center text-2xl font-bold">
            Geekster Education Planner
          </h1>
          <input
            type="text"
            placeholder="Subject"
            className="p-2 m-3 border-2 rounded"
            onChange={(e) => setNewSubject(e.target.value)}
          />
          <input
            type="number"
            placeholder="Hours"
            className="p-2 m-3 border-2 rounded"
            onChange={(e) => setNewHours(e.target.value)}
          />
          <button onClick={fnadd} className="border-2 rounded bg-slate-400 p-2">
            Add
          </button>
          {subject.map((ele, ind) => {
            const { subject, hours } = ele;
            return (
              <div key={ind} className="flex justify-center items-center">
                <h1 className="font-bold text-xl">
                  {subject} - {hours} hours
                </h1>
                <button
                  onClick={() => add(ind)}
                  className="bg-green-500 px-3 py-2 rounded m-2"
                >
                  +
                </button>
                <button
                  onClick={() => sub(ind)}
                  className="bg-red-500 px-3.5 py-2 rounded "
                >
                  -
                </button>
              </div>
            );
          })}
          <br />
        </div>
      </div>
    </div>
  );
};

export default Home;
