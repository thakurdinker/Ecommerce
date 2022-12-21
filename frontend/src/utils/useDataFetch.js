import { useEffect, useRef, useState } from "react";
import axios from "axios";

const useDataFetch = async (url) => {
  const dataFetch = useRef(false);
  const [data, setData] = useState("");
  useEffect(() => {
    if (!dataFetch.current) {
      console.log("useDataFetch");
      dataFetch.current = true;
      async function fetchData() {
        try {
          const res = await axios.get(url);
          setData(res.data);
        } catch (e) {
          setData(e);
        }
      }
      fetchData();
      return [data, setData];
    }
  }, [data, url]);
};

export default useDataFetch;
