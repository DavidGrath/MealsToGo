import React from "react";
import CompactInfoCard from "../CompactInfoCard";

function MapCallout({ restaurant, ...props }) {
  return <CompactInfoCard restaurant={restaurant} isOnMapView={true} />;
}

export default MapCallout;
