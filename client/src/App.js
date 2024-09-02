import logo from "./logo.svg";
import "./App.css";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";

function App() {
  async function sendRequest() {
    const tokens = JSON.parse(localStorage.getItem("tokens"));

    const response = await fetch("http://localhost:8000/api/protected", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
  }
  return (
    <div className="App">
      <RegistrationForm />
      <br />
      <br />
      <br />
      <br />
      <br />
      <LoginForm />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={sendRequest}>Send Request</button>
    </div>
  );
}

export default App;
