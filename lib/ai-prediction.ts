import type { ReactionData } from "./types"

/**
 * Predicts the product of a chemical reaction based on reactants and conditions
 * This is a simplified version that uses predefined rules
 * In a real application, this would use an actual AI model or API
 */
export function predictProduct(data: ReactionData): string {
  const reactants = data.reactants.toLowerCase()
  const solvent = data.solvent.toLowerCase()
  const catalyst = data.catalyst.toLowerCase()
  const temperature = Number.parseInt(data.temperature) || 25

  // Simple rule-based prediction for common reactions

  // Aldol condensation
  if (
    (reactants.includes("benzaldehyde") && reactants.includes("acetone")) ||
    (reactants.includes("benzaldehyde") && reactants.includes("acetophenone"))
  ) {
    return "4-Phenyl-3-buten-2-one (Benzalacetone)"
  }

  // Esterification
  if (
    (reactants.includes("acetic acid") && reactants.includes("ethanol")) ||
    (reactants.includes("ethanoic acid") && reactants.includes("ethanol"))
  ) {
    return "Ethyl acetate + Water"
  }

  // Hydrolysis of esters
  if (
    reactants.includes("ethyl acetate") &&
    reactants.includes("water") &&
    (catalyst.includes("acid") || catalyst.includes("base"))
  ) {
    return "Acetic acid + Ethanol"
  }

  // Saponification
  if (
    (reactants.includes("ester") && reactants.includes("naoh")) ||
    (reactants.includes("ester") && reactants.includes("sodium hydroxide"))
  ) {
    return "Sodium salt of carboxylic acid + Alcohol"
  }

  // Friedel-Crafts alkylation
  if (
    reactants.includes("benzene") &&
    (reactants.includes("chloride") || reactants.includes("bromide")) &&
    (catalyst.includes("alcl3") || catalyst.includes("aluminum chloride"))
  ) {
    return "Alkylbenzene + HCl"
  }

  // Friedel-Crafts acylation
  if (
    reactants.includes("benzene") &&
    (reactants.includes("acyl chloride") || reactants.includes("acid chloride")) &&
    (catalyst.includes("alcl3") || catalyst.includes("aluminum chloride"))
  ) {
    return "Ketone + HCl"
  }

  // Grignard reaction with aldehyde or ketone
  if (
    (reactants.includes("grignard") || reactants.includes("mgbr") || reactants.includes("mgcl")) &&
    (reactants.includes("aldehyde") || reactants.includes("ketone"))
  ) {
    return "Secondary or tertiary alcohol"
  }

  // Dehydration of alcohols
  if (
    reactants.includes("alcohol") &&
    (catalyst.includes("h2so4") || catalyst.includes("sulfuric acid")) &&
    temperature > 100
  ) {
    return "Alkene + Water"
  }

  // Hydrogenation of alkenes
  if (
    reactants.includes("alkene") &&
    reactants.includes("hydrogen") &&
    (catalyst.includes("pd") || catalyst.includes("pt") || catalyst.includes("ni"))
  ) {
    return "Alkane"
  }

  // Halogenation of alkanes
  if (
    reactants.includes("alkane") &&
    (reactants.includes("chlorine") || reactants.includes("bromine")) &&
    (reactants.includes("light") || reactants.includes("uv") || temperature > 300)
  ) {
    return "Haloalkane + HX"
  }

  // Benzaldehyde + Water
  if (reactants.includes("benzaldehyde") && reactants.includes("water")) {
    if (catalyst.includes("acid") || temperature > 100) {
      return "Benzoic acid + Hydrogen"
    } else {
      return "No significant reaction under standard conditions"
    }
  }

  // Default response for unknown reactions
  return "Product prediction requires more specific reaction details"
}
