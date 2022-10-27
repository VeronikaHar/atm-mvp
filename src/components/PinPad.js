import { useState } from "react";

export default function PinPad({ users, setAuthorizedUser }) {
  const numberArr = [...Array(10).keys()];
  numberArr.shift();
  numberArr.push(0);
  const [enteredPin, setEnteredPin] = useState("");
  const [authorizationError, setAuthorizationError] = useState(false);
  const typeDigit = (digit) => {
    setAuthorizationError(false);
    setEnteredPin(`${enteredPin}${digit}`);
  };
  const delDigit = () => {
    setAuthorizationError(false);
    setEnteredPin(enteredPin.slice(0, -1));
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
      }}
    >
      <div>
        {numberArr.map((num) => (
          <button
            key={num}
            onClick={() => typeDigit(num)}
            style={{
              width: "31%",
              margin: "2px",
            }}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => delDigit()}
          style={{
            width: "31%",
            margin: "2px",
          }}
        >
          DEL
        </button>
      </div>
      <input
        style={{ padding: "6px", margin: "22px 0" }}
        value={enteredPin}
        onKeyDown={(e) => {
          // only accept digits
          if (e.key >= "0" && e.key <= "9") typeDigit(e.key);
          if (e.key === "Backspace" || e.key === "Delete") delDigit();
        }}
      />
      {authorizationError && (
        <div
          style={{
            color: "red",
            fontSize: "12px",
            margin: "8px",
            marginTop: "-22px",
          }}
        >
          Wrong PIN. Please try again
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
          key="1"
          style={{
            padding: "6px",
            margin: "4px",
            width: "100%",
          }}
          onClick={() => {
            const loggedInUserIdx = users.findIndex(
              (user) => user.pin === enteredPin
            );
            if (loggedInUserIdx > -1) {
              // if last withdrawal was not today, reset withdrawnToday amount
              if (
                users[loggedInUserIdx].lastWithdrawalDate !==
                new Date().toLocaleDateString()
              ) {
                users.splice(loggedInUserIdx, 1, {
                  ...users[loggedInUserIdx],
                  withdrawnToday: 0,
                });
              }
              return setAuthorizedUser(users[loggedInUserIdx]);
            }
            return setAuthorizationError(loggedInUserIdx === -1);
          }}
        >
          Confirm
        </button>
        <button
          key="2"
          style={{
            padding: "6px",
            margin: "4px",
            width: "100%",
          }}
          onClick={() => {
            setEnteredPin("");
            setAuthorizationError(false);
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
