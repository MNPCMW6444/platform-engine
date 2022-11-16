import Game from "./Game";
import { MuseClient } from "muse-js";
import { useEffect } from "react";

async function main() {
  let client = new MuseClient();
  await client.connect();
  await client.start();
  client.eegReadings.subscribe((reading: any) => {
    //  console.log(reading);
  });
  console.log(await client.deviceInfo());
}

export default function UI() {
  return (
    <div>
      <button onClick={() => main()} />
      <Game status={70} />
    </div>
  );
}
