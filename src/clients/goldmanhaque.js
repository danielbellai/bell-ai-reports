export const clientData = {
  slug: "goldmanhaque",
  clientName: "Goldman Haque",
  clientIndustry: "Accounting / CPA Firm",
  clientContext: "6-person firm managing 120+ accounts across tax, bookkeeping, and advisory services.",
  auditDate: "March 2026",

  processes: [
    {
      engine: "Client Onboarding",
      steps: [
        { name: "Initial consultation call", who: "Partner", tool: "Zoom", friction: null },
        { name: "Collect client documents", who: "Admin", tool: "Email / Dropbox",
          friction: { type: "Time Sink", detail: "Documents arrive piecemeal via email. Staff chases clients for missing items — multiple follow-ups per client.", impact: "~3 hrs/week across team" }
        },
        { name: "Enter client info into system", who: "Admin", tool: "QuickBooks / Excel",
          friction: { type: "Both", detail: "Manual data entry from PDFs and emails. Errors caught later during review.", impact: "~2 hrs/week, errors found weekly" }
        },
        { name: "Set up recurring tasks", who: "Manager", tool: "Practice management", friction: null },
      ],
    },
    {
      engine: "Tax Preparation",
      steps: [
        { name: "Gather source documents", who: "Staff", tool: "Email / Portal",
          friction: { type: "Time Sink", detail: "Tax season bottleneck — staff spend more time collecting than preparing.", impact: "Peak: 5+ hrs/day per person in Feb-Apr" }
        },
        { name: "Prepare return", who: "Staff", tool: "Tax software", friction: null },
        { name: "Review return", who: "Manager/Partner", tool: "Tax software",
          friction: { type: "Quality Risk", detail: "Review bottlenecks at partner level. Returns queue up, delaying filing.", impact: "2-5 day delays per return" }
        },
        { name: "Client sign-off", who: "Admin", tool: "Email / DocuSign", friction: null },
        { name: "E-file submission", who: "Staff", tool: "Tax software", friction: null },
      ],
    },
    {
      engine: "Monthly Bookkeeping",
      steps: [
        { name: "Download bank statements", who: "Staff", tool: "Bank portals",
          friction: { type: "Time Sink", detail: "Manual download from multiple bank portals per client. No automation.", impact: "~4 hrs/month" }
        },
        { name: "Categorize transactions", who: "Staff", tool: "QuickBooks", friction: null },
        { name: "Reconcile accounts", who: "Staff", tool: "QuickBooks", friction: null },
        { name: "Generate reports", who: "Manager", tool: "QuickBooks / Excel",
          friction: { type: "Quality Risk", detail: "Reports formatted manually in Excel. Inconsistent templates across clients.", impact: "Formatting errors found monthly" }
        },
        { name: "Send to client", who: "Admin", tool: "Email", friction: null },
      ],
    },
  ],

  frictionPoints: [
    { id: "F1", label: "Document chasing via email", type: "Time Sink", who: "Admin / Staff", frequency: "Daily during onboarding & tax season", effect: "Staff spend ~15 hrs/week chasing documents instead of doing productive work." },
    { id: "F2", label: "Manual data entry from PDFs", type: "Both", who: "Admin", frequency: "Every new client", effect: "Errors propagate downstream. ~2 hrs/client for entry, plus rework." },
    { id: "F3", label: "Partner review bottleneck", type: "Quality Risk", who: "Partner", frequency: "Every return", effect: "Returns queue 2-5 days at partner desk. Delays filing, risks deadlines." },
    { id: "F4", label: "Manual bank statement downloads", type: "Time Sink", who: "Staff", frequency: "Monthly per client", effect: "~4 hrs/month on repetitive downloads. No value-add." },
    { id: "F5", label: "Inconsistent report formatting", type: "Quality Risk", who: "Manager", frequency: "Monthly", effect: "Clients receive differently formatted reports. Professional image at risk." },
    { id: "F6", label: "No centralized task tracking", type: "Both", who: "Everyone", frequency: "Daily", effect: "Tasks tracked in heads, sticky notes, and scattered spreadsheets. Things fall through cracks." },
  ],

  opportunities: {
    quickWins: [
      { id: "QW1", name: "Automated Document Collection Portal", impact: 10, effort: 4, engine: "Client Onboarding", description: "Replace email-based document collection with an automated portal that sends reminders and tracks what's missing.", solves: ["F1"], tools: "Canopy, TaxDome, or custom portal" },
      { id: "QW2", name: "PDF Data Extraction", impact: 8, effort: 4, engine: "Client Onboarding", description: "Use AI to extract data from uploaded PDFs and auto-populate client records.", solves: ["F2"], tools: "Docsumo, Rossum, or custom OCR pipeline" },
      { id: "QW3", name: "Standardized Report Templates", impact: 6, effort: 2, engine: "Monthly Bookkeeping", description: "Create consistent branded report templates that auto-populate from QuickBooks data.", solves: ["F5"], tools: "QuickBooks reporting + template system" },
      { id: "QW4", name: "Task Management System", impact: 8, effort: 5, engine: "All", description: "Centralize all task tracking with assignments, deadlines, and status visibility.", solves: ["F6"], tools: "Karbon, Jetpack Workflow, or Asana" },
    ],
    bigSwings: [
      { id: "BS1", name: "Bank Feed Automation", impact: 8, effort: 6, engine: "Monthly Bookkeeping", description: "Connect client bank accounts directly via Plaid/Yodlee for automatic statement pulls and categorization.", solves: ["F4"], tools: "Plaid, QuickBooks bank feeds" },
      { id: "BS2", name: "AI-Assisted Review Workflow", impact: 10, effort: 8, engine: "Tax Preparation", description: "Implement AI-powered preliminary review that flags common errors before partner review, reducing bottleneck.", solves: ["F3"], tools: "Custom AI review tool, integration with tax software" },
    ],
    deprioritize: [
      { id: "D1", name: "Full Practice Management Overhaul", reason: "Too disruptive during tax season. The quick wins address the biggest pain points without requiring a platform migration." },
      { id: "D2", name: "Client-Facing Mobile App", reason: "Low ROI for firm this size. A portal (QW1) handles 95% of client interaction needs." },
    ],
  },

  quickWinDetails: [
    {
      id: "QW1",
      name: "Automated Document Collection Portal",
      currentState: "Staff send emails requesting documents. Clients respond sporadically, often with wrong files. Staff send follow-ups. Documents arrive in random formats across email, text, and Dropbox. Average: 4-6 touchpoints per client to collect everything.",
      futureState: "Client receives a branded portal link. They see exactly what's needed with clear labels. They upload directly. The system auto-sends reminders for missing items. Staff get notified only when everything is complete.",
      teamImpact: "Admin stops being a document detective. Staff spend their time on actual accounting work. Clients feel more organized and professional about the process.",
      steps: [
        "Select and configure document portal (TaxDome or Canopy)",
        "Create document request templates for each service type",
        "Set up automated reminder sequences",
        "Pilot with 10 clients, gather feedback",
        "Roll out to full client base",
      ],
      roi: {
        hoursSaved: "~12 hrs/week during peak season",
        costSavings: null,
        dataNeeded: ["Average staff hourly cost", "Number of active clients during tax season"],
      },
      solves: ["F1"],
    },
    {
      id: "QW2",
      name: "PDF Data Extraction",
      currentState: "Admin manually reads PDFs — W-2s, 1099s, bank statements — and types values into the system. Typos happen. Corrections happen later. Each client takes 30-60 minutes of pure data entry.",
      futureState: "Client uploads documents to the portal. AI reads and extracts key data fields. Staff reviews a pre-filled form and confirms with one click. Entry time drops to 5 minutes per client.",
      teamImpact: "Data entry stops being a soul-crushing task. Staff can focus on analysis and client relationships instead of transcription.",
      steps: [
        "Integrate OCR/AI extraction with document portal",
        "Train extraction models on common document types (W-2, 1099, K-1)",
        "Build review interface for staff to confirm extracted data",
        "Test accuracy on 20 client documents",
        "Deploy with human-in-the-loop review",
      ],
      roi: {
        hoursSaved: "~8 hrs/week during tax season",
        costSavings: null,
        dataNeeded: ["Average staff hourly cost", "Number of documents processed per season"],
      },
      solves: ["F2"],
    },
    {
      id: "QW3",
      name: "Standardized Report Templates",
      currentState: "Managers format reports in Excel manually. Each manager has their own style. Clients notice inconsistencies. Some reports look polished; others look rushed.",
      futureState: "One click generates a branded, consistent report from QuickBooks data. Every client gets the same professional look. Managers spend time on insights, not formatting.",
      teamImpact: "Managers reclaim 2-3 hours per month. The firm's brand looks sharper and more professional across every client touchpoint.",
      steps: [
        "Design standardized report template with firm branding",
        "Build QuickBooks-to-template data pipeline",
        "Test with 5 clients across different service types",
        "Train managers on new workflow",
      ],
      roi: {
        hoursSaved: "~3 hrs/month per manager",
        costSavings: null,
        dataNeeded: ["Number of managers", "Number of monthly reporting clients"],
      },
      solves: ["F5"],
    },
    {
      id: "QW4",
      name: "Task Management System",
      currentState: "Tasks live in people's heads, sticky notes, and scattered spreadsheets. Nobody has visibility into what's done, what's pending, or what's falling behind. Things get missed. Tax deadlines create panic.",
      futureState: "Every task is visible in one dashboard. Assignments are clear. Deadlines trigger automatic reminders. The partner can see firm-wide workload at a glance without asking anyone.",
      teamImpact: "Everyone knows exactly what they need to do. No more 'did you do that?' conversations. Accountability becomes structural, not interpersonal.",
      steps: [
        "Select task management platform (Karbon recommended for CPA firms)",
        "Map current workflows into task templates",
        "Import client list and assign recurring tasks",
        "Run 2-week pilot with one service line",
        "Full rollout with team training",
      ],
      roi: {
        hoursSaved: "~5 hrs/week in coordination overhead",
        costSavings: null,
        dataNeeded: ["Number of staff", "Average hourly cost"],
      },
      solves: ["F6"],
    },
  ],

  roiCalculator: {
    inputs: [
      { id: "docHours", label: "Hours/week chasing documents", min: 1, max: 30, default: 15, step: 1, unit: "hrs" },
      { id: "dataEntryHours", label: "Hours/week on manual data entry", min: 1, max: 20, default: 8, step: 1, unit: "hrs" },
      { id: "hourlyCost", label: "Average staff hourly cost", min: 20, max: 80, default: 35, step: 5, unit: "$" },
      { id: "coordHours", label: "Hours/week on task coordination", min: 1, max: 15, default: 5, step: 1, unit: "hrs" },
    ],
    calculate: (values) => {
      const docSaved = values.docHours * 0.7;
      const entrySaved = values.dataEntryHours * 0.85;
      const coordSaved = values.coordHours * 0.6;
      const totalWeekly = docSaved + entrySaved + coordSaved;
      const monthly = totalWeekly * 4.33;
      const annual = monthly * 12 * values.hourlyCost;

      return {
        hoursSavedWeekly: Math.round(totalWeekly),
        hoursSavedMonthly: Math.round(monthly),
        annualSavings: Math.round(annual),
      };
    },
    outputs: [
      { key: "hoursSavedWeekly", label: "Hours Saved per Week", unit: "hrs", format: "number" },
      { key: "hoursSavedMonthly", label: "Hours Saved per Month", unit: "hrs", format: "number" },
      { key: "annualSavings", label: "Annual Cost Savings", unit: "$", format: "currency" },
    ],
  },

  roadmap: [
    {
      phase: 1,
      title: "First Win",
      timeframe: "48 Hours",
      items: [
        "Set up document collection portal with first 10 clients",
        "Create standardized report template from best existing example",
        "Quick team alignment on new workflows",
      ],
    },
    {
      phase: 2,
      title: "Quick ROI",
      timeframe: "Weeks 1-2",
      items: [
        "Roll out document portal to all active clients",
        "Implement task management system with recurring workflows",
        "Set up PDF extraction pipeline and test with real documents",
        "Train team on new tools and processes",
      ],
    },
    {
      phase: 3,
      title: "Bigger Builds",
      timeframe: "Weeks 3+",
      items: [
        "Connect bank feeds for automated statement pulls",
        "Build AI-assisted review workflow for tax returns",
        "Measure results and optimize based on team feedback",
        "Plan next phase of automation based on data",
      ],
    },
  ],

  nextSteps: {
    summary: "This audit identified 6 friction points across your core operations. 4 are quick wins we can start implementing this week, with the first results visible within 48 hours.",
    details: "In our next conversation, we'll finalize your staff cost numbers for precise ROI, pick which 10 clients to pilot the document portal with, and map your first task templates.",
    ctaUrl: "https://calendly.com/bellaisolutions/kickoff",
    ctaText: "Schedule the Kickoff",
  },
};
