type IEventPoap = {
    id: number,
    fancy_id: string,
    name: string,
    event_url: string,
    image_url: string,
    country: string,
    city: string,
    description: string,
    year: number,
    start_date: string,
    end_date: string,
    expiry_date: string,
    supply: 23
}
export interface IPoap {
    event: IEventPoap,
    tokenId: string,
    owner: string,
    chain: string,
    created: string
}