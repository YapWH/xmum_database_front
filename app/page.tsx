import CardForm from "@/components/card-form";
import Image from "next/image";

const placeholder_data = [
  {
    title: "Sample Title 1",
    description: "Sample Description 1 Sample Description 1 Sample Description 1 Sample Description 1 Sample Description 1 Sample Description 1 Sample Description 1 Sample Description 1 Sample Description 1 Sample Description 1 Sample Description 1 Sample Description 1",
    downloads: 100,
    downloadLink: "https://example.com/download1",
    likes: 50
  },
  {
    title: "Sample Title 2",
    description: "Sample Description 2",
    downloads: 200,
    downloadLink: "https://example.com/download2",
    likes: 75
  },
  {
    title: "Sample Title 3",
    description: "Sample Description 3",
    downloads: 150,
    downloadLink: "https://example.com/download3",
    likes: 60
  }
];

export default function Home() {
  return (
      <div>
        <h1 className="text-3xl font-bold">
          XMUM Database Directory
        </h1>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {placeholder_data.map((data, index) => (
              <CardForm
                key={index}
                param={{
                  Title: data.title,
                  Description: data.description,
                  Downloads: data.downloads,
                  DownloadLink: data.downloadLink,
                  Likes: data.likes
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
}
