import { PropsWithChildren } from "react";

// Providers
import ReactQueryProvider from "./ReactQueryProvider";
import ReduxProvider from "./ReduxProvider";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    
      <ReactQueryProvider>
        <ReduxProvider>
    
              {children}
    
    
        </ReduxProvider>
      </ReactQueryProvider>
    
  );
};

export default Providers;
