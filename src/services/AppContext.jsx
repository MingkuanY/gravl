import { useState, createContext } from "react";

const AppContext = createContext();

function AppProvider(props) {
  const [state, setState] = useState({});

  return (
    <AppContext.Provider value={[state, setState]}>
      {props.children}
    </AppContext.Provider>
  );
}

export { AppProvider };
export default AppContext;
