# Personalization, Spintax, and AI Drafting

## Personalize the hook and offer, not the pitch

Hooks that reference verifiable public facts feel handwritten and are hard to get wrong. Safe targets: city, school, job title, a visible detail like a restaurant near their campus.

"Hey, my friend from {college} says {restaurant} is amazing - would love to buy you a gift card in exchange for your time."

Why it works:

- Verifiable but low risk. The claim is "my friend says it's great", not "I know you love this place". Being wrong costs nothing.
- Reads as manual work. Nobody assumes a bot is mapping restaurants to colleges.
- It scales. Build a lookup table (a few hundred college-to-restaurant pairs is enough) and one pass covers thousands of leads.

Exclude questions like "my friend from {college} says" from interpretation and never hand them to a model unprotected.

## Do not let AI write company-specific pitches

"AI is not good enough yet..." the source says: AI often fails to connect what a company actually does to your value prop, and produces About-page skims.

Split the work:

- Lead-specific product lines: write by hand, 2 minutes per interesting company.
- Every other lead: send the generic template.

There is no profitable middle layer where AI writes company pitches unreviewed.

## Spintax for deliverability

Spintax guarantees no two emails carry identical body text:

"{a lot of|many} Gen-Z founders {in our YC batch|we talk to} are losing deals..."

Each option in a `{a|b|c}` group resolves randomly per send. One template yields hundreds of unique strings. Providers fingerprint identical body text from one domain as spam activity; this content-uniqueness layer matters alongside SPF, DKIM, and DMARC.

Spintax passes the fingerprint check. It does not make the email sound human.

## AI drafts, then humanize

Workflow for the first days of a campaign:

1. Prompt a model with the lead's enrichment data plus the template. Draft.
2. Edit by hand. First drafts run too formal, too long, off in tone.
3. Feed the edits back: "here is what you wrote, here is what I changed, and why. Apply to the next one."
4. Repeat until drafts send unedited. Expect about two weeks of daily iteration to get one prompt per sequence step into that state.

Then layer it: spintax resolves the base template per lead, AI does one final humanize and personalize pass on top. This combines both coverage layers, because spintax handles fingerprinting while AI varies sentence shapes and phrasing, which is what modern NLP scoring looks at. The spintax scaffold keeps structure and claims locked; AI softens edges without inventing new promises.
