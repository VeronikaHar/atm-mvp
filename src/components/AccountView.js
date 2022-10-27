import { useState } from "react";
import AccountAction from "./AccountAction";

export default function AccountView({ authorizedUser, setAuthorizedUser }) {
  const [action, setAction] = useState();
  const { name, remainingBalance, dailyWithdrawalLimit, withdrawnToday } =
    authorizedUser;

  return (
    <div>
      <h3>Welcome, {name}</h3>
      <button
        onClick={() => setAuthorizedUser()}
        style={{
          padding: "6px",
          width: "50%",
        }}
      >
        Log out
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          paddingTop: "40px",
        }}
      >
        <div>Account Balance: {remainingBalance} USD</div>
        <div style={{ padding: "5px 0" }}>
          Daily Withdrawal Limit: {dailyWithdrawalLimit} USD
        </div>
        <div>Withdrawn Today: {withdrawnToday} USD</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
          key="1"
          onClick={() => setAction("Withdraw")}
          style={{
            padding: "6px",
            margin: "20px 3px",
            width: "100%",
          }}
        >
          Withdraw
        </button>
        <button
          key="2"
          onClick={() => setAction("Deposit")}
          style={{
            padding: "6px",
            margin: "20px 3px",
            width: "100%",
          }}
        >
          Deposit
        </button>
      </div>
      {action && (
        <AccountAction
          action={action}
          setAction={setAction}
          authorizedUser={authorizedUser}
          setAuthorizedUser={setAuthorizedUser}
        />
      )}
    </div>
  );
}
