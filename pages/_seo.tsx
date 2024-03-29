import Head from 'next/head';

export interface MetadataProps {
    siteTitle: string | undefined,
    title: string | undefined,
    description?: string | undefined,
    url?: string | undefined,
    image?: string | undefined,
}

const MetaData = ({ siteTitle, title, description, url, image }: MetadataProps) => {
    return (
        <Head>
            <title>{siteTitle}</title>
            <meta property="og:type" content="website" />
            <meta name="description" content={description} />

            <meta name="og:title" property="og:title" content={title} />
            <meta name="og:description" property="og:description" content={description} />
            <meta name="og:site_name" content="Even3" />
            <meta name="og:url" content={url} />
            <meta name="og:image" content={image} />

            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:site" content='@_even3' key="twhandle" />
            <meta name="twitter:creator" content='@MrRaccxxn' key="twhandle" />
        </Head>
    )
}

export default MetaData;

MetaData.defaultProps = {
    siteTitle: 'Even3 - Unforgettable events',
    title: 'Even3 - Unforgettable events',
    description: 'We are a platorm focused on develop pleasant experiences for event hosts and attendees, providing trackeable and secure events, All for free!',
    url: "https://www.even3.app/",
    image: "https://even3-prod.s3.us-west-1.amazonaws.com/Image+SEO.png",
}