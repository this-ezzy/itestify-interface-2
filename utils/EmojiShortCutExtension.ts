/* eslint-disable @typescript-eslint/no-explicit-any */
import { Extension } from "@tiptap/core"
import { InputRule } from "@tiptap/core"
import emojiData from "emoji-datasource"

const emojiMap: Record<string, string> = {}

emojiData.forEach((e: any) => {
    if (e.short_names?.length) {
        emojiMap[e.short_names[0]] = String.fromCodePoint(...e.unified.split("-").map((u: string) => parseInt(u, 16)))
    }
})

export const EmojiShortcode = Extension.create({
    name: "emojiShortcode",

    addInputRules() {
        return [
            new InputRule({
                find: /:([a-z0-9_+-]+):$/,
                handler: ({ state, range, match, commands }) => {
                    const shortcode = match[1]
                    const emoji = emojiMap[shortcode]

                    if (!emoji) return

                    commands.insertContentAt(range, emoji)
                }
            })
        ]
    }
})