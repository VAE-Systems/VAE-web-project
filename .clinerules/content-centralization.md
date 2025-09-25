Rule: No static long strings (>5 words) directly in components.
Reason: Keep all marketing text in /src/content/\*.ts for consistency and easier updates.
Check: Search all .tsx files for string literals longer than 5 words and flag them.
Severity: Warn
