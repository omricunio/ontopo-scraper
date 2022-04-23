import moment, { Moment } from "moment";
import { searchAvailability } from "./api/ontopo/ontopo";
import { saveFile } from "./lib/file/fileMethods";
import TextFile from "./lib/file/TextFile";
import { Result } from "./utils/interfaces/results";
import { makeAvailabilityRequestBody } from "./utils/object-makers/ontopo";

async function scrapeOntopo() {
    const results: Result[] = [];
    const endDate = moment("07/30/2022 20:00");
    let currentDate = moment("02/20/2022 20:00");
    const times = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"];

    let earliestDate: Moment | null = null;
    let searched = 0,
        available = 0,
        fullyBooked = 0,
        errors = 0;

    while (currentDate <= endDate) {
        for (const time of times) {
            const newTime = moment(time, "HH:mm");
            currentDate.set("hours", newTime.hours());
            currentDate.set("minutes", newTime.minutes());
            const requestBody = makeAvailabilityRequestBody(2, currentDate);
            try {
                const availability = await searchAvailability(requestBody);

                console.clear();

                if (availability.areas) {
                    results.push({
                        date: currentDate.format("DD/MM/YY HH:mm"),
                        size: 5,
                        areas: availability.areas.map((area) => ({
                            name: area.name,
                            times: area.options.filter((option) => option.method === "seat").map((option) => option.time),
                        })),
                    });
                    earliestDate = currentDate;
                    console.log(`${currentDate.format("DD/MM/YY HH:mm")} availiable`);
                    available++;
                } else {
                    console.log(`${currentDate.format("DD/MM/YY HH:mm")} fully booked`);
                    fullyBooked++;
                }
            } catch (e) {
                console.log("Error occured");
                errors++;
            }
            searched++;
            const description = {
                Searched: searched,
                Available: available,
                "Fully Booked": fullyBooked,
                Errors: errors,
            };
            console.table([description]);
            await saveFile("./", new TextFile("ontopo-data.json", JSON.stringify(results)));
            //earliestDate && console.log("Earliest Date: " + earliestDate.format("DD/MM/YY HH:mm"));
        }

        currentDate = currentDate.add({ days: 1 });
    }
}

scrapeOntopo();
