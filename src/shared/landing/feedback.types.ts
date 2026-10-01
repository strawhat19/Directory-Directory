export type DirectoryVote = -1 | 0 | 1;

export interface DirectoryFeedbackEntry {
    vote: DirectoryVote;
    rating: number;
    review: string;
}

export interface LandingStorageState {
    savedIds: string[];
    feedback: Record<string, DirectoryFeedbackEntry>;
}

export const emptyDirectoryFeedback: DirectoryFeedbackEntry = {
    vote: 0,
    rating: 0,
    review: ``,
};

export const landingStorageKey = `directory-directory:landing:v1`;

export const parseLandingState = (raw: string | null, directoryIds: Set<string>): LandingStorageState => {
    if (!raw) return { savedIds: [], feedback: {} };

    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== `object`) return { savedIds: [], feedback: {} };

    const state = parsed as Partial<LandingStorageState>;
    const savedIds = Array.isArray(state.savedIds)
        ? [...new Set(state.savedIds.filter((id) => typeof id === `string` && directoryIds.has(id)))]
        : [];
    const feedback = Object.fromEntries(Object.entries(state.feedback ?? {}).flatMap(([id, entry]) => {
        if (!directoryIds.has(id) || !entry || typeof entry !== `object`) return [];

        const vote = entry.vote === 1 || entry.vote === -1 ? entry.vote : 0;
        const rating = Number.isInteger(entry.rating) && entry.rating >= 0 && entry.rating <= 5 ? entry.rating : 0;
        const review = typeof entry.review === `string` ? entry.review.slice(0, 600) : ``;
        return [[id, { vote, rating, review }]];
    }));

    return { savedIds, feedback };
};
