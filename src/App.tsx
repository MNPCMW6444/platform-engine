import { channelNames, MuseClient } from "muse-js";
import UI from "./ui/UI";

import { epoch, fft, alphaPower } from "@neurosity/pipes";
import { format } from "path";
import { from } from "rxjs";
import { read } from "fs";
import { addChannelSample } from "./store/reducers/museReducer";
import { useDispatch } from "react-redux";
import Testing from "./ui/Testing";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

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

  const MUSE = (
    <Grid container columnSpacing={3}>
      <Grid item>
        <Button
          variant="outlined"
          style={{ backgroundColor: "white", fontSize: "2.6rem" }}
          onClick={async () => {
            let client = new MuseClient();
            await client.connect();
            await client.start();
            client.eegReadings.subscribe((reading) => {
              dispatch(addChannelSample(reading));
            });
          }}
        >
          connect
        </Button>
      </Grid>

      <Grid item>
        <Button
          variant="outlined"
          style={{ backgroundColor: "white", fontSize: "2.6rem" }}
          color="error"
          onClick={() => {}}
        >
          disconnect
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <Grid
      container
      height="94vh"
      paddingTop="3vh"
      direction="column"
      rowSpacing={6}
      justifyContent="space-around"
      alignItems="center"
    >
      <Grid item>{MUSE}</Grid>
      <Testing x={x} />
    </Grid>
  );
};

export default App;
