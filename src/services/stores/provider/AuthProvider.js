// import React, { useReducer } from "react";
// import AuthContext from "../context/AuthContext";
// import reducer, { initState } from "../reducer/reducer";

// function AuthProvider({ children }) {
//   // const [state, dispatch] = useReducer(reducer, initState);//Này cho useReducer

//   const state = {
//     result: [
//       { id: "1", name: "Nguyen Dac Dat" },
//       { id: "2", name: "130503" },
//     ],
//   };
//   const value = {
//     state,
//   };
//   return (
//     // <AuthContext.Provider value={[state, dispatch]}>
//     //   {children}
//     // </AuthContext.Provider>
//     <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
//   );
// }

// export default AuthProvider;
