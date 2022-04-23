import { Moment } from "moment";
import { AVAILABILITY_REQUEST_DEFAULTS } from "../../api/ontopo/consts";
import { AvailabilityRequestBody } from "../interfaces/ontopo";

export const makeAvailabilityRequestBody = (size: number, dateTime: Moment): AvailabilityRequestBody => ({
    ...AVAILABILITY_REQUEST_DEFAULTS,
    criteria: {
        size: size.toString(),
        date: dateTime.format("YYYYMMDD"),
        time: dateTime.format("HHmm")
    }
})