export const clientData = {
  // --- IDENTIFICATION ---
  slug: "",
  clientName: "",
  clientIndustry: "",
  clientContext: "",
  auditDate: "",

  // --- SECTION 3: PROCESS MAPS ---
  processes: [
    {
      engine: "",
      steps: [
        {
          name: "",
          who: "",
          tool: "",
          friction: null,
          // friction: { type: "Time Sink" | "Quality Risk" | "Both", detail: "", impact: "" }
        },
      ],
    },
  ],

  // --- SECTION 4: FRICTION POINTS ---
  frictionPoints: [
    {
      id: "",
      label: "",
      type: "",   // "Time Sink" | "Quality Risk" | "Both"
      who: "",
      frequency: "",
      effect: "",
    },
  ],

  // --- SECTION 5 & 8: OPPORTUNITIES ---
  opportunities: {
    quickWins: [
      {
        id: "",
        name: "",
        impact: 0,   // 1-5
        effort: 0,    // 1-5
        engine: "",
        description: "",
        solves: [],
        tools: "",
      },
    ],
    bigSwings: [
      {
        id: "",
        name: "",
        impact: 0,
        effort: 0,
        engine: "",
        description: "",
        solves: [],
        tools: "",
      },
    ],
    deprioritize: [
      {
        id: "",
        name: "",
        reason: "",
      },
    ],
  },

  // --- SECTION 6: QUICK WIN DETAILS ---
  quickWinDetails: [
    {
      id: "",
      name: "",
      currentState: "",
      futureState: "",
      teamImpact: "",
      steps: [],
      roi: {
        hoursSaved: "",
        costSavings: null,
        dataNeeded: [],
      },
      solves: [],
    },
  ],

  // --- SECTION 7: ROI CALCULATOR ---
  roiCalculator: {
    inputs: [
      {
        id: "",
        label: "",
        min: 0,
        max: 100,
        default: 0,
        step: 1,
        unit: "",
      },
    ],
    calculate: (values) => ({
      hoursSavedMonthly: 0,
      annualSavings: 0,
    }),
    outputs: [
      { key: "hoursSavedMonthly", label: "Hours Saved per Month", unit: "hrs", format: "number" },
      { key: "annualSavings", label: "Annual Cost Savings", unit: "$", format: "currency" },
    ],
  },

  // --- SECTION 9: ROADMAP ---
  roadmap: [
    {
      phase: 1,
      title: "",
      timeframe: "",
      items: [],
    },
  ],

  // --- SECTION 10: NEXT STEPS ---
  nextSteps: {
    summary: "",
    details: "",
    ctaUrl: "",
    ctaText: "",
  },
};
