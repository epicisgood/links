var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
console.log('this script is running');
function FetchLunches() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.get("https://spotsylvaniak12.api.nutrislice.com/menu/api/weeks/school/chancellor-high/menu-type/lunch/2024/08/18/");
            const data = response.data;
            console.log(data);
        }
        catch (error) {
            console.error(error);
        }
    });
}
FetchLunches();
