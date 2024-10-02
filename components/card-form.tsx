import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "lucide-react";

export default function CardForm({param}:
  {param:{
    Title:string,
    Description:string,
    Downloads:number,
    DownloadLink:string,
    Likes:number,
    Tags:string[]
  }}
) {
  const limitedDescription = param.Description.split(' ').slice(0, 50).join(' ');
  const cardStyle: React.CSSProperties = {
    width: 'auto',
    height: 'auto',
  };
  const CardDescriptionStyle: React.CSSProperties = {
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
        <div className="flex gap-4 items-center grid-row-2">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Tags: 
            {param.Tags.map((tag, index) => (
              <Badge variant={"secondary"}>{tag}</Badge>
            ))}
          </div>
          <br />
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Downloads: {param.Downloads}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Likes: {param.Likes}
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
