import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { listLogEntries } from "./API";

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopUp] = React.useState({});

  const initialLatitude = 10.250576;
  const initialLongitude = -67.5977249;
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: initialLatitude,
    longitude: initialLongitude,
    zoom: 9,
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
      logEntries.map((entry) => {
        console.log(
          "latitude: " + entry.latitude + "longitude: " + entry.longitude
        );
      });
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
        return (
          <React.Fragment>
            <Marker
              key={entry._id}
              latitude={entry.latitude}
              longitude={entry.longitude}
            >
              <div
                onClick={() => {
                  setShowPopUp({
                    // ...showPopup,
                    [entry._id]: true,
                  });
                }}
              >
                <img
                  className="marker"
                  style={{
                    height: `${3 * viewport.zoom}px`,
                    width: `${3 * viewport.zoom}px`,
                  }}
                  src="https://i.imgur.com/y0G5YTX.png"
                />
              </div>
            </Marker>

            {showPopup[entry._id] ? (
              <Popup
                latitude={entry.latitude}
                longitude={entry.longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setShowPopUp({})}
                anchor="top"
              >
                <div className="popup">
                  <h4>{entry.title}</h4>
                  <p>{entry.comments}</p>
                </div>
              </Popup>
            ) : null}
          </React.Fragment>
        );
      })}
    </ReactMapGL>
  );
};
export default App;
