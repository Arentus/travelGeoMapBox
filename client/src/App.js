import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { listLogEntries } from "./API";

const App = () => {
  const [logEntries, setLogEntries] = useState([]);

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 10.250576,
    longitude: -67.5977249,
    zoom: 7,
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
      console.log(logEntries);
    })();
  }, []);
  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/arentus/cknp8vq580cbj17nw31vwzpca"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
      {/* esto no funciona arreglalo */}
      {logEntries.map((entry) => {
        <Marker
          key={entry._id}
          latitude={entry.latitude}
          longitude={entry.longitude}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <div>Aqui estas</div>
        </Marker>;
      })}
    </ReactMapGL>
  );
};
export default App;
