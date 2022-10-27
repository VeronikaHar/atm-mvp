import PinPad from "./components/PinPad";
import { useState } from "react";
import AccountView from "./components/AccountView";

function App() {
  const [authorizedUser, setAuthorizedUser] = useState();
  const [users] = useState([
    {
      pin: "123",
      name: "Helen",
      remainingBalance: 200000,
      dailyWithdrawalLimit: 1000,
      withdrawnToday: 150,
      lastWithdrawalDate: "10/26/2022",
    },
    {
      pin: "456",
      name: "Mike",
      remainingBalance: 100000,
      dailyWithdrawalLimit: 2000,
      withdrawnToday: 200,
      lastWithdrawalDate: "10/27/2022",
    },
  ]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "60%",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <h1>ATM</h1>
      {authorizedUser ? (
        <AccountView
          authorizedUser={authorizedUser}
          setAuthorizedUser={setAuthorizedUser}
          users={users}
        />
      ) : (
        <PinPad users={users} setAuthorizedUser={setAuthorizedUser} />
      )}
    </div>
  );
}

export default App;
