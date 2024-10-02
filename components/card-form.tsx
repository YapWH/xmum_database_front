import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function CardForm({param}:
    {param:{
        Title:string,
        Description:string,
        Downloads:number,
        DownloadLink:string,
        Likes:number
    }}
) {
    const limitedDescription = param.Description.split(' ').slice(0, 50).join(' ');
    const cardStyle: React.CSSProperties = {
        width: 400,
        height: 250,
    };
    const CardDescriptionStyle: React.CSSProperties = {
        //wordWrap: 'break-word' as 'break-word' | undefined,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        minHeight: '4em',
    };

    return (
        <Card style={cardStyle}>
            <CardHeader>
                <CardTitle>{param.Title}</CardTitle>
                <CardDescription style={CardDescriptionStyle}>
                    {limitedDescription}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="flex gap-4 items-center flex-col sm:flex-row">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {param.Downloads} Downloads
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {param.Likes} Likes
                        </span>
                    </div>
                </div>
            </CardContent>

            <CardFooter>
                <div className="flex gap-4 items-center flex-col sm:flex-row">
                    <a
                    className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                    href={param.DownloadLink}
                    target="_blank"
                    rel="noopener noreferrer">
                    Download
                    </a>
                </div>
            </CardFooter>
        </Card>
    )
}
