import http from '@/lib/request';
import { type LoginCredentials } from '@/lib/types/LoginCredentials';
import { type RegisterCredential } from './types/RegisterCredential';
import type { Account } from './types/Account';
import type { Show } from './types/Show';
import type { Season } from './types/Season';
import type { Episode } from './types/Episode';
import type { Genre } from './types/Genre';
import type { Comment } from './types/Comment';
import type { BillingDetail } from './types/BillingDetail';
import type { Subscription } from './types/Subscription';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import ApiException from './exceptions/ApiException';
import type { EpisodeCredentials } from './types/EpisodeCredentials';
import type { SeasonCredentials } from './types/SeasonCredentials';
import type { ShowCredentials } from './types/ShowCredentials';

const handle = (e: unknown) : ApiException => {
    if (axios.isAxiosError(e)) {
        return new ApiException(e.response?.status, e.message);
    }
    else {
        return new ApiException(400, "Unknown error");
    }
}

export const login = async (credentials: LoginCredentials) : Promise<string> => {
    try {
        const rsp = await http.post<string, AxiosResponse<string, LoginCredentials>>("/authentication/login", credentials);
        const data = rsp.data;

        return data
    }
    catch (e) {
        throw handle(e);
    }
}

export const register = async (credentials: RegisterCredential) : Promise<string> => {
    try {
        const rsp = await http.post<string, AxiosResponse<string, RegisterCredential>>("/authentication/register", credentials);
        const data = rsp.data;

        return data
    }
    catch (e) {
        throw handle(e);
    }
}

