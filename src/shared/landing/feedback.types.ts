export type DirectoryVote = -1 | 0 | 1;

export interface DirectoryComment {
    id: string;
    text: string;
    number: number;
    created: string;
    authorId: string;
    authorName: string;
}

export interface DirectoryFeedbackEntry {
    vote: DirectoryVote;
    rating: number;
    review: string;
    comments: DirectoryComment[];
}

export interface LandingStorageState {
    version: 2;
    savedIds: string[];
    feedback: Record<string, DirectoryFeedbackEntry>;
}

export const emptyDirectoryFeedback: DirectoryFeedbackEntry = {
    vote: 0,
    rating: 0,
    review: ``,
    comments: [],
};

export const directoryCommentLimit = 600;
export const landingStorageKey = `directory-directory:landing:v1`;

export const parseLandingState = (raw: string | null, directoryIds: Set<string>): LandingStorageState => {
    if (raw === null) return { version: 2, savedIds: [], feedback: {} };

    let parsed: unknown;
    try {
        parsed = JSON.parse(raw);
    } catch {
        throw new Error(`Saved Directory Feedback Could Not Be Read`);
    }
    if (!parsed || typeof parsed !== `object` || Array.isArray(parsed)) throw new Error(`Saved Directory Feedback Has An Unsupported Format`);

    const state = parsed as Partial<LandingStorageState>;
    if ((state.version !== undefined && state.version !== 2)
        || (state.savedIds !== undefined && !Array.isArray(state.savedIds))
        || (state.feedback !== undefined && (!state.feedback || typeof state.feedback !== `object` || Array.isArray(state.feedback)))) {
        throw new Error(`Saved Directory Feedback Has An Unsupported Format`);
    }
    const savedIds = Array.isArray(state.savedIds)
        ? [...new Set(state.savedIds.filter((id) => typeof id === `string` && directoryIds.has(id)))]
        : [];
    const commentIds = new Set<string>();
    const commentNumbers = new Set<number>();
    const feedback = Object.fromEntries(Object.entries(state.feedback ?? {}).flatMap(([id, entry]) => {
        if (!directoryIds.has(id) || !entry || typeof entry !== `object`) return [];

        const vote = entry.vote === 1 || entry.vote === -1 ? entry.vote : 0;
        const rating = Number.isInteger(entry.rating) && entry.rating >= 0 && entry.rating <= 5 ? entry.rating : 0;
        const review = typeof entry.review === `string` ? entry.review.slice(0, 600) : ``;
        if (entry.comments !== undefined && !Array.isArray(entry.comments)) throw new Error(`Saved Directory Comments Have An Unsupported Format`);
        const comments = (entry.comments ?? []).map((comment): DirectoryComment => {
            if (!comment || typeof comment.id !== `string` || !comment.id.startsWith(`Comment_${comment.number}_`)
                || !/^Comment_\d+_[a-z\d-]+_\d{4}-\d{2}-\d{2}_[a-f\d-]{36}$/i.test(comment.id)
                || !Number.isSafeInteger(comment.number) || comment.number < 1 || typeof comment.text !== `string`
                || !comment.text.trim() || comment.text.length > directoryCommentLimit || typeof comment.created !== `string`
                || !Number.isFinite(Date.parse(comment.created)) || typeof comment.authorId !== `string` || !comment.authorId
                || typeof comment.authorName !== `string` || !comment.authorName.trim()
                || commentIds.has(comment.id) || commentNumbers.has(comment.number)) {
                throw new Error(`Saved Directory Comments Are Incomplete`);
            }
            commentIds.add(comment.id);
            commentNumbers.add(comment.number);
            return { id: comment.id, text: comment.text, number: comment.number, created: comment.created, authorId: comment.authorId, authorName: comment.authorName };
        });
        return [[id, { vote, rating, review, comments }]];
    }));

    return { version: 2, savedIds, feedback };
};
