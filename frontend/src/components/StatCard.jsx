function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 flex justify-between items-center">

      <div>
        <p className="text-slate-500 text-sm">
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {value}
        </h2>
      </div>

      <div className={`${color} text-white p-4 rounded-2xl`}>
        {icon}
      </div>

    </div>
  );
}

export default StatCard;