export const me = async () : Promise<Account> => {
    try {
        const rsp = await http.get<Account>("/authentication/profile");
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getShowById = async (id: string, page: number = 0, size: number = 12) : Promise<Show> => {
    try {
        const rsp = await http.get<Show>(`/shows/${id}?page=${page}&size=${size}`);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getSeasonsByShowId = async (id: string, page: number = 0, size: number = 12) : Promise<Season[]> => {
    try {
        const rsp = await http.get<Season[]>(`/shows/${id}/seasons?page=${page}&size=${size}`);
        const data = rsp.data;
        
        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getEpisodesBySeasonId = async (id: string, page: number = 0, size: number = 12) : Promise<Episode[]> => {
    try {
        const rsp = await http.get<Episode[]>(`/seasons/${id}/episodes?page=${page}&size=${size}`);
        const data= rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getSeasonById = async (id: string) : Promise<Season> => {
    try {
        const rsp = await http.get<Season>(`/seasons/${id}`);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getEpisodeById = async (id: string) : Promise<Episode> => {
    try {
        const rsp = await http.get<Episode>(`/episodes/${id}`);
        const data = rsp.data


        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getGenresByShow = async (id: string) : Promise<Genre[]> => {
    try {
        const rsp = await http.get<Genre[]>(`/shows/${id}/genres`);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getShowsByGenres = async (...genres: string[]) : Promise<Show[]> => {
    const uri = `/shows?${
        genres.map((g) => {
            return `genres=${g}`
        }).join('&')
    }`;

    try {
        const rsp = await http.get<Show[]>(uri);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getCommentByEpisodes = async (episode: string, page: number = 0, size: number = 12) : Promise<Comment[]> => {
    const uri = `/episodes/${episode}/comments?page=${page}&size=${size}`;

    try {
        const rsp = await http.get<Comment[]>(uri);
        const data = rsp.data

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getUserById = async (id: string) : Promise<Account> => {
    const uri = `/users/${id}`;
    
    try {
        const rsp = await http.get<Account>(uri);
        const data = rsp.data;


        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const postComment = async (content: string, episode: string) : Promise<Comment> => {
    const uri = `/episodes/${episode}/comments`;

    interface CommentRequest {
        content: string
    }

    try {
        const rsp = await http.post<CommentRequest, AxiosResponse<Comment>, CommentRequest>(uri, {
            content: content
        });
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getAllShows = async (page: number = 0, size: number = 12): Promise<{totalPage: number, data: Show[]}> => {
    try {
        const rsp = await http.get<Show[]>(`/shows?page=${page}&size=${size}`);
        const data = rsp.data;

        const totalPage = +rsp.headers["x-total-page"];

        console.log(totalPage);

        return {
            totalPage: totalPage,
            data: data
        };
    }
    catch (e) {
        throw handle(e);
    }
}

// ================ EPISODE MANAGEMENT APIs ================

// Thêm episode mới vào season
export const addEpisodeToSeason = async (seasonId: string, episodeData: EpisodeCredentials): Promise<Episode> => {
    try {
        const rsp = await http.post<Episode, AxiosResponse<Episode>, EpisodeCredentials>(
            `/seasons/${seasonId}/episodes`, 
            episodeData
        );
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

// Cập nhật episode
export const updateEpisode = async (episodeId: string, episodeData: EpisodeCredentials): Promise<Episode> => {
    try {
        const rsp = await http.put<Episode, AxiosResponse<Episode>, EpisodeCredentials>(
            `/episodes/${episodeId}`, 
            episodeData
        );
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

// Xóa episode
export const deleteEpisode = async (episodeId: string): Promise<void> => {
    try {
        await http.delete(`episodes/${episodeId}`);
    }
    catch (e) {
        throw handle(e);
    }
}

// ================ SEASON MANAGEMENT APIs ================

// Thêm season mới vào show
export const addSeasonToShow = async (showId: string, seasonData: SeasonCredentials): Promise<Season> => {
    try {
        const season = await http.post<Season, AxiosResponse<Season>, SeasonCredentials>(
            `/shows/${showId}/seasons`, 
            seasonData
        );
        const data = season.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

// Cập nhật season
export const updateSeason = async (seasonId: string, seasonData: SeasonCredentials): Promise<Season> => {
    try {
        const rsp = await http.put<Season, AxiosResponse<Season>, SeasonCredentials>(
            `/seasons/${seasonId}`, 
            seasonData
        );
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

// Xóa season
export const deleteSeason = async (seasonId: string): Promise<void> => {
    try {
        await http.delete(`/seasons/${seasonId}`);
    }
    catch (e) {
        throw handle(e);
    }
}

// ================ SHOW MANAGEMENT APIs ================

// Thêm show mới
export const addShow = async (showData: ShowCredentials): Promise<Show> => {
    try {
        const rsp = await http.post<Show, AxiosResponse<Show>, ShowCredentials>(
            '/shows', 
            showData
        );

        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

// Cập nhật show
export const updateShow = async (showId: string, showData: ShowCredentials): Promise<Show> => {
    try {
        const rsp = await http.put<Show, AxiosResponse<Show>, ShowCredentials>(
            `shows/${showId}`, 
            showData
        );
        const data = rsp.data

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

// Xóa show
export const deleteShow = async (showId: string): Promise<void> => {
    try {
        await http.delete(`/shows/${showId}`);
    }
    catch (e) {
        throw handle(e);
    }
}

// Thêm genres cho show
export const addGenresToShow = async (showId: string, genreIds: string[]): Promise<Genre[]> => {
    try {
        const rsp = await http.post<Genre[], AxiosResponse<Genre[]>, { genres: string[] }>(
            `/shows/${showId}/genres`, 
            { genres: genreIds }
        );
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const createOrder = async () : Promise<BillingDetail> => {
    const uri = `/orders`;

    try {
        const rsp = await http.post<BillingDetail, AxiosResponse<BillingDetail>, void>(uri);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getBillingDetail = async (id: string) : Promise<BillingDetail> => {
    const uri = `/orders/${id}`;

    try {
        const rsp = await http.get<BillingDetail, AxiosResponse<BillingDetail>>(uri);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getUserRole = async () : Promise<number> => {
    const uri = `authentication/role`;
    try {
        const rsp = await http.get<number, AxiosResponse<number>>(uri);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e)
    }
}

export const getCurrentUserSubscription = async () : Promise<Subscription> => {
    const uri = `users/subscription`;

    try {
        const rsp = await http.get<Subscription, AxiosResponse<Subscription>>(uri);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const isCurrentUserHasSubscription = async () : Promise<boolean> => {
    const subscription: Subscription = await getCurrentUserSubscription();

    return !isObjectEmpty(subscription);
}

const isObjectEmpty = <T>(object: T) : boolean => {
    return JSON.stringify(object) !== '{}';
}