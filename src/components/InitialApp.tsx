import React, { ReactNode, useEffect, useState } from "react";

import Loader from "./Loader";

type Props = {
  children: ReactNode;
};

const InitialApp = (props: Props) => {
  const { children } = props;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (isLoading) return <>{children}</>;

  return <Loader />;
};
export default InitialApp;
