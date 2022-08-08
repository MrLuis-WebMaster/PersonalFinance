import { useState } from "react";
const useGetCurrentMonth = () => {
    const [month, setMont] = useState(new Date().getMonth() + 1);
    const [monthArray, setMothArray] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    ]);
    return [month, monthArray[month - 1]] ;
}

export default useGetCurrentMonth;