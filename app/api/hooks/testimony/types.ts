export interface QueryParams {
    limit?: number;
    page?: number
    id?: string
}

export interface TestimoniesResponse {
    results: Testimony[];
    limit: number;
    page: number;
    next_page: boolean
}

export interface Testimony {
    id: number;
    user_id: number;

    title: string;
    body: string;

    is_draft: boolean;

    media: TestimonyMedia[] | null;

    liked: boolean

    bookmarked: boolean

    impressions: number;
    parent_id: number | null;

    created_at: string; // ISO datetime
    updated_at: string; // ISO datetime

    topics: Topic[];
    user: TestimonyUser;

    replies_count: number
}

export interface TestimonyMedia {
    path: string;
    type: "image" | "video" | string; // extensible
    url: string;
}

export interface Topic {
    id: number;
    name: string;
}

export interface TestimonyUser {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    bio: string;
    avatar_url?: string
}

export type UploadedAttachment = {
    id: string
    file: File   // ⭐ REQUIRED
    preview: string
    name: string
    size: number
    mime: string
}


export interface TestimonyPayload {
    title?: string
    body: string
    topic?: number
    files?: UploadedAttachment[]
    isDraft?: boolean
    scheduledAt?: string | null
    parent_id?: string
}
