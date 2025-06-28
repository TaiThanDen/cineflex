import * as request from '@/lib/request';
import { type LoginCredentials } from '@/lib/types/LoginCredentials';
import { type RegisterCredential } from './types/RegisterCredential';
import type { Account } from './types/Account';
import type { Show } from './types/Show';
import type { Season } from './types/Season';
import type { Episode } from './types/Episode';
import type { Genre } from './types/Genre';
import type { Comment } from './types/Comment';
import type { BillingDetail } from './types/BillingDetail';


export const login = async (credentials: LoginCredentials) : Promise<string> => {
    const auth = await request.post<LoginCredentials, string>('authentication/login', credentials);

    return auth;
}

export const register = async (credentials: RegisterCredential) : Promise<string> => {
    const email = await request.post<RegisterCredential, string>('authentication/register', credentials);

    return email;
}

export const me = async () : Promise<Account> => {
    const account = await request.get<Account>('authentication/profile');

    return account; 
}

export const getShowById = async (id: string) : Promise<Show> => {
    const show = await request.get<Show>(`shows/${id}`);

    return show;
}

export const getSeasonsByShowId = async (id: string) : Promise<Season[]> => {
    const seasons = await request.get<Season[]>(`shows/${id}/seasons`);

    seasons.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));

    return seasons;
}

export const getEpisodesBySeasonId = async (id: string) : Promise<Episode[]> => {
    const episodes = await request.get<Episode[]>(`seasons/${id}/episodes`);

    episodes.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));

    return episodes;
}

export const getSeasonById = async (id: string) : Promise<Season> => {
    const season = await request.get<Season>(`seasons/${id}`);

    return season;
}

export const getEpisodeById = async (id: string) : Promise<Episode> => {
    const episode = await request.get<Episode>(`episodes/${id}`);

    return episode;
}

export const getGenresByShow = async (id: string) : Promise<Genre[]> => {
    const genres = await request.get<Genre[]>(`shows/${id}/genres`);

    return genres;
}

export const getShowsByGenres = async (...genres: string[]) : Promise<Show[]> => {
    const uri = `shows?${
        genres.map((g) => {
            return `genres=${g}`
        }).join('&')
    }`;

    const shows = await request.get<Show[]>(uri);

    return shows;
}

export const getCommentByEpisodes = async (episode: string) : Promise<Comment[]> => {
    const uri = `episodes/${episode}/comments`;

    const comments = await request.get<Comment[]>(uri);

    comments.reverse();

    return comments;
}

export const getUserById = async (id: string) : Promise<Account> => {
    const uri = `users/${id}`;

    const user = await request.get<Account>(uri);
    
    return user;
}

export const postComment = async (content: string, episode: string) : Promise<Comment> => {
    const uri = `comments/${episode}`;

    interface CommentRequest {
        content: string
    }

    const comment = await request.post<CommentRequest, Comment>(uri, {
        content: content
    });

    return comment
}

export const getAllShows = async (): Promise<Show[]> => {
    const shows = await request.get<Show[]>('shows');

    return shows;
}

// ================ EPISODE MANAGEMENT APIs ================

// Thêm episode mới vào season
export const addEpisodeToSeason = async (seasonId: string, episodeData: {
    title: string;
    number: string;
    description: string;
    url: string;
    releaseDate: string;
    duration: number;
    openingStart?: number;
    openingEnd?: number;
}): Promise<Episode> => {
    const episode = await request.post<typeof episodeData, Episode>(
        `seasons/${seasonId}/episodes`, 
        episodeData
    );

    return episode;
}

// Cập nhật episode
export const updateEpisode = async (episodeId: string, episodeData: {
    title: string;
    number: string;
    description: string;
    url: string;
    releaseDate: string;
    duration: number;
    openingStart?: number;
    openingEnd?: number;
}): Promise<Episode> => {
    const episode = await request.put<typeof episodeData, Episode>(
        `episodes/${episodeId}`, 
        episodeData
    );

    return episode;
}

// Xóa episode
export const deleteEpisode = async (episodeId: string): Promise<void> => {
    await request.del<void>(`episodes/${episodeId}`);
}

// ================ SEASON MANAGEMENT APIs ================

// Thêm season mới vào show
export const addSeasonToShow = async (showId: string, seasonData: {
    title: string;
    releaseDate: string;
    description: string;
}): Promise<Season> => {
    const season = await request.post<typeof seasonData, Season>(
        `shows/${showId}/seasons`, 
        seasonData
    );

    return season;
}

// Cập nhật season
export const updateSeason = async (seasonId: string, seasonData: {
    title: string;
    releaseDate: string;
    description: string;
    show?: string;
}): Promise<Season> => {
    const season = await request.put<typeof seasonData, Season>(
        `seasons/${seasonId}`, 
        seasonData
    );

    return season;
}

// Xóa season
export const deleteSeason = async (seasonId: string): Promise<void> => {
    await request.del<void>(`seasons/${seasonId}`);
}

// ================ SHOW MANAGEMENT APIs ================

// Thêm show mới
export const addShow = async (showData: {
    title: string;
    description: string;
    releaseDate: string;
    thumbnail: string;
    onGoing: boolean;
    isSeries: boolean;
    ageRating: string;
}): Promise<Show> => {
    const show = await request.post<typeof showData, Show>(
        'shows', 
        showData
    );

    return show;
}

// Cập nhật show
export const updateShow = async (showId: string, showData: {
    title: string;
    description: string;
    releaseDate: string;
    thumbnail: string;
    onGoing: boolean;
    isSeries: boolean;
    ageRating: string;
}): Promise<Show> => {
    const show = await request.put<typeof showData, Show>(
        `shows/${showId}`, 
        showData
    );

    return show;
}

// Xóa show
export const deleteShow = async (showId: string): Promise<void> => {
    await request.del<void>(`shows/${showId}`);
}

// Thêm genres cho show
export const addGenresToShow = async (showId: string, genreIds: string[]): Promise<Genre[]> => {
    const genres = await request.post<{ genres: string[] }, Genre[]>(
        `shows/${showId}/genres`, 
        { genres: genreIds }
    );

    return genres;
}

export const createOrder = async () : Promise<BillingDetail> => {
    const uri = `orders`;

    return await request.post<void, BillingDetail>(uri);
}

export const getBillingDetail = async (id: string) : Promise<BillingDetail> => {
    const uri = `orders/${id}`;

    return await request.get<BillingDetail>(uri);
}