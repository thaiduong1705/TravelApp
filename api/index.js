import axios from "axios";

export const getPlacesData = async () => {
    try {
        const { data } = await axios.request({
            method: "GET",
            url: "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary",
            params: {
                bl_latitude: "11.847676",
                tr_latitude: "12.838442",
                bl_longitude: "109.095887",
                tr_longitude: "109.149359",
                limit: "30",
                lunit: "km",
                lang: "vi_VN",
            },
            headers: {
                "X-RapidAPI-Key":
                    "cada0d88b4msh2c0a3eca0be89aap125a5djsn3f062f96eb79",
                "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
            },
        });
        return data;
    } catch (error) {
        console.log(error);
        return;
    }
};
