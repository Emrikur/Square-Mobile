# Security Guidelines

## Overview
This document outlines security concerns and best practices for this project.
Copilot should review code against these guidelines when making suggestions.

## Rate Limiting
All public endpoints must be protected against overload attacks.
- Login endpoint: max 5 attempts per IP per 15 minutes
- Registration endpoint: max 3 attempts per IP per hour
- All POST endpoints: max 100 requests per IP per minute
- Recommended package: `express-rate-limit`

## Authentication
- Passwords must be hashed with bcrypt (min 10 salt rounds)
- JWT tokens must have an expiry (max 24h)
- Failed login attempts must return a generic error message (never reveal if email exists)
- Tokens must be validated on every protected route via authMiddleware
- Admin routes must have additional isAdmin middleware check

## Input Validation
- All user inputs must be validated before reaching the database
- Reject requests with missing required fields before hitting the backend
- Sanitize all string inputs to prevent SQL injection
- Validate numeric fields have reasonable limits (e.g. hours_worked max 24)
- Validate that enum fields only accept allowed values (e.g. filter: week/month/year)

## Database
- Always use parameterized queries ($1, $2) — never string concatenation
- Wrap multi-step operations in transactions (BEGIN/COMMIT/ROLLBACK)
- Users should never be able to access other users data (always filter by userId)
- Admin-only data must be protected by role check on the backend

## Role Based Access
- Never trust the frontend for role validation
- Always verify role from the JWT token on the backend
- Admin endpoints must return 403 for non-admin users
- Users must never be able to modify other users entries

## Sensitive Data
- Never log passwords, tokens or sensitive user data to the console
- Never store passwords in plain text
- Never expose hourly_rate or salary data to non-admin users
- Never include sensitive fields in error messages

## Known Risk Areas
- Login brute force → implement rate limiting
- Timesheet signoff → validate that entries belong to the requesting user
- Admin approval → verify admin role on every request
- File uploads (future) → validate file type and size
