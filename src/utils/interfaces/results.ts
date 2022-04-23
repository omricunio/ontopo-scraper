export interface Result {
    date: string,
    size: number,
    areas: {
        name: string,
        times: string[]
    }[]
}