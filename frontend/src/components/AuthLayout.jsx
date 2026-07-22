import { CarFront } from "lucide-react";

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md sm:max-w-lg">

        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">

          <div className="flex justify-center">
            <div className="bg-blue-600 text-white p-4 rounded-full">
              <CarFront size={36} />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mt-6">
            {title}
          </h1>

          <p className="text-center text-slate-500 mt-2 mb-8">
            {subtitle}
          </p>

          {children}

        </div>

      </div>

    </div>
  );
}

export default AuthLayout;