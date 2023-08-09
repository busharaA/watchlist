import { getResource } from "../adapters/xhr/axios";
import { API_TV_SHOWS } from "../helpers/constants/TVmazeEndpoint";
import { IShow } from "../helpers/interfaces/IShow"

export const getTvShow = async (showQuery: string): Promise<any> => {
    const shows: IShow[] = [];
    const fillShows = (showObject: any[]): void => {
        if (showObject) {

            // Needed another mapping because showObject (mappedShow) comes as an array
            showObject.map((singleShow: any) => {
                if (!singleShow.image) {
                    return shows.push({
                        id: singleShow.id,
                        name: singleShow.name,
                        genres: singleShow.genres,
                        image: {
                            medium: ""
                        },
                        summary: singleShow.summary,
                    });
                } else {
                    return shows.push({
                        id: singleShow.id,
                        name: singleShow.name,
                        genres: singleShow.genres,
                        image: {
                            medium: singleShow.image.medium,
                        },
                        summary: singleShow.summary,
                    });
                }
            })
        }
    };

    try {
        const response = await getResource(`${API_TV_SHOWS}?q=${showQuery}`);

        // Extracting shows property from received data from API
        const mappedShows = response.data.map((item: any) => {
            return item.show;
        });

        fillShows(mappedShows);      
    } catch (error) {
        console.error(error);
    }

    return shows;
}