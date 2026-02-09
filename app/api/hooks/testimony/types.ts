export interface QueryParams {
    limit?: number;
    page?: number
}

export interface TestimoniesResponse {
    data: Testimony[];
    limit: number;
    page: number;
}

export interface Testimony {
    id: number;
    user_id: number;

    title: string;
    body: string;

    is_draft: boolean;

    media: TestimonyMedia[] | null;

    impressions: number;
    parent_id: number | null;

    created_at: string; // ISO datetime
    updated_at: string; // ISO datetime

    topics: Topic[];
    user: TestimonyUser;
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


export interface UploadedAttachment {
    id: string
    url: string
    name: string
    size: number
    mime: string
}

export interface TestimonyPayload {
    title: string
    body: string
    topic?: number
    files: UploadedAttachment[]
    isDraft?: boolean
    scheduledAt?: string | null
}
