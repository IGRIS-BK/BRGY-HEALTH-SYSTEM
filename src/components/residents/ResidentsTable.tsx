type Resident = {
  id: string;
  first_name: string;
  middle_initial: string | null;
  last_name: string;
  birthdate: string;
  sex: string | null;
  contact_number: string | null;
  created_at: string;
};

type Props = {
  residents: Resident[];
  loading: boolean;
  getAge: (birthdate: string) => number;
  onEdit: (resident: Resident) => void;
};


export default function ResidentsTable({ residents, loading, getAge }: Props) {
  return (
    <div className="w-full bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="animate-pulse flex space-x-4">
            <div className="h-12 w-12 bg-gray-100 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-5 w-40 bg-gray-100 rounded"></div>
              <div className="h-4 w-32 bg-gray-100 rounded"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/30">
                <th scope="col" className="text-left px-4 py-3 md:px-6 md:py-4 lg:px-8 lg:py-5 xl:px-10 xl:py-6 2xl:px-12 2xl:py-7 text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th scope="col" className="text-center px-4 py-3 md:px-6 md:py-4 lg:px-8 lg:py-5 xl:px-10 xl:py-6 2xl:px-12 2xl:py-7 text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                {/* ... repeat for other headers ... */}
              </tr>
            </thead>
            <tbody>
              {residents.map((r) => (
                <tr key={r.id} className="transition-colors duration-150 hover:bg-gray-50/80">
                  <td className="px-4 py-3 md:px-6 md:py-4 lg:px-8 lg:py-5 xl:px-10 xl:py-6 2xl:px-12 2xl:py-7">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-medium text-gray-600">
                          {r.first_name?.[0] || '?'}{r.last_name?.[0] || ''}
                        </span>
                      </div>
                      <span className="text-gray-700 font-medium text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                        {r.first_name} {r.middle_initial ? r.middle_initial + '.' : ''} {r.last_name}
                      </span>
                    </div>
                  </td>
                  {/* Age, Sex, etc. similarly scaled */}
                  <td className="text-center px-4 py-3 md:px-6 md:py-4 lg:px-8 lg:py-5 xl:px-10 xl:py-6 2xl:px-12 2xl:py-7">
                    <span className="text-gray-600 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                      {getAge(r.birthdate)}
                    </span>
                  </td>
                  {/* ... */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}