"use client"

import { TooltipContent } from "@/components/ui/tooltip"

import { TooltipTrigger } from "@/components/ui/tooltip"

import { Tooltip } from "@/components/ui/tooltip"

import { TooltipProvider } from "@/components/ui/tooltip"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  CheckCircle,
  Download,
  Share2,
  ArrowLeft,
  Leaf,
  Thermometer,
  Droplet,
  Sparkles,
} from "lucide-react"
import type { ReactionData, AnalysisResult } from "@/lib/types"
import { analyzeReaction } from "@/lib/analysis"
import { generatePDF } from "@/lib/pdf-generator"
import { predictProduct } from "@/lib/ai-prediction"
import ShareButtons from "@/components/share-buttons"

export default function ResultsPage() {
  const router = useRouter()
  const [reactionData, setReactionData] = useState<ReactionData | null>(null)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [showShare, setShowShare] = useState(false)
  const [predictedProduct, setPredictedProduct] = useState<string | null>(null)

  useEffect(() => {
    // Retrieve the reaction data from sessionStorage
    const storedData = sessionStorage.getItem("reactionData")

    if (!storedData) {
      // If no data is found, redirect back to the input page
      router.push("/input")
      return
    }

    const parsedData = JSON.parse(storedData) as ReactionData

    // If products field is empty, predict the product
    if (!parsedData.products || parsedData.products.trim() === "") {
      const prediction = predictProduct(parsedData)
      setPredictedProduct(prediction)
      parsedData.products = prediction + " (AI Predicted)"
    }

    setReactionData(parsedData)

    // Analyze the reaction
    const result = analyzeReaction(parsedData)
    setAnalysisResult(result)
  }, [router])

  if (!reactionData || !analysisResult) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white">Loading analysis...</div>
      </div>
    )
  }

  const handleDownloadPDF = () => {
    if (reactionData && analysisResult) {
      generatePDF(reactionData, analysisResult)
    }
  }

  const getEcoRatingColor = (rating: string) => {
    switch (rating) {
      case "Good":
        return "bg-green-600 hover:bg-green-700"
      case "Moderate":
        return "bg-yellow-600 hover:bg-yellow-700"
      case "Bad":
        return "bg-red-600 hover:bg-red-700"
      default:
        return "bg-gray-600 hover:bg-gray-700"
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Analysis Results</h1>
        <Button
          variant="outline"
          size="sm"
          className="border-green-600 text-green-400 hover:bg-green-900/30"
          onClick={() => router.push("/input")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Input
        </Button>
      </div>

      <div className="space-y-6">
        <Card className="bg-gray-800/50 border-green-800/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-green-200">Reaction Summary</CardTitle>
              <Badge className={getEcoRatingColor(analysisResult.ecoRating)}>
                {analysisResult.ecoRating} Eco-Rating
              </Badge>
            </div>
            <CardDescription className="text-gray-300">Overview of your chemical reaction</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400">Reactants</h3>
                <p className="text-white">{reactionData.reactants}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400">Products</h3>
                <div className="flex items-center gap-2">
                  <p className="text-white">{reactionData.products}</p>
                  {predictedProduct && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Sparkles className="h-4 w-4 text-yellow-400" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-700 text-gray-200 border-green-800">
                          <p>This product was predicted by our AI based on your reactants and conditions</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400">Solvent</h3>
                <p className="text-white">{reactionData.solvent}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400">Catalyst</h3>
                <p className="text-white">{reactionData.catalyst || "None"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400">Temperature</h3>
                <p className="text-white">{reactionData.temperature}°C</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="issues">
          <TabsList className="bg-gray-700/50 border-green-800/50">
            <TabsTrigger value="issues" className="data-[state=active]:bg-green-800 data-[state=active]:text-white">
              Issues Found
            </TabsTrigger>
            <TabsTrigger
              value="suggestions"
              className="data-[state=active]:bg-green-800 data-[state=active]:text-white"
            >
              Green Suggestions
            </TabsTrigger>
            <TabsTrigger value="energy" className="data-[state=active]:bg-green-800 data-[state=active]:text-white">
              Energy Tips
            </TabsTrigger>
          </TabsList>

          <TabsContent value="issues" className="mt-4">
            <Card className="bg-gray-800/50 border-green-800/50">
              <CardHeader>
                <CardTitle className="text-yellow-200 flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Green Chemistry Issues
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Potential environmental concerns with your reaction
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysisResult.issues.length > 0 ? (
                  analysisResult.issues.map((issue, index) => (
                    <Alert key={index} className="bg-yellow-900/20 border-yellow-800">
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      <AlertTitle className="text-yellow-200">{issue.title}</AlertTitle>
                      <AlertDescription className="text-gray-300">{issue.description}</AlertDescription>
                    </Alert>
                  ))
                ) : (
                  <Alert className="bg-green-900/20 border-green-800">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <AlertTitle className="text-green-200">No Issues Found</AlertTitle>
                    <AlertDescription className="text-gray-300">
                      Your reaction appears to follow green chemistry principles.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suggestions" className="mt-4">
            <Card className="bg-gray-800/50 border-green-800/50">
              <CardHeader>
                <CardTitle className="text-green-200 flex items-center">
                  <Leaf className="mr-2 h-5 w-5" />
                  Greener Alternatives
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Suggestions for more environmentally friendly options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysisResult.suggestions.map((suggestion, index) => (
                  <Alert key={index} className="bg-green-900/20 border-green-800">
                    <Droplet className="h-4 w-4 text-green-400" />
                    <AlertTitle className="text-green-200">{suggestion.title}</AlertTitle>
                    <AlertDescription className="text-gray-300">{suggestion.description}</AlertDescription>
                  </Alert>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="energy" className="mt-4">
            <Card className="bg-gray-800/50 border-green-800/50">
              <CardHeader>
                <CardTitle className="text-blue-200 flex items-center">
                  <Thermometer className="mr-2 h-5 w-5" />
                  Energy Saving Tips
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Ways to reduce energy consumption in your process
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysisResult.energyTips.map((tip, index) => (
                  <Alert key={index} className="bg-blue-900/20 border-blue-800">
                    <Thermometer className="h-4 w-4 text-blue-400" />
                    <AlertTitle className="text-blue-200">{tip.title}</AlertTitle>
                    <AlertDescription className="text-gray-300">{tip.description}</AlertDescription>
                  </Alert>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="bg-gray-800/50 border-green-800/50">
          <CardHeader>
            <CardTitle className="text-green-200">Share Your Results</CardTitle>
            <CardDescription className="text-gray-300">Download a report or share your eco-rating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button onClick={handleDownloadPDF} className="bg-green-600 hover:bg-green-700">
                <Download className="mr-2 h-4 w-4" />
                Download PDF Report
              </Button>

              <Button
                onClick={() => setShowShare(!showShare)}
                variant="outline"
                className="border-green-600 text-green-400 hover:bg-green-900/30"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share Eco-Rating
              </Button>
            </div>

            {showShare && (
              <div className="mt-4">
                <ShareButtons ecoRating={analysisResult.ecoRating} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
