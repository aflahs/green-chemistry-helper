"use client"

import { Button } from "@/components/ui/button"
import { Twitter, Facebook, Linkedin, Link } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ShareButtonsProps {
  ecoRating: string
}

export default function ShareButtons({ ecoRating }: ShareButtonsProps) {
  const { toast } = useToast()

  const shareText = `I just analyzed my chemical reaction and got a ${ecoRating} eco-rating on Green Chemistry Helper! #GreenChemistry #Sustainability`
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, "_blank")
  }

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(url, "_blank")
  }

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    window.open(url, "_blank")
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast({
        title: "Link copied!",
        description: "The URL has been copied to your clipboard.",
      })
    })
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={shareToTwitter}
        variant="outline"
        size="sm"
        className="bg-[#1DA1F2]/10 text-[#1DA1F2] border-[#1DA1F2]/30 hover:bg-[#1DA1F2]/20"
      >
        <Twitter className="mr-2 h-4 w-4" />
        Twitter
      </Button>

      <Button
        onClick={shareToFacebook}
        variant="outline"
        size="sm"
        className="bg-[#4267B2]/10 text-[#4267B2] border-[#4267B2]/30 hover:bg-[#4267B2]/20"
      >
        <Facebook className="mr-2 h-4 w-4" />
        Facebook
      </Button>

      <Button
        onClick={shareToLinkedIn}
        variant="outline"
        size="sm"
        className="bg-[#0077B5]/10 text-[#0077B5] border-[#0077B5]/30 hover:bg-[#0077B5]/20"
      >
        <Linkedin className="mr-2 h-4 w-4" />
        LinkedIn
      </Button>

      <Button
        onClick={copyToClipboard}
        variant="outline"
        size="sm"
        className="bg-gray-700/50 text-gray-200 border-gray-600 hover:bg-gray-700"
      >
        <Link className="mr-2 h-4 w-4" />
        Copy Link
      </Button>
    </div>
  )
}
