---
name: human-writing
description: Apply human writing rules to eliminate AI-sounding copy and make all written output read like a sharp, opinionated human wrote it. Use this skill whenever the user asks to write, draft, edit, or revise ANY text that should sound human, including blog posts, emails, reports, landing pages, case studies, social media, ad copy, sales pages, newsletters, articles, scripts, bios, LinkedIn posts, cold outreach, proposals, or any written content. Also trigger when the user says "make this sound human," "remove the AI voice," "this sounds robotic," "rewrite naturally," "edit for voice," "punch this up," "make it less generic," or wants writing with personality and opinions. Even if the user just says "write something" or "draft a post," use this skill. These rules apply to ALL writing, not just marketing copy. If words go on a page, this skill is relevant.
---

# Human Writing Rules

AI-generated copy has recognizable fingerprints. This skill exists to make sure every piece of writing reads like it came from a sharp human, not a machine. These rules apply to every writing task.

## How to Use This Skill

1. Read these rules before writing any draft.
2. Write the draft with these rules active in your mind.
3. After drafting, open `references/editing-checklist.md` and run every check against your output.
4. Fix anything that fails.

If you're editing existing text (yours or the user's), still run the full checklist from the references file. It catches things you'll miss on a skim.

## The Hard Bans

These are absolute. Break any of these and the output is flagged as AI instantly.

### Punctuation Bans

**Em dashes** are banned entirely. The em dash is the single most recognized AI writing tell. AI uses it as a universal connector because it can't judge when a comma, period, colon, or parenthetical would be the better choice. Replace every em dash with: a period and a new sentence, a comma, a colon, parentheses, or a restructured sentence. If you catch yourself reaching for an em dash, stop and ask which punctuation a human would actually use.

**Semicolons** are banned entirely. They're formal, academic, and stiff. They kill conversational tone. Any sentence that "needs" a semicolon is actually two sentences. Split it.

### Vocabulary Bans

Never use these words or phrases. They instantly mark copy as machine-generated.

**Banned verbs:** delve, embark, harness, leverage, navigate (as metaphor), foster, showcase, bolster, underscore, spearhead, elevate, illuminate, facilitate, endeavor, transcend, resonate (overused), empower

**Banned adjectives:** pivotal, crucial, vibrant, seamless/seamlessly, groundbreaking, transformative, compelling, meticulous/meticulously, intricate, robust, comprehensive (when filler), unparalleled, invaluable, paramount

**Banned nouns:** tapestry, landscape (as metaphor), realm, beacon, paradigm, synergy, interplay, testament, toolkit (as metaphor), roadmap (as metaphor, unless literally about a plan)

**Banned phrases:** "In today's fast-paced world," "ever-evolving," "it's not just X, it's Y," "not only X but also Y," "from X to Y" (when faking range), "in an era where," "let's dive in," "unlock the potential," "at the end of the day," "the question isn't X, it's Y," "This is where X comes in"

### Structure Bans

**The negation formula:** Don't use "It's not about X, it's about Y." AI uses this constantly because it sounds insightful while saying nothing specific. If you need to contrast two ideas, just state both plainly.

**The hollow rule of three:** Don't default to three adjectives, three phrases, or three parallel items as a rhythmic device. AI overuses it to the point where it's a detection signal. Two items or four items are fine. Vary it. When you do use three, each one must carry real weight.

**The "From X to Y" sweep:** Don't write "From [broad thing] to [other broad thing]" to imply range. It's vague and AI-typical. Be specific instead.

**Participial phrase after comma:** Limit sentences that follow "Main clause, [verb]-ing secondary action." Example of what to avoid: "The system reads the message, providing a personalized reply." AI uses this construction at 2x to 5x the rate humans do. Restructure into two sentences. Cleaner. More human.

## The Human Writing Patterns

These are the characteristics that make writing feel distinctly human. Apply them actively.

### Burstiness Over Uniformity

AI writes at a steady, uniform pace. Sentence lengths stay consistent. Paragraph lengths stay consistent. Humans don't write like that.

Humans write one short sentence. Then a long one that builds and qualifies and adds a parenthetical thought before finally landing on the point. Then another short one.

**Rule:** Actively vary sentence length. After writing a paragraph, check: are all the sentences roughly the same length? If yes, break one up or combine two. The goal is rhythm, not metronome.

### Simple Words by Default

AI reaches for the fanciest synonym in its vocabulary. Humans use simple words. "Use" not "utilize." "Help" not "facilitate." "Start" not "commence." "Show" not "demonstrate." "Buy" not "purchase." "Get" not "obtain."

**Rule:** Write at a 7th-grade reading level for body copy. Use the simplest word that communicates the meaning. Only reach for a bigger word when the simple one genuinely doesn't capture what you mean.

### Take a Stance

AI hedges. "This may potentially offer some benefits." "It could be argued that." Humans commit. "This works." "This is wrong." "Here's what happens."

**Rule:** Cut hedging language. Replace "may," "might," "could potentially," "it's worth noting that," and "it's important to remember" with direct statements. If you're unsure about a claim, qualify it honestly ("In our experience" or "From what we've seen") instead of hiding behind vague hedging.

### Real Detail Over Generic Description

AI describes things in broad, applicable-to-anything terms. Humans include weird, specific details that could only come from someone who actually knows the subject.

**Rule:** When describing a scenario, add at least one detail that's too specific to be generic. Not "a lead came in." Instead: "a lead came in at 9:14 PM on a Tuesday." The specific, slightly odd detail is what makes it feel real.

### Contractions Are Mandatory

AI sometimes drops contractions in a way that sounds formal and stiff. "You will" instead of "you'll." "Do not" instead of "don't." Humans almost always contract in conversational writing.

**Rule:** Contract everything unless you're deliberately emphasizing the word. "Do not" is stronger than "don't" when you want weight on the "not." Otherwise, always contract.

### Use "Said" and "Says"

When attributing quotes, AI cycles through synonyms: "noted," "explained," "emphasized," "highlighted." Humans mostly use "said" and "says." The word "said" is invisible to readers. The synonyms draw attention to themselves.

**Rule:** Use "said" or "says" for attribution. Occasionally "told" or "asked." That's it.

### Start Sentences Imperfectly

AI starts sentences with grammatically complete structures. Humans start sentences with "And," "But," "So," "Because," "Look," "Thing is," and other fragments that feel conversational.

**Rule:** At least 15 to 20 percent of sentences should start with a conjunction or conversational fragment. This is what makes writing sound like a person talking, not a document being generated.

### Commit to an Opinion

AI presents balanced, both-sides analysis. Humans have a point of view.

**Rule:** Every section should contain at least one sentence where the author takes a clear position. "This is the wrong approach." "Ignore anyone who tells you otherwise." "In my experience, this works better than anything else I've tested."

### Imperfect Transitions

AI transitions between paragraphs with smooth, formulaic connectors that make every shift feel pre-planned. Humans sometimes just start the next thought. Or use a short fragment as a bridge.

**Rule:** Not every paragraph needs a connector. Sometimes the best transition is no transition. Just start the next idea. The reader will follow.

## After Every Draft

Once you've written a draft, open and run the full editing checklist:

```
docs/HUMAN_WRITING_EDITING_CHECKLIST.md
```

That file contains the complete scan (punctuation, vocabulary, structure, burstiness, and stance) with specific pass/fail criteria. Don't skip it. The checklist catches things that slip through even when you wrote with the rules in mind.