export interface ReactionData {
  reactants: string
  products: string
  solvent: string
  catalyst: string
  temperature: string
}

export interface Issue {
  title: string
  description: string
}

export interface Suggestion {
  title: string
  description: string
}

export interface EnergyTip {
  title: string
  description: string
}

export interface AnalysisResult {
  ecoRating: "Good" | "Moderate" | "Bad"
  issues: Issue[]
  suggestions: Suggestion[]
  energyTips: EnergyTip[]
}
