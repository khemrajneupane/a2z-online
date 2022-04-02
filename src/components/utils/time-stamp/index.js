import React from "react";
import { number, string } from "prop-types";
import "./time-stamp.css";

const TimeStamp = ({ timeStamp, prefix = "" }) => {
  const options = {
    /*weekday: "short",*/
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  };

  const time = new Date(timeStamp).toLocaleString("gb-GB", options);
  return (
    timeStamp && (
      <div className="date">
        <span> {prefix}</span>
        <time dateTime={new Date(timeStamp).toISOString()}> {time} </time>
      </div>
    )
  );
};

TimeStamp.propTypes = {
  timeStamp: number,
  prefix: string
};

export default TimeStamp;
