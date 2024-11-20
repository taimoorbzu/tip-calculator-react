import { useState } from "react"

export default function App() {
  const [bill, setBill] = useState(0);
  const [myTip, setMyTip] = useState(0);
  const [friendTip, setFriendTip] = useState(0);
  return <>
    <Bill bill={bill} setBill={setBill} />
    <Opinion tip={myTip} onSelect={setMyTip}><p style={{ display: 'inline-block', marginRight: '10px' }}>How much You Like the Service:</p></Opinion>
    <Opinion tip={friendTip} onSelect={setFriendTip}><p style={{ display: 'inline-block', marginRight: '10px' }}>How much Your Friend Like the Service:</p></Opinion>
    <TotalBill billAmount={bill} opinion1={myTip} opinion2={friendTip} onClearBill={setBill} onClearTip={setMyTip} onResetTip={setFriendTip} />
  </>
}

function Bill({ bill, setBill }) {
  return <div className="bill">
    <p style={{ display: 'inline-block', marginRight: '10px' }}>How Much was the Bill</p>
    <input placeholder="Enter Bill Amount" value={bill} onChange={(e) => setBill(+e.target.value)} type="number" name="" id="" />
  </div>
}

function Opinion({ children, tip, onSelect }) {
  return <div className="openion">
    {children}
    <select value={tip} onChange={(e) => onSelect(+e.target.value)}>
      <option value="0">Dissatisified (0%)</option>
      <option value="5">It was Ok (5%)</option>
      <option value="10">It was Good (10%)</option>
      <option value="20">Dissatisified (20%)</option>
    </select>
  </div>
}

function TotalBill({ billAmount, opinion1, opinion2, onClearBill, onClearTip, onResetTip }) {
  const tipPercentage = (opinion1 + opinion2) / 2;
  const totalBill = billAmount + (billAmount * (tipPercentage / 100));
  const tipAmount = billAmount * (tipPercentage / 100);

  function handleReset() {
    onClearBill(() => 0);
    onClearTip(() => 0);
    onResetTip(() => 0);
  }
  return <div className="total-bill">
    <h2>You Pay ${totalBill} (${billAmount} + ${tipAmount})</h2>
    <button onClick={handleReset}>Reset</button>
  </div>
}