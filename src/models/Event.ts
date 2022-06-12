interface IEvent {
  eventId: number;
  owner: string;
  eventName: string;
  eventAddress: string;
  imgUri: string;
}

export class Event implements IEvent {
  constructor(
    public eventId: number,
    public owner: string,
    public eventName: string,
    public eventAddress: string,
    public imgUri: string
  ) {
    this.eventId = eventId;
    this.owner = owner;
    this.eventName = eventName;
    this.eventAddress = eventAddress;
    this.imgUri = imgUri;
  }
}

export function parseToEvent(moralisData: any) {
  console.log("Desde el converter", moralisData[0]);
  let event: Event = new Event(
    parseInt(moralisData[0].attributes.eventId),
    moralisData[0].attributes.owner,
    moralisData[0].attributes.eventName,
    moralisData[0].attributes.eventAddress,
    moralisData[0].attributes.imgUri
  );

  return event;
}

export function parseToEvents(moralisData: Array<any>) {
  let events: Event[] = new Array<Event>();

  moralisData.forEach((item) => {
    let event: IEvent = new Event(
      item.attributes.eventId,
      item.attributes.owner,
      item.attributes.eventName,
      item.attributes.eventAddress,
      item.attributes.imgUri
    );

    events.push(event);
  });
  return events;
}
