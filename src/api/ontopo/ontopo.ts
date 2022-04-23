import axios from "axios";
import { AvailabilityRequestBody, AvailabilityResponse } from "../../utils/interfaces/ontopo";

const instance = axios.create({
    baseURL: "https://ontopo.co.il/api/",
    timeout: 10000,    
    headers: {
        authority: "ontopo.co.il",
        "sec-ch-ua": '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
        accept: "application/json, text/plain, */*",
        "content-type": "application/json;charset=UTF-8",
        "sec-ch-ua-mobile": "?0",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36",
        "sec-ch-ua-platform": '"macOS"',
        origin: "https://ontopo.co.il",
        "sec-fetch-site": "same-origin",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty",
        referer: "https://ontopo.co.il/arestauranttlv/",
        "accept-language": "en-US,en;q=0.9",
        Cookie:
            "auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiYW5vbnltb3VzIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFub255bW91cyJ9LCJpYXQiOjE2NDE1NDM5NTksImV4cCI6MTY0MTU0NDg1OX0.tq0B9QV6JntURcPd-gEU-pmDIx6G4EwVhY1A_dciPu4; auth_refresh_token=6f810a60-21fb-4a0d-9dc6-b109c4171b8a; auth_token_expired=2022-01-07T08%3A35%3A59Z",
        "Content-Type": "application/json; charset=UTF-8",
    },
});

const request = {
    page_id: "arestauranttlv",
    locale: "he",
    criteria: { size: "2", date: "20220630", time: "1830" },
    app: "app",
    origin: "page",
    sessionId: "a1a88cfe-0fb5-4ca2-b8ec-775f28d104e8",
    stationId: "dc98411f-931c-4074-8fc5-23590795c144",
    sendAnalytics: true,
};

export async function searchAvailability(requestBody: AvailabilityRequestBody): Promise<AvailabilityResponse> {
    try {
        const response = (await instance.post<AvailabilityResponse>("/availability/searchAvailability", requestBody)).data;
        return response
    } catch (e) {
        console.error("Ontopo request failed", e);
        throw e;
    }
}
