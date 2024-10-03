// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [param1, setParam1] = useState("EUR");
  const [param2, setParam2] = useState("INR");
  const [Result, setResult] = useState(0);

  // function handleCurrency1(e) {
  //   setParam1(e.target.value);
  // }

  function handleCurrency2(e) {
    setParam2(e.target.value);
  }
  function handleAmount(e) {
    setAmount(Number(e.target.value));
  }

  useEffect(() => {
    async function getConvertInfo() {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${param1}&to=${param2}`
      );
      const data = await res?.json();
      param1 === param2 ? setResult(amount) : setResult(data.rates[param2]);
    }
    getConvertInfo();
  }, [param1, param2, amount]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "250px",
        }}
      >
        <input
          value={amount}
          type="text"
          amount={amount}
          setAmount={setAmount}
          onChange={(e) => {
            handleAmount(e);
          }}
        />
        <select
          param1={param1}
          setParam1={setParam1}
          value={param1}
          // handleCurrency1={handleCurrency1}
          onChange={(e) => {
            setParam1(e.target.value);
          }}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select
          param2={param2}
          setParam2={setParam2}
          value={param2}
          handleCurrency2={handleCurrency2}
          onChange={(e) => {
            handleCurrency2(e);
          }}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
      </div>

      <div style={{ textAlign: "center", border: "2px solid red" }}>
        <p style={{ fontWeight: "bold" }}>
          Result ={" "}
          <span>
            {" "}
            {Result} {param2}
          </span>
        </p>
      </div>
    </>
  );
}
