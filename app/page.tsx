import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Beaker, Leaf, Thermometer, Droplet, Share2 } from "lucide-react"

export default function Home() {
  return (
    <div className="space-y-8 py-6">
      <section className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Green Chemistry <span className="text-green-400">Helper</span>
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-gray-300">
          Analyze your chemical reactions and discover greener alternatives to make your chemistry more sustainable.
        </p>
        <div className="flex justify-center pt-4">
          <Link href="/input">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Analyze Your Reaction
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gray-800/50 border-green-800/50">
          <CardHeader>
            <Beaker className="h-8 w-8 text-green-400 mb-2" />
            <CardTitle className="text-green-200">What is Green Chemistry?</CardTitle>
            <CardDescription className="text-gray-300">
              The design of chemical products and processes that reduce or eliminate the use and generation of hazardous
              substances.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-gray-300">
            <p>
              Green chemistry applies across the life cycle of a chemical product, including its design, manufacture,
              use, and ultimate disposal.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-green-800/50">
          <CardHeader>
            <Leaf className="h-8 w-8 text-green-400 mb-2" />
            <CardTitle className="text-green-200">How This Tool Helps</CardTitle>
            <CardDescription className="text-gray-300">
              Our tool analyzes your chemical reactions and provides suggestions for greener alternatives.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-gray-300">
            <p>
              Simply input your reaction details, and we'll check for green chemistry violations and suggest
              improvements.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-green-800/50">
          <CardHeader>
            <Thermometer className="h-8 w-8 text-green-400 mb-2" />
            <CardTitle className="text-green-200">Energy Efficiency</CardTitle>
            <CardDescription className="text-gray-300">
              Discover ways to reduce energy consumption in your chemical processes.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-gray-300">
            <p>
              Our tool provides energy-saving tips based on physical chemistry principles to make your reactions more
              efficient.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-green-800/50">
          <CardHeader>
            <Droplet className="h-8 w-8 text-green-400 mb-2" />
            <CardTitle className="text-green-200">Greener Solvents</CardTitle>
            <CardDescription className="text-gray-300">Find safer alternatives to hazardous solvents.</CardDescription>
          </CardHeader>
          <CardContent className="text-gray-300">
            <p>
              We suggest environmentally friendly solvents that can replace toxic or harmful ones in your reactions.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-green-800/50">
          <CardHeader>
            <Share2 className="h-8 w-8 text-green-400 mb-2" />
            <CardTitle className="text-green-200">Share Your Results</CardTitle>
            <CardDescription className="text-gray-300">
              Generate reports and share your green chemistry achievements.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-gray-300">
            <p>
              Download PDF reports of your analysis and share your eco-score on social media to promote sustainable
              chemistry.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to make your chemistry greener?</h2>
        <Link href="/input">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            Get Started
          </Button>
        </Link>
      </section>
    </div>
  )
}
