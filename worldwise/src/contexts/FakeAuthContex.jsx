import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const FAKE_USER = {
  name: "Jonas",
  emaiL: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialstate = {
  user: null,
  isAuthenticated: false,
};
function Reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
  }
}
function FakeAuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    Reducer,
    initialstate
  );

  function login({ email, password }) {
    if (email === FAKE_USER.emaiL && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout", payload: FAKE_USER });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
function UseAuth() {
  const context = useContext(AuthContext);
  return context;
  // if (context === undefined) {
  //   throw new Error("useAuth must be used within a AuthProvider");
  // }
}

export { FakeAuthProvider, UseAuth };
