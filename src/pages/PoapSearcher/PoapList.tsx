import { IPoap } from "@/types/models/IPoap"
import classNames from "classnames"
import { Tooltip } from "flowbite-react"
import _ from "lodash"
import Image from "next/image"
import { poapDateToFormat } from "src/utils/time"

export const PoapList = ({ poaps }: { poaps: IPoap[] | null }) => {
    if (!poaps) return <>No Poaps for this address</>

    const orderedByMonths = _.groupBy(poaps, function (element) {
        return poapDateToFormat(element.created, 'YYYY-MM-DD').substring(0, 7);
    });

    const orderedByYears = _.groupBy(orderedByMonths, function (month) {
        return poapDateToFormat(month[0].created, 'YYYY').substring(0, 4);
    });

    const years = Object.keys(orderedByYears).reverse();

    return <div className="flex flex-col items-center justify-center text-center">
        {
            years.map((year: any) => {
                return <div key={year}>
                    <h2>{year}</h2>
                    {
                        orderedByYears[year].map((month: any) => {
                            return <div key={month[0].created}>
                                <p>{poapDateToFormat(month[0].created, 'MMMM')}</p>
                                <div className=" flex flex-wrap justify-center max-w-3xl md:max-w-md sm:max-w-sm">
                                    {
                                        month.map((poap: IPoap) => {
                                            return <>
                                                <div className="p-3" key={poap.event.id}>
                                                    <Tooltip content={poap.event.name}>
                                                        <a
                                                            target="_blank" rel="noopener noreferrer"
                                                            href={poap.event.event_url}
                                                            className={classNames([
                                                                !_.isEmpty(poap.event.event_url) ? 'cursor-pointer' : 'pointer-events-none',
                                                            ])}
                                                            style={{ cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>🥳</text></svg>")  16 0,  auto` }}
                                                        >
                                                            <Image key={poap.event.id} className="rounded-full" src={poap.event.image_url} alt={poap.event.name} width={124} height={124}></Image>
                                                        </a>
                                                    </Tooltip>
                                                </div>

                                            </>

                                        })
                                    }
                                </div>
                            </div>
                        })
                    }
                </div>
            })
        }

        {/* <Timeline.Item>
                <Timeline.Point />
                <Timeline.Content>
                    <Timeline.Time>
                        February 2022
                    </Timeline.Time>
                    <Timeline.Body>
                        Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.
                    </Timeline.Body>
                </Timeline.Content>
            </Timeline.Item> */}


        {/* {
            poaps.map((poap: IPoap) => {
                return <Tooltip content={poap.event.name}>
                    <Link
                        target="_blank" rel="noopener noreferrer"
                        href={poap.event.event_url}
                        className={classNames([
                            !_.isEmpty(poap.event.event_url) ? 'cursor-pointer' : 'pointer-events-none',
                        ])}>
                        <Image key={poap.event.id} className="rounded-full" src={poap.event.image_url} alt={poap.event.name} width={124} height={124}></Image>
                    </Link>
                </Tooltip>
            })
        } */}
    </div>
}