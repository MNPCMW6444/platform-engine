import { channelNames, MuseClient } from "muse-js";
import UI from "./ui/UI";

import { epoch, fft, alphaPower } from "@neurosity/pipes";
import { format } from "path";
import { from } from "rxjs";
import { read } from "fs";
import { addChannelSample } from "./store/reducers/museReducer";
import { useDispatch } from "react-redux";
import Testing from "./ui/Testing";

interface AppProps {
  x: any;
}

const App = ({ x }: AppProps) => {
  /*  let length = [];

  //console.log(channelNames);

  for (let i = 0; i < 5000; i++) {
    length.push(i);
  }

  const array = length.map((x: number) => ({
    data: [Math.random(), Math.random(), Math.random(), Math.random()],
    timestamp: new Date(),
    info: {
      samplingRate: 256,
      channelNames: ["first", "second", "third", "forth"],
    },
  }));
 */
  const dispatch = useDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <button style={{ fontSize: "10rem" }} onClick={() => {}}>
          stop
        </button>
        <br />
        <button
          style={{ fontSize: "10rem" }}
          onClick={async () => {
            let client = new MuseClient();
            await client.connect();
            await client.start();
            // let c = 0;
            client.eegReadings.subscribe((reading) => {
              dispatch(addChannelSample(reading));
              /*   (3 * Betalowfp1fp2 +
                2 * Betamidfp1fp2 +
                betahighfp1fp2 -
                (2 * thetafp1fp2 + 2 * alphalowa1a2 + alphalowa1a2)) /
                6
 */
              /* 
              if (
                reading.electrode === 1 &&
                Math.abs(reading.samples[5]) < 700
              ) {
                234234;
                c = 0;
              } else c++;
            });

            from(array)
              .pipe(epoch({ duration: 256, interval: 100 }), fft({ bins: 8 }))
              .subscribe((x) => {
                /* console.log(x) 
              }); */
            });
          }}
        >
          start
        </button>
      </header>
      <Testing x={x} />
    </div>
  );
  return <UI />;
};

export default App;
