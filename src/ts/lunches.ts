import axios from "axios";

console.log('this script is running');

async function FetchLunches(): Promise<void> {
    try {
        const response = await axios.get("https://spotsylvaniak12.api.nutrislice.com/menu/api/weeks/school/chancellor-high/menu-type/lunch/2024/08/18/");
        const data = response.data;
        console.log(data);
    } catch (error: any) {
       console.error(error)
    }
}



FetchLunches()