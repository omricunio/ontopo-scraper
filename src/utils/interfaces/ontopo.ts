export interface AvailabilityResponse {
    areas?: {
        id: string;
        icon: string;
        name: string;
        text: string;
        options: {
            time: string;
            method: string;
            text: string;
            score: number;
        }[];
        score: number;
    }[];
}

export interface AvailabilityRequestBody {
    page_id: string,
    locale: string,
    criteria: { size: string, date: string, time: string },
    app: string,
    origin: string,
    sessionId: string,
    stationId: string,
    sendAnalytics: boolean,
};