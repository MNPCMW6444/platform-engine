import { MuseClient } from "muse-js";
import UI from "./ui/UI";

import { epoch, fft, alphaPower } from "@neurosity/pipes";
import { format } from "path";
import { from } from "rxjs";

function App() {
  let length = [];

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
            client.eegReadings.subscribe((reading) => {
              /*   (3 * Betalowfp1fp2 +
                2 * Betamidfp1fp2 +
                betahighfp1fp2 -
                (2 * thetafp1fp2 + 2 * alphalowa1a2 + alphalowa1a2)) /
                6
 */

              console.log(reading);
            });

            from(array)
              .pipe(epoch({ duration: 256, interval: 100 }), fft({ bins: 8 }))
              .subscribe((x) => {
                /* console.log(x) */
              });
          }}
        >
          start
        </button>
      </header>
    </div>
  );
  return <UI />;
}

export default App;
