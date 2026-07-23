function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-slate-200 transition p-5 flex justify-between items-center">

      <div>
        <p className="text-slate-500 text-sm">
          {title}
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-1.5">
          {value}
        </h2>
      </div>

      <div className={`${color} text-white p-3 rounded-xl`}>
        {icon}
      </div>

    </div>
  );
}

export default StatCard;