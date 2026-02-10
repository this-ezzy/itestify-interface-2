export function estimateReadTime(html: string, wpm = 200) {
    if (!html) return 0

    // 1. remove tags
    const text = html.replace(/<[^>]*>/g, " ")

    // 2. normalize spaces
    const words = text
        .trim()
        .replace(/\s+/g, " ")
        .split(" ")
        .filter(Boolean).length

    // 3. minutes
    const minutes = words / wpm

    // 4. round up (never show 0)
    return Math.max(1, Math.ceil(minutes))
}
