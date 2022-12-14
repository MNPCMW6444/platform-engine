import Button from "@mui/material/Button";
import { orange } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";

//import mexp from "math-expression-evaluator";
import { evaluate } from "mathjs";
import { from, Observable } from "rxjs";

import { store } from "../store/store";
import { epoch, fft, powerByBand } from "@neurosity/pipes";
import { FrequencyBands } from "../constants";
import { FrequencyRangeInHz } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

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

  useEffect(() => {
    r !== "" && localStorage.setItem("r", r);
  }, [r]);

  useEffect(() => {
    setr(localStorage.getItem("r") + "");
  }, []);

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
    <>
      <Grid item>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="white" sx={{ fontSize: "1rem" }}>
                  Theta
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="white" sx={{ fontSize: "1rem" }}>
                  AlphaLow
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="white" sx={{ fontSize: "1rem" }}>
                  AlphaHigh
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="white" sx={{ fontSize: "1rem" }}>
                  BetaLow
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="white" sx={{ fontSize: "1rem" }}>
                  BetaMid
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="white" sx={{ fontSize: "1rem" }}>
                  BetaHigh
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="white" sx={{ fontSize: "1rem" }}>
                  Gamma
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " ThetaA1 ")}
                >
                  A1
                </Button>
              </TableCell>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " ThetaA2 ")}
                >
                  A2
                </Button>
              </TableCell>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " ThetaF7 ")}
                >
                  F7
                </Button>
              </TableCell>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " ThetaF8 ")}
                >
                  F8
                </Button>
              </TableCell>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " AlphaLowA1 ")}
                >
                  A1
                </Button>
              </TableCell>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " AlphaLowA2 ")}
                >
                  A2
                </Button>
              </TableCell>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " AlphaLowF7 ")}
                >
                  F7
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " AlphaLowF8 ")}
                >
                  F8
                </Button>
              </TableCell>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " AlphaHighA1 ")}
                >
                  A1
                </Button>
              </TableCell>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " AlphaHighA2 ")}
                >
                  A2
                </Button>
              </TableCell>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " AlphaHighF7 ")}
                >
                  F7
                </Button>
              </TableCell>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " AlphaHighF8 ")}
                >
                  F8
                </Button>
              </TableCell>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " BetaLowA1 ")}
                >
                  A1
                </Button>
              </TableCell>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " BetaLowA2 ")}
                >
                  A2
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " BetaLowF7 ")}
                >
                  F7
                </Button>
              </TableCell>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " BetaLowF8 ")}
                >
                  F8
                </Button>
              </TableCell>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " BetaMidA1 ")}
                >
                  A1
                </Button>
              </TableCell>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " BetaMidA2 ")}
                >
                  A2
                </Button>
              </TableCell>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " BetaMidF7 ")}
                >
                  F7
                </Button>
              </TableCell>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " BetaMidF8 ")}
                >
                  F8
                </Button>
              </TableCell>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " BetaHighA1 ")}
                >
                  A1
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " BetaHighA2 ")}
                >
                  A2
                </Button>
              </TableCell>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " BetaHighF7 ")}
                >
                  F7
                </Button>
              </TableCell>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " BetaHighF8 ")}
                >
                  F8
                </Button>
              </TableCell>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " GammaA1 ")}
                >
                  A1
                </Button>
              </TableCell>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " GammaA2 ")}
                >
                  A2
                </Button>
              </TableCell>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " GammaF7 ")}
                >
                  F7
                </Button>
              </TableCell>
              <TableCell>
                {" "}
                <Button
                  sx={{ color: "#99AAFF", fontSize: "1.4rem" }}
                  onClick={() => setr((prev) => prev + " GammaF8 ")}
                >
                  F8
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
      <Grid item width="100%">
        <TextField
          fullWidth
          value={r}
          inputProps={{
            style: { color: "white" },
          }}
          onChange={(e) => setr(e.target.value)}
        />
      </Grid>
      <Grid item>
        <Typography color="white" sx={{ fontSize: "1rem" }}>
          Muse {!s && "dis"}Connected
        </Typography>
      </Grid>
      <Grid item>
        <Typography color="white" sx={{ fontSize: "1rem" }}>
          {parseNFTModel(r, s)}
        </Typography>
      </Grid>{" "}
    </>
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
