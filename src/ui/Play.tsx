import React, { useState } from "react";

export default function Play({ label, value, setValue }: any) {
  return (
    <>
      <label>{label}</label>{" "}
      <input
        type="number"
        min={0}
        max={100}
        value={value[label]}
        onChange={(e: any) => {
          const temp = { ...value };
          temp[label] = e.target.value;
          setValue({ ...temp });
        }}
      />
    </>
  );
}
