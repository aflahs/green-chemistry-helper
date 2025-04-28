"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { ReactionData } from "@/lib/types"
import { validateChemicalInput } from "@/lib/validation"

export default function InputPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<ReactionData>({
    reactants: "",
    products: "",
    solvent: "",
    catalyst: "",
    temperature: "",
  })
  const [validationError, setValidationError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (field: keyof ReactionData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear validation error when user starts typing again
    if (field === "reactants" && validationError) {
      setValidationError(null)
    }
  }

  const fillExample = () => {
    setFormData({
      reactants: "Benzaldehyde + Acetone",
      products: "4-Phenyl-3-buten-2-one",
      solvent: "Benzene",
      catalyst: "NaOH",
      temperature: "50",
    })
    setValidationError(null)
  }

  const validateForm = (): boolean => {
    // Validate reactants
    const reactantsValidation = validateChemicalInput(formData.reactants)
    if (!reactantsValidation.isValid) {
      setValidationError(reactantsValidation.message)
      return false
    }

    // Validate products if provided (optional field)
    if (formData.products.trim() !== "") {
      const productsValidation = validateChemicalInput(formData.products)
      if (!productsValidation.isValid) {
        setValidationError(`Products field: ${productsValidation.message}`)
        return false
      }
    }

    // Validate solvent
    if (!formData.solvent) {
      setValidationError("Please select a solvent")
      return false
    }

    // Validate temperature
    if (!formData.temperature || isNaN(Number(formData.temperature))) {
      setValidationError("Please enter a valid temperature")
      return false
    }

    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate the form
    if (!validateForm()) {
      setIsLoading(false)
      return
    }

    // Store the form data in sessionStorage to access it on the results page
    sessionStorage.setItem("reactionData", JSON.stringify(formData))

    // Simulate a brief loading period for AI processing
    setTimeout(() => {
      setIsLoading(false)
      // Navigate to the results page
      router.push("/results")
    }, 1000)
  }

  return (
    <div className="max-w-2xl mx-auto py-6">
      <h1 className="text-3xl font-bold text-white mb-6">Analyze Your Reaction</h1>

      <Card className="bg-gray-800/50 border-green-800/50">
        <CardHeader>
          <CardTitle className="text-green-200">Reaction Details</CardTitle>
          <CardDescription className="text-gray-300">
            Enter the details of your chemical reaction for green chemistry analysis.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {validationError && (
              <Alert variant="destructive" className="bg-red-900/20 border-red-800 text-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{validationError}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="reactants" className="text-gray-200">
                  Reactants <span className="text-red-400">*</span>
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-700 text-gray-200 border-green-800">
                      <p>Enter reactant names separated by + (e.g., "Benzaldehyde + Acetone")</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="reactants"
                placeholder="e.g., Benzaldehyde + Acetone"
                className="bg-gray-700/50 border-green-800/50 text-white"
                value={formData.reactants}
                onChange={(e) => handleChange("reactants", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="products" className="text-gray-200">
                  Products <span className="text-gray-400">(optional)</span>
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-700 text-gray-200 border-green-800">
                      <p>Enter the main product or leave empty for AI prediction</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="products"
                placeholder="e.g., 4-Phenyl-3-buten-2-one (or leave empty for AI prediction)"
                className="bg-gray-700/50 border-green-800/50 text-white"
                value={formData.products}
                onChange={(e) => handleChange("products", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="solvent" className="text-gray-200">
                  Solvent <span className="text-red-400">*</span>
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-700 text-gray-200 border-green-800">
                      <p>Select the solvent used in your reaction</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select value={formData.solvent} onValueChange={(value) => handleChange("solvent", value)} required>
                <SelectTrigger className="bg-gray-700/50 border-green-800/50 text-white">
                  <SelectValue placeholder="Select a solvent" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-green-800 text-white">
                  <SelectItem value="Water">Water</SelectItem>
                  <SelectItem value="Ethanol">Ethanol</SelectItem>
                  <SelectItem value="Methanol">Methanol</SelectItem>
                  <SelectItem value="Acetone">Acetone</SelectItem>
                  <SelectItem value="Ethyl Acetate">Ethyl Acetate</SelectItem>
                  <SelectItem value="Dichloromethane">Dichloromethane</SelectItem>
                  <SelectItem value="Chloroform">Chloroform</SelectItem>
                  <SelectItem value="Benzene">Benzene</SelectItem>
                  <SelectItem value="Toluene">Toluene</SelectItem>
                  <SelectItem value="Hexane">Hexane</SelectItem>
                  <SelectItem value="THF">THF</SelectItem>
                  <SelectItem value="DMF">DMF</SelectItem>
                  <SelectItem value="DMSO">DMSO</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="catalyst" className="text-gray-200">
                  Catalyst (optional)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-700 text-gray-200 border-green-800">
                      <p>Enter any catalyst used in your reaction</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="catalyst"
                placeholder="e.g., NaOH, H2SO4, Pd/C"
                className="bg-gray-700/50 border-green-800/50 text-white"
                value={formData.catalyst}
                onChange={(e) => handleChange("catalyst", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="temperature" className="text-gray-200">
                  Temperature (°C) <span className="text-red-400">*</span>
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-700 text-gray-200 border-green-800">
                      <p>Enter the reaction temperature in degrees Celsius</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="temperature"
                type="number"
                placeholder="e.g., 25"
                className="bg-gray-700/50 border-green-800/50 text-white"
                value={formData.temperature}
                onChange={(e) => handleChange("temperature", e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={fillExample}
              className="border-green-600 text-green-400 hover:bg-green-900/30"
            >
              Fill Example
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading ? "Analyzing..." : "Analyze Reaction"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
