# Dev Diary Entry

**Date**: 2026-02-23
**Project**: mydev_diary_google

## Tasks Completed

### API Key Test Functionality Fix
- Fixed Gemini API test connection (404 error with old model names)
- Added model selector dropdown for Gemini with 5 models:
  - Gemini 2.0 Flash
  - Gemini 1.5 Pro
  - Gemini 1.5 Flash
  - Gemini 1.0 Pro
  - Gemini Pro (Legacy)
- Fixed Anthropic API CORS issue by creating server-side proxy
- All three providers (Gemini, OpenAI, Anthropic) now working

### Vercel Deployment
- Connected Git repository to Vercel for auto-deployment
- Deployed updated API test functionality

## Files Changed

| File | Change |
|------|--------|
| `services/geminiService.ts` | Added GEMINI_MODELS array, changed to direct fetch API, added model parameter |
| `services/anthropicService.ts` | Changed to use server-side proxy `/api/test-anthropic` |
| `api/test-anthropic.ts` | Created new Vercel serverless function for Anthropic API proxy |
| `components/ApiKeyTestSection.tsx` | Added model selector dropdown for Gemini |

## Technical Decisions

1. **Direct Fetch vs SDK for Gemini**: Used direct fetch API call instead of Google GenAI SDK for simpler API key testing
2. **Server-side Proxy for Anthropic**: Created Vercel serverless function to bypass CORS restrictions (Anthropic API doesn't allow browser requests)
3. **Model Selection**: Added dropdown to let users test different Gemini models

## Issues Resolved

- **Gemini 404 Error**: Fixed by updating model name from `gemini-1.5-flash` to `gemini-2.0-flash` as default
- **Anthropic CORS Blocked**: Resolved by routing requests through `/api/test-anthropic` serverless function
- **Vercel Not Auto-deploying**: Fixed by connecting Git repository to Vercel project

## Pending Items

- D: drive category folder organization (proposed but not executed)
- Document duplicate file cleanup
- mydrive and Dropbox duplicate file check
