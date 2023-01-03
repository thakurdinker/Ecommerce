import { useEffect } from "react";
import axios from "axios";

const useDataFecth = (url, setData) => {
  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        const res = await axios.get(url, { signal: controller.signal });
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();

    // Cleanup
    return () => {
      controller.abort();
    };
  }, [url, setData]);
};

export { useDataFecth };
