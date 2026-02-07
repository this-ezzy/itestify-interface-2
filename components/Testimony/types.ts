import React from "react";

export interface Fellowship {
    id: string
    name: string
    icon: string
}

export interface Attachment {
    id: string;
    url: string;
    name: string
}

export interface TestimonyDraft {
    fellowshipId: string
    title: string
    content: string
    showAvatar: boolean
    attachments?: Attachment[]
}

export interface TestifyComposerProps {
    value: TestimonyDraft
    onChange: (value: TestimonyDraft) => void
    onPost: () => void
    onSaveDraft?: () => void
    onSchedule?: () => void
    isPosting?: boolean
}
