import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function AnnuityCalculator() {
  const [deposit, setDeposit] = useState(1000000);
  const [rate, setRate] = useState(0.05);
  const [taxRate, setTaxRate] = useState(0.35);
  const [term, setTerm] = useState(5);

  const presets = [3, 5, 7, 10];
  const taxDeferredGain = deposit * Math.pow(1 + rate, term) - deposit;
  const taxedAnnuallyGain = deposit * (Math.pow(1 + rate * (1 - taxRate), term) - 1);
  const taxSavings = taxDeferredGain - taxedAnnuallyGain;

  const chartData = [
    { name: "Tax-Deferred", value: taxDeferredGain },
    { name: "Taxed Annually", value: taxedAnnuallyGain },
    { name: "Tax Savings", value: taxSavings },
  ];

  const sampleProducts = [
    { name: "SecureGrowth 3", term: 3, rate: 0.055, carrier: "Sentinel" },
    { name: "IncomeGuard 5", term: 5, rate: 0.052, carrier: "Protective" },
    { name: "PremierShield 7", term: 7, rate: 0.049, carrier: "Athene" },
    { name: "MaxSecure 10", term: 10, rate: 0.047, carrier: "Pacific Life" },
  ];

  return (
    <div className="min-h-screen bg-[#f9f9f9] px-4 md:px-12 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          AnchorAnnuity.com – Fixed Annuity Tax Advantage Calculator
        </h1>

        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div className="col-span-1 space-y-6">
            <Card className="bg-white p-6 rounded-xl shadow-sm">
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 font-medium mb-1">Deposit Amount ($)</label>
                  <Input
                    type="number"
                    value={deposit}
                    onChange={(e) => setDeposit(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 font-medium mb-1">MYG Rate (%)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 font-medium mb-1">Tax Rate (%)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={taxRate}
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 font-medium mb-1">Term Length (Years)</label>
                  <div className="flex gap-2 mb-2">
                    {presets.map((p) => (
                      <Button
                        key={p}
                        variant={term === p ? "default" : "outline"}
                        onClick={() => setTerm(p)}
                        className={term === p ? "bg-[#F3D236] text-black" : ""}
                      >
                        {p} yr
                      </Button>
                    ))}
                  </div>
                  <Input
                    type="number"
                    value={term}
                    onChange={(e) => setTerm(Number(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-2 space-y-6">
            <Card className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Tax-Deferred Gain</p>
                  <p className="text-lg font-bold text-gray-800">
                    ${taxDeferredGain.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Taxed Annually Gain</p>
                  <p className="text-lg font-bold text-gray-800">
                    ${taxedAnnuallyGain.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Tax Savings</p>
                  <p className="text-lg font-bold text-green-600">
                    ${taxSavings.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                    <Bar dataKey="value" fill="#F3D236" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Fixed Annuity Product Rates
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700">
                  <thead>
                    <tr className="bg-[#F3D236] text-black">
                      <th className="px-4 py-2 font-semibold">Product</th>
                      <th className="px-4 py-2 font-semibold">Carrier</th>
                      <th className="px-4 py-2 font-semibold">Term</th>
                      <th className="px-4 py-2 font-semibold">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleProducts.map((product, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{product.name}</td>
                        <td className="px-4 py-2">{product.carrier}</td>
                        <td className="px-4 py-2">{product.term} yrs</td>
                        <td className="px-4 py-2">{(product.rate * 100).toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

