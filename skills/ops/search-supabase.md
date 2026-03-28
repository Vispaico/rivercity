---
title: Search Supabase
summary: Search articles, guides, FAQs, inventory and blog posts stored in Supabase
tags: tool, knowledge, supabase, rag
prerequisites: []
---

**When to use:**
- User asks about rental prices, availability, or specific guides
- User wants latest travel information
- User asks something that might be in our articles or FAQs

**When not to use:**
- Very simple questions that are covered in the skill graph
- General conversation

**How it works:**
Call the tool with a clear query and optional category.

Example calls:
- query: "How much is a motorbike rental for one week?"
- query: "How do I get from Haiphong airport to Cat Ba?", category: "transport"
- query: "Do you have automatic scooters?"

The tool returns the most relevant pieces from Supabase so you can give accurate answers.