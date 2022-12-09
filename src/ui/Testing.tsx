import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { orange } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import { useState } from "react";

import mexp from "math-expression-evaluator";

interface TestingProps {
  x: any;
}

const Testing = ({ x }: TestingProps) => {
  const [it, setIt] = useState<string>("");
  const [r, setr] = useState<string>("");

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
            <Button onClick={() => setr((prev) => prev + "[Theta-A1]")}>
              A1
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[Theta-A2]")}>
              A2
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[Theta-F7]")}>
              F7
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[Theta-F8]")}>
              F8
            </Button>
          </Grid>
        </Grid>

        <Grid item>
          <Grid item>
            <Typography sx={{ fontSize: "0.8rem" }}>AlphaLow</Typography>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[AlphaLow-A1]")}>
              A1
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[AlphaLow-A2]")}>
              A2
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[AlphaLow-F7]")}>
              F7
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[AlphaLow-F8]")}>
              F8
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <Grid item>
            <Typography sx={{ fontSize: "0.8rem" }}>AlphaHigh</Typography>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[AlphaHigh-A1]")}>
              A1
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[AlphaHigh-A2]")}>
              A2
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[AlphaHigh-F7]")}>
              F7
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[AlphaHigh-F8]")}>
              F8
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <Grid item>
            <Typography sx={{ fontSize: "0.8rem" }}>BetaLow</Typography>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[BetaLow-A1]")}>
              A1
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[BetaLow-A2]")}>
              A2
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[BetaLow-F7]")}>
              F7
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[BetaLow-F8]")}>
              F8
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <Grid item>
            <Typography sx={{ fontSize: "0.8rem" }}>BetaMid</Typography>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[BetaMid-A1]")}>
              A1
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[BetaMid-A2]")}>
              A2
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[BetaMid-F7]")}>
              F7
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[BetaMid-F8]")}>
              F8
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <Grid item>
            <Typography sx={{ fontSize: "0.8rem" }}>BetaHigh</Typography>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[BetaHigh-A1]")}>
              A1
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[BetaHigh-A2]")}>
              A2
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[BetaHigh-F7]")}>
              F7
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[BetaHigh-F8]")}>
              F8
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <Grid item>
            <Typography sx={{ fontSize: "0.8rem" }}>Gamma</Typography>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[Gamma-A1]")}>
              A1
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[Gamma-A2]")}>
              A2
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[Gamma-F7]")}>
              F7
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setr((prev) => prev + "[Gamma-F8]")}>
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
      <Grid item>{parseNFTModel(it)}</Grid>
    </Grid>
  );
};

const parseNFTModel = (nfTString: string) => {
  try {
    let parStart = -1;
    parStart = nfTString.indexOf("(");
    let parEnd = -1;
    parEnd = nfTString.indexOf(")");
    let inside = nfTString.substring(parStart, parEnd);
    let outside = nfTString.replace(inside, "");
    let isParInStart = parStart === 0;
    let isParInEnd = parEnd === nfTString.length - 1;
  } catch (e) {
    return "Error in Expression";
  }
  return "";
};

export default Testing;
