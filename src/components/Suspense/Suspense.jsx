import React, { Suspense } from "react";
import Loading from "../Loading/Loading";
// import Loading from "../components/Loading/Loading";

const Suspenses = ({ children, message }) => (
  <Suspense fallback={<Loading message={message} />}>{children}</Suspense>
);

export default Suspenses;
