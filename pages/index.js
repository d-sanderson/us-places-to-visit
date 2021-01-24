import React, {useRef} from "react";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("../components/Map"), {
  ssr: false
});

const ForwardedRefComponent = React.forwardRef((props, ref) => (
  <MapWithNoSSR {...props} forwardedRef={ref} />
))

export default function Home() {
const mapRef = useRef();
  return (
    <main>
      <div id="map">
      <ForwardedRefComponent ref={mapRef}/>
      </div>
    </main>
  );
}
