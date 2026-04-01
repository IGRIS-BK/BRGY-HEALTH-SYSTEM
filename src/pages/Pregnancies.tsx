import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getPregnancies, addPregnancy } from "../lib/resident";

export default function Pregnancies() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getPregnancies();
      setData(res || []);
    } catch (err: any) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Pregnancy Records</h1>

      {/* table here */}
    </div>
  );
}