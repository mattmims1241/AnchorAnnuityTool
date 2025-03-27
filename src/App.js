import { useState } from "react";

export default function AnnuityCalculator() {
  const [deposit, setDeposit] = useState(1000000);
  const [ratePercent, setRatePercent] = useState(5); // whole number input
  const [taxRatePercent, setTaxRatePercent] = useState(35); // whole number input
  const [term, setTerm] = useState(5);

  // convert whole number percentages to decimals
  const rate = ratePercent / 100;
  const taxRate = taxRatePercent / 100;

  const presets = [3, 5, 7, 10];
  const taxDeferredGain = deposit * Math.pow(1 + rate, term) - deposit;
  const taxedAnnuallyGain = deposit * (Math.pow(1 + rate * (1 - taxRate), term) - 1);
  const taxSavings = taxDeferredGain - taxedAnnuallyGain;

  const formatCurrency = (num) =>
    num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const sampleProducts = [
    { name: "SecureGrowth 3", term: 3, rate: 0.055, carrier: "Sentinel" },
    { name: "IncomeGuard 5", term: 5, rate: 0.052, carrier: "Protective" },
    { name: "PremierShield 7", term: 7, rate: 0.049, carrier: "Athene" },
    { name: "MaxSecure 10", term: 10, rate: 0.047, carrier: "Pacific Life" },
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9", padding: "40px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", textAlign: "center", marginBottom: "30px" }}>
        AnchorAnnuity.com – Fixed Annuity Tax Advantage Calculator
      </h1>

      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        {/* Left Column - Inputs */}
        <div style={{ flex: "1", minWidth: "300px", background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.05)" }}>
          <div style={{ marginBottom: "15px" }}>
            <label>Deposit Amount ($)</label>
            <input
              type="number"
              value={deposit}
              onChange={(e) => setDeposit(Number(e.target.value))}
              style={{ width: "100%", maxWidth: "300px", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>MYG Rate (%)</label>
            <input
              type="number"
              value={ratePercent}
              onChange={(e) => setRatePercent(Number(e.target.value))}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Tax Rate (%)</label>
            <input
              type="number"
              value={taxRatePercent}
              onChange={(e) => setTaxRatePercent(Number(e.target.value))}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Term Length (Years)</label>
            <div style={{ display: "flex", gap: "8px", marginTop: "5px" }}>
              {presets.map((p) => (
                <button
                  key={p}
                  onClick={() => setTerm(p)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: term === p ? "#F3D236" : "#eee",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {p} yr
                </button>
              ))}
            </div>
            <input
              type="number"
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              style={{ width: "100%", padding: "8px", marginTop: "10px" }}
            />
          </div>
        </div>

        {/* Right Column - Results */}
        <div style={{ flex: "2", minWidth: "300px", display: "flex", flexDirection: "column", gap: "30px" }}>
          <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.05)" }}>
            <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>Your Results</h2>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "15px" }}>
              <div>
                <p style={{ fontSize: "14px", color: "#666" }}>Tax-Deferred Gain</p>
                <p style={{ fontWeight: "bold" }}>${formatCurrency(taxDeferredGain)}</p>
              </div>
              <div>
                <p style={{ fontSize: "14px", color: "#666" }}>Taxed Annually Gain</p>
                <p style={{ fontWeight: "bold" }}>${formatCurrency(taxedAnnuallyGain)}</p>
              </div>
              <div>
                <p style={{ fontSize: "14px", color: "#666" }}>Tax Savings</p>
                <p style={{ fontWeight: "bold", color: "green" }}>${formatCurrency(taxSavings)}</p>
              </div>
            </div>
          </div>

          <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.05)" }}>
            <h3 style={{ fontSize: "20px", marginBottom: "15px" }}>Fixed Annuity Product Rates</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ backgroundColor: "#F3D236" }}>
                <tr>
                  <th style={{ padding: "10px", textAlign: "left" }}>Product</th>
                  <th style={{ padding: "10px", textAlign: "left" }}>Carrier</th>
                  <th style={{ padding: "10px", textAlign: "left" }}>Term</th>
                  <th style={{ padding: "10px", textAlign: "left" }}>Rate</th>
                </tr>
              </thead>
              <tbody>
                {sampleProducts.map((product, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "10px" }}>{product.name}</td>
                    <td style={{ padding: "10px" }}>{product.carrier}</td>
                    <td style={{ padding: "10px" }}>{product.term} yrs</td>
                    <td style={{ padding: "10px" }}>{(product.rate * 100).toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
