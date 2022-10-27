import { useState } from "react";

export default function AccountAction({
  action,
  setAction,
  authorizedUser,
  setAuthorizedUser,
}) {
  console.log("!", authorizedUser);
  const [enteredAmount, setEnteredAmount] = useState("");
  const [withdrawalError, setWithdrawalError] = useState(false);
  const { remainingBalance, dailyWithdrawalLimit, withdrawnToday } =
    authorizedUser;

  const typeDigit = (digit) => {
    setWithdrawalError(false);
    setEnteredAmount(`${enteredAmount}${digit}`);
  };
  const delDigit = () => {
    setWithdrawalError(false);
    setEnteredAmount(enteredAmount.slice(0, -1));
  };
  const handleAction = () => {
    const enteredNumber = enteredAmount !== "" ? parseInt(enteredAmount) : 0;
    console.log("!!", enteredNumber);
    if (
      action === "Withdraw" &&
      enteredNumber > 0 &&
      enteredNumber <= remainingBalance - withdrawnToday &&
      enteredNumber <= dailyWithdrawalLimit - withdrawnToday
    ) {
      setAuthorizedUser({
        ...authorizedUser,
        remainingBalance: remainingBalance - enteredNumber,
        withdrawnToday: withdrawnToday + enteredNumber,
        lastWithdrawalDate: new Date().toLocaleDateString(),
      });
    } else if (action === "Deposit") {
      setAuthorizedUser({
        ...authorizedUser,
        remainingBalance: remainingBalance + enteredNumber,
      });
    } else {
      setWithdrawalError(true);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "20px",
      }}
    >
      <div>
        Please enter the amount you wish to{" "}
        <strong>{action.toLowerCase()}</strong>:
      </div>
      <input
        style={{ padding: "6px", margin: "15px 0", width: "40%" }}
        value={enteredAmount}
        onKeyDown={(e) => {
          // only accept digits
          if (e.key >= "0" && e.key <= "9") typeDigit(e.key);
          if (e.key === "Backspace" || e.key === "Delete") delDigit();
        }}
      />
      {withdrawalError && (
        <div
          style={{
            color: "red",
            fontSize: "12px",
            margin: "8px",
            marginTop: "-14px",
          }}
        >
          The amount entered is over your withdrawal limit
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "50%",
        }}
      >
        <button
          key="1"
          onClick={() => handleAction()}
          style={{
            padding: "6px",
            margin: "20px 3px",
            width: "100%",
          }}
        >
          {action}
        </button>
        <button
          key="2"
          onClick={() => setAction()}
          style={{
            padding: "6px",
            margin: "20px 3px",
            width: "100%",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
