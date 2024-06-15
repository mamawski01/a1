import axios from "axios";
import { useEffect, useState } from "react";

export default function Test() {
  const [isLoading, isLoadingSet] = useState(false);
  const [error, errorSet] = useState([]);
  const [data, dataSet] = useState([]);

  useEffect(() => {
    async function fetchTodo() {
      try {
        isLoadingSet(true);
        const data = await axios.post(
          " http://localhost:7000/api/registerUser",
          {
            firstName: "test",
            middleName: "test",
            lastName: "test",
            position: "test",
            street: "test",
            purok: "test",
            brgy: "test",
            city: "test",
            province: "test",
            country: "test",
            contactNumber1: "test",
            contactNumber2: "test",
            contactNumber3: "test",
            birthdate: "test",
            email: "test@g.com",
            SSS: "test",
            PagIbig: "test",
            PhilHealth: "test",
            TIN: "test",
            contactPersonNameInEmergency: "test",
          },
        );
        console.log(data);
        dataSet(data.data.users);
        return data;
      } catch (error) {
        console.log(error);
        errorSet(error.message);
      } finally {
        isLoadingSet(false);
      }
    }
    fetchTodo();
    //cleaning
    return () => {};
  }, []);

  function getTodos() {
    return;
  }

  return (
    <div>
      <button onClick={getTodos}>getTodos</button>
      <div>
        {data.map((data, i) => (
          <div key={i}>{data.firstName}</div>
        ))}
      </div>
    </div>
  );
}
