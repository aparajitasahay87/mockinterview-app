export function evaluateResponse(response) {
    const hints = [];
  
    if (!response.toLowerCase().includes("stakeholder")) {
      hints.push("Consider mentioning how you handled stakeholder alignment.");
    }
    if (!response.toLowerCase().includes("metrics")) {
      hints.push("Include success metrics to strengthen your answer.");
    }
    if (!response.toLowerCase().includes("trade-off")) {
      hints.push("Highlight any trade-offs you navigated.");
    }
  
    return hints;
  }