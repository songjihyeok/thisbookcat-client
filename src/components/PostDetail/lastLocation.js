import React from "react";
import { useLastLocation } from "react-router-last-location";

const Hooks = (props) => {
  let thelocation =null
  let theY = props.Y
  const lastLocation = useLastLocation();
  if(lastLocation){
    thelocation= lastLocation.pathname
     theY =thelocation.split("/")[3]
  }
  
  console.log("lastlocation--------", theY)
  return (
      <div>
        {props.scrollY(theY)}
      </div>
  );
};

export default Hooks;