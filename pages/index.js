import React, {useRef} from "react";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("../components/Map"), {
  ssr: false
});

export default function Home() {
  return (
    <main>
      <div id="map">
      <MapWithNoSSR/>
      </div>
    </main>
  );
}
