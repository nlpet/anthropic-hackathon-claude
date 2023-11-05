YES_NO_Q_PROMPT = """
{human_prompt}Based on the query below and the given context, please answer the question. Each sentence
in the context is a separate claim, determine whether the claim supports the answer "yes"
or "no" and record these counts. Provide your answer in JSON format with "yes", "neutral"
and "no" as keys and counts as values. Please make sure the output is valid JSON.

<query>
{query}
</query>

<context>
{context}
</context>
{ai_prompt}
"""

MULTIPLE_ANSWERS_PROMPT = """
{human_prompt}Your task is to answer the query using the context. The context snippets contain the publish date 
in brackets, use it when you perform your analysis to ensure you have the most up to date information.
Optimise the answer for readability and insightfulness for people that want to quickly get up to speed with what has happened.

Output the key points in concise language and provide your answer in JSON format with
the following field: statements. Please make sure the output is valid JSON.

<query>
{query}
</query>

<context>
{context}
</context>

{ai_prompt}
"""

SUMMARISATION_PROMPT = """
{human_prompt}Please summarise the information below. Output your answer in a paragraph.

<information>
{context}
</information>
{ai_prompt}
"""

NUMERIC_ANSWER_PROMPT = """
{human_prompt}Your task is to analyze the given news articles and deduce the correct numeric answer pertaining to 
the posed question. Carefully evaluate the relevance of the information presented in the text to the question, and prioritize 
the most up-to-date information to arrive at an accurate and well-informed numeric answer. Carefully think step by step and 
provide your answer in JSON format with fields: evidence:list, answer:string. Please make sure the output is valid JSON.

<context>
{context}
</context>
{ai_prompt}
"""

OPINIONS_PROMPT = """
{human_prompt}I want you to role play the following personas and 
represent their views and opinions to the best of your ability:
- a skeptic
- an optimist

For each persona, please do the following:
1. Analyse the given context and answer the given query with no more than 3 sentences.
2. Analayse the answers of the other personas and give an argument for why you are right.
3. Step out of the roles and answer as a judge: which argument is the most robust?
4. Decide on a winner based on the conclusions.

Provide the skeptic's perspective in a <skeptic></skeptic> tag, the hopeful person's perspective
in a <optimist></optimist> tag, and your conclusion in <conclusion></conclusion> tags.

<query>
{query}
</query>

<context>
{context}
</context>
{ai_prompt}
"""

TOT_PROMPT = """
{human_prompt}Imagine three different experts are answering this question given the context.
All experts write down 1 step of their thinking, then share it with the group. Then, all experts
will go on to the next step, etc. If any expert realises they're wrong at any point, they leave.
Output the thoughts of all experts for all steps until there is only one left, then give your
well reasoned answer in <answer> tags in JSON format with fields: reasoning:list[str], answer:str

<query>
{query}
</query>

<context>
{context}
</context>
{ai_prompt}
"""
