import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { orange } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import { useState } from "react";

//import mexp from "math-expression-evaluator";
import { evaluate } from "mathjs";
import { from, Observable } from "rxjs";

import { store } from "../store/store";
import { epoch, fft, powerByBand } from "@neurosity/pipes";
import { FrequencyBands } from "../constants";
import { FrequencyRangeInHz } from "../types";

interface TestingProps {
  x: any;
}

const state$ = from(store);

type StoreType = typeof store;

function getState$(store: StoreType) {
  return new Observable(function (observer) {
    // emit the current state as first value:
    observer.next(
      store.getState().muse.museReadings[
        store.getState().muse.museReadings.length - 1
      ]
    );
    const unsubscribe = store.subscribe(function () {
      // emit on every new state changes
      observer.next(
        store.getState().muse.museReadings[
          store.getState().muse.museReadings.length - 1
        ]
      );
    });
    // let's return the function that will be called
    // when the Observable is unsubscribed
    return unsubscribe;
  });
}

const freqnames = Object.keys(FrequencyBands);
const freqrange: FrequencyRangeInHz[] = Object.values(FrequencyBands);

const frequencyBands = {} as any;

freqnames.forEach((freqname: string, index: number) => {
  frequencyBands[freqname] = [
    freqrange[index].minFrequencyiInHz,
    freqrange[index].maxFrequencyiInHz,
  ];
});

const Testing = ({ x }: TestingProps) => {
  // const [it, setIt] = useState<string>("");
  const [r, setr] = useState<string>("");

  const [s, sets] = useState<any>();

  getState$(store)
    .pipe(
      epoch({ duration: 256, interval: 100 }),
      fft({ bins: 256 }),
      powerByBand(frequencyBands)
    )
    .subscribe((y) => {
      sets(y);
    });

  return (
    <Grid
      container
      direction="column"
      height={"40vh"}
      width="700px"
      justifyContent="space-around"
      sx={{ backgroundColor: orange[50] }}
    >
      <Grid item container>
        <Grid item>
          <Grid item>
            <Typography sx={{ fontSize: "0.8rem" }}>Theta</Typography>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " ThetaA1 ")}>
              A1
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " ThetaA2 ")}>
              A2
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " ThetaF7 ")}>
              F7
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " ThetaF8 ")}>
              F8
            </Button>
          </Grid>
        </Grid>

        <Grid item>
          <Grid item>
            <Typography sx={{ fontSize: "0.8rem" }}>AlphaLow</Typography>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " AlphaLowA1 ")}>
              A1
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " AlphaLowA2 ")}>
              A2
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " AlphaLowF7 ")}>
              F7
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " AlphaLowF8 ")}>
              F8
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <Grid item>
            <Typography sx={{ fontSize: "0.8rem" }}>AlphaHigh</Typography>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " AlphaHighA1 ")}>
              A1
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " AlphaHighA2 ")}>
              A2
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " AlphaHighF7 ")}>
              F7
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " AlphaHighF8 ")}>
              F8
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <Grid item>
            <Typography sx={{ fontSize: "0.8rem" }}>BetaLow</Typography>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " BetaLowA1 ")}>
              A1
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " BetaLowA2 ")}>
              A2
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " BetaLowF7 ")}>
              F7
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " BetaLowF8 ")}>
              F8
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <Grid item>
            <Typography sx={{ fontSize: "0.8rem" }}>BetaMid</Typography>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " BetaMidA1 ")}>
              A1
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " BetaMidA2 ")}>
              A2
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " BetaMidF7 ")}>
              F7
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " BetaMidF8 ")}>
              F8
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <Grid item>
            <Typography sx={{ fontSize: "0.8rem" }}>BetaHigh</Typography>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " BetaHighA1 ")}>
              A1
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " BetaHighA2 ")}>
              A2
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " BetaHighF7 ")}>
              F7
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " BetaHighF8 ")}>
              F8
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <Grid item>
            <Typography sx={{ fontSize: "0.8rem" }}>Gamma</Typography>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " GammaA1 ")}>
              A1
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " GammaA2 ")}>
              A2
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " GammaF7 ")}>
              F7
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + " GammaF8 ")}>
              F8
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item>
        <TextField
          InputProps={{
            readOnly: true,
          }}
          value={it}
        />
      </Grid>
      <Grid item>
        <Button onClick={() => setr((prev) => prev + it)}>אשר</Button>
      </Grid> */}
      <Grid item width="700px">
        <TextField
          fullWidth={true}
          value={r}
          onChange={(e) => setr(e.target.value)}
        />
      </Grid>
      <Grid item>Muse {!s && "dis"}Connected</Grid>
      <Grid item>{parseNFTModel(r, s)}</Grid>
    </Grid>
  );
};

const parseNFTModel = (nfTString: string, x: any) => {
  try {
    let exp = nfTString;

    debugger;
    const res = evaluate(exp, {
      ThetaA1: x.THETA[0],
      ThetaA2: x.THETA[1],
      ThetaF7: x.THETA[2],
      ThetaF8: x.THETA[3],
      AlphaLowA1: x.ALPHA_LOW[0],
      AlphaLowA2: x.ALPHA_LOW[1],
      AlphaLowF7: x.ALPHA_LOW[2],
      AlphaLowF8: x.ALPHA_LOW[3],
      AlphaHighA1: x.ALPHA_HIGH[0],
      AlphaHighA2: x.ALPHA_HIGH[1],
      AlphaHighF7: x.ALPHA_HIGH[2],
      AlphaHighF8: x.ALPHA_HIGH[3],
      BetaLowA1: x.BETA_LOW[0],
      BetaLowA2: x.BETA_LOW[1],
      BetaLowF7: x.BETA_LOW[2],
      BetaLowF8: x.BETA_LOW[3],
      BetaMidA1: x.BETA_MID[0],
      BetaMidA2: x.BETA_MID[1],
      BetaMidF7: x.BETA_MID[2],
      BetaMidF8: x.BETA_MID[3],
      BetaHighA1: x.BETA_HIGH[0],
      BetaHighA2: x.BETA_HIGH[1],
      BetaHighF7: x.BETA_HIGH[2],
      BetaHighF8: x.BETA_HIGH[3],
      GammaA1: x.GAMMA[0],
      GammaA2: x.GAMMA[1],
      GammaF7: x.GAMMA[2],
      GammaF8: x.GAMMA[3],
    });
    return res;
  } catch (e) {}
  try {
    let parStart = -1;
    parStart = nfTString.indexOf("(");
    let parEnd = -1;
    parEnd = nfTString.indexOf(")");
    let inside = nfTString.substring(parStart, parEnd);
    let outside = nfTString;
    let isParInStart = parStart === 0;
    let isParInEnd = parEnd === nfTString.length - 1;
  } catch (e) {
    return "Error in Expression";
  }
  return "";
};

export default Testing;
