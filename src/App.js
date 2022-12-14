import PinPad from "./components/PinPad";
import { useState, useEffect } from "react";
import AccountView from "./components/AccountView";

function App() {
  const [authorizedUser, setAuthorizedUser] = useState();
  const [users, setUsers] = useState([
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

  // ensure to sync all the state updates for users
  useEffect(() => {
    const loggedInUserIdx = users?.findIndex(
      (user) => user.pin === authorizedUser?.pin
    );
    if (loggedInUserIdx > -1) {
      users[loggedInUserIdx] = {
        ...authorizedUser,
      };
      setUsers(users);
    }
  }, [authorizedUser, users]);
  console.log(users, authorizedUser);
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
        />
      ) : (
        <PinPad users={users} setAuthorizedUser={setAuthorizedUser} />
      )}
    </div>
  );
}

export default App;
