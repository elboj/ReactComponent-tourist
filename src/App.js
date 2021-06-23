import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

const url = "https://course-api.com/react-tours-project";
function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    //the line below siply reads filter all the tours with id that isnt equal to the current id i clicked on
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  //FETCHING THE DATA FROM THE API

  const fetchTours = async () => {
    //LINE 20 LOADS THE LOADING COMPONENT, AND SINCE ITS SE TO TRUE, LOADING DISPLAYS ON SCREEN
    try {
      const response = await fetch(url);
      const data = await response.json();
      //LINE 24, DATA CAPTURED IN A JSON OBJECT CALLED TOURS WHICH WE THEN USE TO UPDATE THE USESTATE OF TOURS USING SETTOURS
      setLoading(false);
      setTours(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }

    //console.log(tours);
  };

  //using the useEffect here ensures that on load, the first thing that happens is that the data is fetched because Fetchtours() runs..
  //VERY IMPT POINT: We have to set the list of dependencies to run once, if not an infinite loop would occur.... explaination below
  //this would happen because when useEffect runs, fetchTours gets the data, but on line 26 and 27, we have a useState that runs, causing
  //rerender.. If the useEffect isnt set to run only once, it would in turn render again and run fetch tours, causing line 26 and 27
  //to also rerender again, in turn causing useeffect to also rerender.. this would just cause an infinite loop.
  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading></Loading>
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" onClick={() => fetchTours()}>
            refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* the reason for using tours = {tours } and same for second is because we are actually adding these these to a property called props... 
      so what we are just doing is giving equal name and value pairs */}
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
