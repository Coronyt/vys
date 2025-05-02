import { useState } from "react";

export default function DateTimeCell(props: any) {

    return (
        <div className="flex justify-center">
            <input type="date" />
            <input type="time" />
        </div>
    );
  }