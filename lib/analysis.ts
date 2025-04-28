import type { ReactionData, AnalysisResult, Issue, Suggestion, EnergyTip } from "./types"

// Define problematic solvents and their alternatives
const problematicSolvents: Record<string, string[]> = {
  Benzene: ["Water", "Ethanol", "2-Propanol", "Ethyl Acetate"],
  Chloroform: ["Ethyl Acetate", "2-MeTHF", "Ethanol"],
  Dichloromethane: ["Ethyl Acetate", "Acetone", "2-MeTHF"],
  "Carbon Tetrachloride": ["Ethyl Acetate", "Heptane"],
  Hexane: ["Heptane", "2-MeTHF"],
  DMF: ["Ethyl Lactate", "Propylene Carbonate"],
  DMSO: ["Ethyl Lactate", "Propylene Carbonate"],
  Toluene: ["Anisole", "2-MeTHF", "Ethyl Acetate"],
}

// Define problematic catalysts and their alternatives
const problematicCatalysts: Record<string, string[]> = {
  Chromium: ["Hydrogen Peroxide", "Enzymes"],
  Lead: ["Zinc", "Iron"],
  Mercury: ["Zinc", "Iron"],
  Cadmium: ["Zinc", "Iron"],
  Nickel: ["Iron", "Copper"],
  AlCl3: ["Zeolites", "Solid Acid Catalysts"],
  ZnCl2: ["Zeolites", "Solid Acid Catalysts"],
}

// Temperature thresholds
const TEMP_HIGH = 100
const TEMP_MODERATE = 50

export function analyzeReaction(data: ReactionData): AnalysisResult {
  const issues: Issue[] = []
  const suggestions: Suggestion[] = []
  const energyTips: EnergyTip[] = []

  // Check solvent
  const solvent = data.solvent
  if (solvent in problematicSolvents) {
    issues.push({
      title: `Problematic Solvent: ${solvent}`,
      description: `${solvent} is considered hazardous according to green chemistry principles.`,
    })

    const alternatives = problematicSolvents[solvent]
    suggestions.push({
      title: "Consider Greener Solvents",
      description: `Replace ${solvent} with ${alternatives.join(", ")} for a more environmentally friendly process.`,
    })
  }

  // Check catalyst
  const catalyst = data.catalyst
  if (catalyst) {
    for (const [problematic, alternatives] of Object.entries(problematicCatalysts)) {
      if (catalyst.toLowerCase().includes(problematic.toLowerCase())) {
        issues.push({
          title: `Problematic Catalyst: Contains ${problematic}`,
          description: `Catalysts containing ${problematic} are toxic and environmentally harmful.`,
        })

        suggestions.push({
          title: "Consider Greener Catalysts",
          description: `Replace ${problematic}-based catalysts with ${alternatives.join(", ")} for a more environmentally friendly process.`,
        })
        break
      }
    }
  }

  // Check temperature
  const temperature = Number.parseInt(data.temperature)
  if (temperature > TEMP_HIGH) {
    issues.push({
      title: "High Temperature Process",
      description: `Reactions at ${temperature}°C require significant energy input, increasing environmental impact.`,
    })

    energyTips.push({
      title: "Consider Microwave Heating",
      description:
        "Microwave heating can be more energy-efficient than conventional heating for high-temperature reactions.",
    })

    energyTips.push({
      title: "Explore Catalytic Alternatives",
      description: "Adding appropriate catalysts may allow the reaction to proceed at lower temperatures.",
    })
  } else if (temperature > TEMP_MODERATE) {
    energyTips.push({
      title: "Optimize Heating Efficiency",
      description: "Use insulated reaction vessels to minimize heat loss and energy consumption.",
    })
  }

  // Check reactants for specific problematic chemicals
  const reactants = data.reactants.toLowerCase()
  if (reactants.includes("formaldehyde") || reactants.includes("formalin")) {
    issues.push({
      title: "Hazardous Reactant: Formaldehyde",
      description: "Formaldehyde is carcinogenic and environmentally harmful.",
    })

    suggestions.push({
      title: "Consider Safer Alternatives",
      description: "Consider using glyoxal or other less toxic aldehydes as alternatives.",
    })
  }

  // Add general energy-saving tips
  if (energyTips.length === 0) {
    energyTips.push({
      title: "Optimize Reaction Time",
      description:
        "Shorter reaction times generally consume less energy. Monitor your reaction to avoid unnecessary extended heating.",
    })
  }

  energyTips.push({
    title: "Consider Ambient Conditions",
    description: "When possible, design reactions that can proceed at room temperature and atmospheric pressure.",
  })

  // Determine eco-rating based on issues found
  let ecoRating: "Good" | "Moderate" | "Bad" = "Good"

  if (issues.length > 2 || (issues.length > 0 && temperature > TEMP_HIGH)) {
    ecoRating = "Bad"
  } else if (issues.length > 0 || temperature > TEMP_MODERATE) {
    ecoRating = "Moderate"
  }

  // Add general green chemistry suggestions if none were found
  if (suggestions.length === 0) {
    suggestions.push({
      title: "Explore Biocatalysis",
      description: "Enzymes and biological catalysts often operate under mild conditions and can be highly selective.",
    })
  }

  return {
    ecoRating,
    issues,
    suggestions,
    energyTips,
  }
}
