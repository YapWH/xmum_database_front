'use client'

import { useRef } from 'react'
import Slider from 'react-slick'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ThumbsUp, Download } from 'lucide-react'
import { Item } from '../types'
import Link from 'next/link'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface TrendingCarouselProps {
  items: Item[]
}

export default function TrendingCarousel({ items }: TrendingCarouselProps) {
  const sliderRef = useRef<Slider>(null)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <div className="relative">
      <Slider ref={sliderRef} {...settings}>
        {items.map((item) => (
          <div key={item.id} className="px-2">
            <Link href={`/${item.category.toLowerCase()}/${item.id}`}>
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription className="text-sm">{item.subcategory}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm line-clamp-3">{item.description}</p>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground flex justify-between items-center">
                  <div>{item.uploader}</div>
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {item.likes}
                    </span>
                    <span className="flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      {item.downloads}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          </div>
        ))}
      </Slider>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -left-4 transform -translate-y-1/2"
        onClick={() => sliderRef.current?.slickPrev()}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -right-4 transform -translate-y-1/2"
        onClick={() => sliderRef.current?.slickNext()}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}