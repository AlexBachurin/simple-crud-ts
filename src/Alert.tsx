import React, { useEffect } from "react";

type AlertProps = {
  type: string;
  msg: string;
};

const Alert: React.FC<AlertProps> = ({ type, msg }) => {
  return <p className={`${type}`}>{msg}</p>;
};

export default Alert;
