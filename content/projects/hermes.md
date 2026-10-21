---
title: Hermes
tags: [python, langgraph, agents, uarizona]
status: Early-stage idea
excerpt: An early-stage idea for helping University of Arizona students discover and connect with student organizations — starting with a narrower, organization-focused scope.
---

# Hermes

An early-stage project idea Benjamin is developing: helping University of Arizona students **discover and connect with student organizations**.

> **Status note:** This is an idea in the very early stages. It is *not* approved by, affiliated with, or connected to university systems, and it is not launched. This page is a working document for the idea itself.

## Purpose

Finding the right student organization is a search problem that no one has bothered to make pleasant. Hermes is a personal experiment in making that search feel like conversation rather than a list of clubs.

## Initial scope

The initial scope is deliberately **organization-focused** — narrower than the full vision, so the idea can be tested honestly:

- A searchable view of student organizations (from public info)
- Natural-language queries: *"a club for hiking and volunteering"*
- An agentic search layer that can refine, compare, and re-ask

## Status

- **Stage:** Idea → early exploration
- **What exists:** sketches, notes, small experiments — no product, no users, nothing live
- **What doesn't exist yet:** any connection to university systems, any affiliation, any deployment

## Tools & direction

- **Python** for the data and logic layers
- Exploring **LangGraph** for the agentic search flow
- Thinking about evaluation before optimization: the "good answer" test comes first

## Next steps

1. Build a tiny dataset of a handful of orgs (public info only) and a text prompt that can answer against it.
2. Define what a *good* answer looks like — this is the actual product.
3. Decide whether it stays a learning experiment or becomes something more.

Want to poke holes in the idea? There's a respond link at the bottom of this page — it's welcome here.