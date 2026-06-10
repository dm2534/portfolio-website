# Calorie Tracker

## Meta
- status: live
- category: Personal Tools
- stack: Python, Vertex AI, Gemini, Cloud Run, Firestore, BigQuery
- github: https://github.com/dnm54/calorie-tracker
- demo: null
- highlight: AI-powered nutrition logging · Natural language input · Trend analysis

## Summary
A personal nutrition tracking app that replaces manual calorie counting with natural language input. Describe what you ate in plain English and Gemini parses the meal, estimates macros, and logs it automatically. Built primarily to solve my own frustration with rigid food diary apps that require exact entries.

## Problem
Every calorie tracking app assumes you know exactly what you ate and how much. Real meals are messier — a plate of rice, some chicken, whatever was in the fridge. Manual lookup is friction enough that most people stop using the app within a week.

## Solution
A lightweight web app where you type or speak a meal description in plain English. A Gemini-powered backend interprets the input, maps it to nutritional data, handles ambiguity by asking one clarifying question if needed, and logs the result to Firestore. BigQuery sits underneath for weekly and monthly trend queries.

## Key Features
- Natural language meal logging — no dropdowns, no barcode scanning
- Gemini function calling to extract meal components and quantities from unstructured text
- Clarification loop — if input is ambiguous (e.g. "had lunch") the agent asks one targeted question
- Daily summary with macro breakdown (protein, carbs, fat, calories)
- Weekly trend charts pulled from BigQuery
- Deployed on Cloud Run — accessible from any device

## Technical Details
- **AI layer:** Gemini 1.5 Flash via Vertex AI, with structured output prompting to return JSON nutrition estimates
- **Storage:** Firestore for per-day meal logs, BigQuery for aggregate queries
- **Backend:** Python (FastAPI) on Cloud Run
- **Auth:** Google Sign-In so data is personal and persistent across devices

## What I learned
Gemini's function calling handles ambiguous food descriptions surprisingly well but struggles with culturally specific dishes — added a fallback that searches a nutrition API (Nutritionix) when confidence is low. This pattern of LLM-first with API fallback is something I now use across other projects.

## Status
Live and in daily personal use. Planning to add a meal photo input using Gemini's vision capabilities.