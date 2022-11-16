import Game from "./Game";
import { MuseClient } from "muse-js";
import { useEffect, useState } from "react";
import Play from "./Play";

/* async function main() {
  client = new MuseClient();
  await client.connect();
  await client.start();
  client.eegReadings.subscribe((reading: any) => {
    //  console.log(reading);
  });
  console.log(await client);
} */

const sum = (ob: any) => {
  let sum = 0;
  Object.values(ob).forEach((value: any) => {
    sum = sum + +value;
  });
  return sum;
};

/* 

let alphalowfp1fp2 =  +(all as any).alphalowfp1fp2       ;
let alphalowa1a2 =  +(all as any).alphalowa1a2       ;
let alphahighfp1fp2 =  +(all as any).alphahighfp1fp2       ;
let alphahigha1a2 =  +(all as any).alphahigha1a2       ;
let Betalowfp1fp2 =  +(all as any).Betalowfp1fp2       ;
let Betamidfp1fp2 =  +(all as any).Betamidfp1fp2       ;
let betahighfp1fp2 =  +(all as any).betahighfp1fp2       ;
let thetafp1fp2 =  +(all as any).thetafp1fp2    ;*/

export default function UI() {
  const [all, setAll] = useState({});

  let alphalowfp1fp2;
  let alphalowa1a2;
  let alphahighfp1fp2;
  let alphahigha1a2;
  let Betalowfp1fp2;
  let Betamidfp1fp2;
  let betahighfp1fp2;
  let thetafp1fp2;

  useEffect(() => {
    let min = 99999999;
    let max = -99999999999;
    for (let a = 0; a < 101; a += 10) {
      for (let b = 0; b < 101; b += 10) {
        for (let c = 0; c < 101; c += 10) {
          for (let d = 0; d < 101; d += 10) {
            for (let e = 0; e < 101; e += 10) {
              for (let f = 0; f < 101; f += 10) {
                console.log(a, b, c, d, e, f);
                const score = (3 * a + 2 * b + c - (2 * d + 2 * e + f)) / 6;
                if (score > max) max = score;
                if (score < min) min = score;
              }
            }
          }
        }
      }
    }
    console.log(min);
    console.log(max);
  }, []);

  /* 
  alphalowfp1fp2 = a;
  alphalowa1a2 = b;
  alphahighfp1fp2 = c;
  alphahigha1a2 = d;
  Betalowfp1fp2 = e;
  Betamidfp1fp2 = f;
  betahighfp1fp2 = g;
  thetafp1fp2 = h;
 */
  return (
    <div>
      {/*  <button onClick={() => main()} />
      <Game status={70} /> */}
      {[
        "alphalowfp1fp2",
        "alphalowa1a2",
        "alphahighfp1fp2",
        "alphahigha1a2",
        "Betalowfp1fp2",
        "Betamidfp1fp2",
        "betahighfp1fp2",
        "thetafp1fp2",
      ].map((l) => (
        <>
          <Play label={l} value={all} setValue={setAll} />
          <br />
        </>
      ))}
      <br />
      {sum(all) !== 100 && <div style={{ color: "red" }}>error</div>}
      <br />
      {/*  <br />
      <div>
        {" "}
        {(3 * Betalowfp1fp2 +
          2 * Betamidfp1fp2 +
          betahighfp1fp2 -
          (2 * thetafp1fp2 + 2 * alphalowa1a2 + alphalowa1a2)) /
          6}
      </div> */}
    </div>
  );
}
