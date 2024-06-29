import axios from "axios";

export const getPlacesData = async (bl_lat, bl_lng, tr_lat, tr_lng, type) => {
    while (true) {
        try {
            const { data } = await axios.request({
                method: "GET",
                url: `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
                params: {
                    bl_latitude: bl_lat ?? "10.34937042531151",
                    tr_latitude: tr_lat ?? "11.1602136037603",
                    bl_longitude: bl_lng ?? "106.3638783822327",
                    tr_longitude: tr_lng ?? "107.0265769179448",
                    limit: "30",
                    lunit: "km",
                    lang: "vi_VN",
                },
                headers: {
                    "X-RapidAPI-Key":
                        "73eed58630msh78c71a20bb8bd6dp126340jsn8ced2be01eac",
                    "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
                },
            });
            if (data?.data?.length > 0) {
                return data;
            }
        } catch (error) {
            console.log(error);
            return;
        }
    }
};
