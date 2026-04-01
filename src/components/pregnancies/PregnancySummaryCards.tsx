type Props = {
  data: any[];
};

export default function PregnancySummaryCards({ data }: Props) {
  const total = data.length;
  const highRisk = data.filter((d) => d.risk_level === "High").length;

  const dueSoon = data.filter((d) => {
    if (!d.expected_due_date) return false;

    const today = new Date();
    const due = new Date(d.expected_due_date);

    const diff =
      (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    return diff <= 30;
  }).length;

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl shadow border">
        <p className="text-sm text-gray-500">Total Pregnancies</p>
        <h2 className="text-xl font-bold">{total}</h2>
      </div>

      <div className="bg-white p-4 rounded-xl shadow border">
        <p className="text-sm text-gray-500">High Risk</p>
        <h2 className="text-xl font-bold text-red-600">{highRisk}</h2>
      </div>

      <div className="bg-white p-4 rounded-xl shadow border">
        <p className="text-sm text-gray-500">Due Soon</p>
        <h2 className="text-xl font-bold text-yellow-600">{dueSoon}</h2>
      </div>
    </div>
  );
}