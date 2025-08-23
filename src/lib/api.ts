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
import type { UpdateAccountCredentials } from './types/UpdateAccountCredentials';
import type { Hirer } from './types/Hirer';
import type { HirerCredentials } from './types/HirerCredentials';
import type { Advertisement } from './types/Advertisement';
import type { AdvertisementCredentials } from './types/AdvertisementCredentials';
import type { ReportComment } from './types/ReportComment';
import type { ViewHistory } from './types/ViewHistory';
import type { CommentSection } from './types/CommentSection';
import type { ResetPasswordField } from './types/ResetPasswordField';
import type { ShowQuery } from './types/ShowQuery';

// import type { Favorite } from './types/Favorite';

const handle = (e: unknown): ApiException => {
    if (axios.isAxiosError(e)) {
        return new ApiException(e.response?.status, e.message);
    }
    else {
        return new ApiException(400, "Unknown error");
    }
}

export const login = async (credentials: LoginCredentials): Promise<string> => {
    try {
        const rsp = await http.post<string, AxiosResponse<string, LoginCredentials>>("/authentication/login", credentials);
        const data = rsp.data;

        return data
    }
    catch (e) {
        throw handle(e);
    }
}

export const register = async (credentials: RegisterCredential): Promise<string> => {
    try {
        const rsp = await http.post<string, AxiosResponse<string, RegisterCredential>>("/authentication/register", credentials);
        const data = rsp.data;

        return data
    }
    catch (e) {
        throw handle(e);
    }
}

export const me = async (): Promise<Account> => {
    try {
        const rsp = await http.get<Account>("/authentication/profile");
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getShowById = async (id: string, page: number = 0, size: number = 12): Promise<Show> => {
    try {
        const rsp = await http.get<Show>(`/shows/${id}?page=${page}&size=${size}`);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getSeasonsByShowId = async (id: string, page: number = 0, size: number = 12): Promise<Season[]> => {
    try {
        const rsp = await http.get<Season[]>(`/shows/${id}/seasons?page=${page}&size=${size}`);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getEpisodesBySeasonId = async (id: string, page: number = 0, size: number = 12): Promise<Episode[]> => {
    try {
        const rsp = await http.get<Episode[]>(`/seasons/${id}/episodes?page=${page}&size=${size}`);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getSeasonById = async (id: string): Promise<Season> => {
    try {
        const rsp = await http.get<Season>(`/seasons/${id}`);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getEpisodeById = async (id: string): Promise<Episode> => {
    try {
        const rsp = await http.get<Episode>(`/episodes/${id}`);
        const data = rsp.data


        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getGenresByShow = async (id: string): Promise<Genre[]> => {
    try {
        const rsp = await http.get<Genre[]>(`/shows/${id}/genres`);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getShowsByGenres = async (...genres: string[]): Promise<Show[]> => {
    console.log(genres);
    const uri = `/shows?page=0&size=100`;

    try {
        const rsp = await http.get<Show[]>(uri);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getCommentByEpisodes = async (episode: string, page: number = 0, size: number = 12): Promise<Comment[]> => {
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

export const getCommentBySection = async (section: string, page: number = 0, size: number = 12, deleted: boolean = false): Promise<{
    data: Comment[],
    totalPage: number
}> => {
    const uri = `/comments/sections/${section}${deleted ? '/deleted' : ''}?page=${page}&size=${size}`;

    try {
        const rsp = await http.get<Comment[]>(uri);
        const data = rsp.data
        const totalPage = +rsp.headers["x-total-page"];

        return {
            totalPage: totalPage,
            data: data
        };
    }
    catch (e) {
        throw handle(e);
    }
}

export const getUserById = async (id: string): Promise<Account> => {
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

export const postComment = async (content: string, section: string): Promise<Comment> => {
    const uri = `/comments/sections/${section}`;

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

export const getAllShows = async (page: number = 0, size: number = 12): Promise<{ totalPage: number, data: Show[] }> => {
    try {
        const rsp = await http.get<Show[]>(`/shows?page=${page}&size=${size}`);
        const data = rsp.data;

        const totalPage = +rsp.headers["x-total-page"];


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
        const rsp = await http.put<Genre[], AxiosResponse<Genre[]>, { genres: string[] }>(
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

export const createOrder = async (): Promise<BillingDetail> => {
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

export const getBillingDetail = async (id: string): Promise<BillingDetail> => {
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

export const getUserRole = async (): Promise<number> => {
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

export const getCurrentUserSubscription = async (): Promise<Subscription> => {
    const uri = `/users/subscription`;

    try {
        const rsp = await http.get<Subscription, AxiosResponse<Subscription>>(uri);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const sendVerificationEmail = async (email: string): Promise<void> => {
    interface SendEmailCredentials {
        email: string
    }

    const uri = "/authentication/verify"

    try {
        await http.post<void, AxiosResponse<void, SendEmailCredentials>, SendEmailCredentials>(uri, {
            email: email
        })
    }
    catch (e) {
        throw handle(e)
    }
}

export const isCurrentUserHasSubscription = async (): Promise<boolean> => {
    const subscription: Subscription = await getCurrentUserSubscription();

    return isObjectEmpty(subscription);
}

const isObjectEmpty = <T>(object: T): boolean => {
    return JSON.stringify(object) !== '""';
}

export const getAccountPaginated = async (page: number = 0, size: number = 6): Promise<{
    totalPage: number,
    data: Account[]
}> => {
    try {
        const rsp = await http.get<Account[]>(`/users?page=${page}&size=${size}`);
        const data = rsp.data;

        const totalPage = +rsp.headers["x-total-page"];

        console.log(data);

        return {
            totalPage: totalPage,
            data: data
        };
    }
    catch (e) {
        throw handle(e)
    }
}

export const updateAccount = async (accountCreentials: UpdateAccountCredentials, id: string): Promise<Account> => {
    try {
        const rsp = await http.put<Account, AxiosResponse<Account, UpdateAccountCredentials>>(`/users/${id}`, accountCreentials);
        const data = rsp.data

        return data
    }
    catch (e) {
        throw handle(e)
    }
}

export const banAccount = async (id: string): Promise<void> => {
    try {
        await http.put(`/users/${id}/ban`)
    }
    catch (e) {
        throw handle(e)
    }
}

export const unbanAccount = async (id: string): Promise<void> => {
    try {
        await http.put(`/users/${id}/unban`)
    }
    catch (e) {
        throw handle(e)
    }
}

export const createHirer = async (body: HirerCredentials): Promise<Hirer> => {
    try {
        const rsp = await http.post<Hirer, AxiosResponse<Hirer, HirerCredentials>, HirerCredentials>('/hirers', body);
        const data = rsp.data;

        return data
    }
    catch (e) {
        throw handle(e)
    }
}

export const getAllHirers = async (page: number = 0, size: number = 5): Promise<{
    totalPage: number,
    data: Hirer[]
}> => {
    try {
        const rsp = await http.get<Hirer[], AxiosResponse<Hirer[], void>>(`/hirers?page=${page}&size=${size}`);
        const data = rsp.data;

        const totalPage = +rsp.headers["x-total-page"];

        return {
            totalPage: totalPage,
            data: data
        };
    }
    catch (e) {
        throw handle(e);
    }
}

export const getHirerById = async (id: string): Promise<Hirer> => {
    try {
        const rsp = await http.get<Hirer, AxiosResponse<Hirer, void>>(`/hirers/${id}`);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getAllAds = async (page: number = 0, size: number = 5): Promise<{
    data: Advertisement[],
    totalPage: number
}> => {
    try {
        const rsp = await http.get<Advertisement[], AxiosResponse<Advertisement[], null>>(`/advertisements?page=${page}&size=${size}`);
        const data = rsp.data;

        const totalPage = +rsp.headers["x-total-page"];

        return {
            data: data,
            totalPage: totalPage
        }
    }
    catch (e) {
        throw handle(e);
    }
}

export const createAd = async (body: AdvertisementCredentials): Promise<Advertisement> => {
    try {
        const rsp = await http.post<Advertisement, AxiosResponse<Advertisement, AdvertisementCredentials>, AdvertisementCredentials>('/advertisements', body);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getAdsRandom = async (type: number): Promise<Advertisement> => {
    try {
        const rsp = await http.get<Advertisement>(`/advertisements/${type}/random`);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getPaginatedComments = async (page: number = 0, size: number = 5): Promise<{
    totalPage: number,
    data: Comment[]
}> => {
    try {
        const rsp = await http.get<Comment[]>(`/comments?page=${page}&size=${size}`)
        const data = rsp.data;

        const totalPage = +rsp.headers["x-total-page"];

        return {
            totalPage: totalPage,
            data: data
        }
    }
    catch (e) {
        throw handle(e);
    }
}

export const deleteComment = async (id: string): Promise<void> => {
    try {
        await http.delete(`/comments/${id}`)
    }
    catch (e) {
        throw handle(e)
    }
}

export const reportComment = async (id: string, content: string): Promise<void> => {
    try {
        await http.post(`comments/${id}/report`, {
            content: content
        })
    }
    catch (e) {
        throw handle(e)
    }
}

export const getPaginatedReportComments = async (page: number = 0, size: number = 5): Promise<{
    totalPage: number,
    data: ReportComment[]
}> => {
    try {
        const rsp = await http.get<ReportComment[]>(`/reports?page=${page}&size=${size}`)
        const data = rsp.data;

        const totalPage = +rsp.headers["x-total-page"];

        return {
            totalPage: totalPage,
            data: data
        }
    }
    catch (e) {
        throw handle(e);
    }
}

export const getCommentById = async (id: string): Promise<Comment> => {
    try {
        const rsp = await http.get<Comment>(`/comments/${id}`);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getAllGenres = async (): Promise<Genre[]> => {
    try {
        const rsp = await http.get<Genre[]>(`/genres`);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const saveViewHistory = async (duration: number, episode: string) => {
    try {
        await http.post(`/episodes/${episode}/view-history`, {
            duration: duration
        })
    }
    catch (e) {
        throw handle(e);
    }
}

export const getViewHistoryEpisode = async (episode: string): Promise<ViewHistory> => {
    try {
        const rsp = await http.get<ViewHistory>(`/users/view-history/${episode}`);
        const data = rsp.data;

        return data
    }
    catch (e) {
        throw handle(e);
    }
}

export const getViewHistory = async (page: number = 0, size: number = 6): Promise<{
    totalPage: number,
    data: ViewHistory[]
}> => {
    try {
        const rsp = await http.get<ViewHistory[]>(`/users/view-history?page=${page}&size=${size}`);
        const data = rsp.data;

        const totalPage = +rsp.headers["x-total-page"];

        return {
            totalPage: totalPage,
            data: data
        }
    }
    catch (e) {
        throw handle(e);
    }

}

export const getAccountsPremium = async (page: number = 0, size: number = 6): Promise<{
    totalPage: number,
    data: Account[]
}> => {
    try {
        const rsp = await http.get<Account[]>(`/users/premium?size=${size}&page=${page}`);
        const data = rsp.data;

        const totalPage = +rsp.headers["x-total-page"];

        return {
            totalPage: totalPage,
            data: data
        }
    }
    catch (e) {
        throw handle(e)
    }
}

export const getSubscriptionOfAccount = async (account: string): Promise<Subscription> => {
    const uri = `/users/${account}/subscription`;

    try {
        const rsp = await http.get<Subscription, AxiosResponse<Subscription>>(uri);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getBillingDetailsOfAccount = async (account: string, page: number = 0, size: number = 6): Promise<{
    data: BillingDetail[],
    totalPage: number
}> => {
    try {
        const rsp = await http.get<BillingDetail[]>(`/users/${account}/bills?size=${size}&page=${page}`);
        const data = rsp.data;

        const totalPage = +rsp.headers["x-total-page"];

        return {
            totalPage: totalPage,
            data: data
        }
    }
    catch (e) {
        throw handle(e)
    }
}

export const updateHirer = async (id: string, hirer: HirerCredentials): Promise<Hirer> => {
    try {
        const rsp = await http.put<Hirer, AxiosResponse<Hirer>, HirerCredentials>(
            `/hirers/${id}`,
            hirer
        );
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const updateAd = async (id: string, body: AdvertisementCredentials): Promise<Advertisement> => {
    try {
        const rsp = await http.put<Advertisement, AxiosResponse<Advertisement, AdvertisementCredentials>, AdvertisementCredentials>(`/advertisements/${id}`, body);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getCommentSection = async (id: string): Promise<CommentSection> => {
    try {
        const rsp = await http.get<CommentSection>(`/comments/sections/${id}/information`);
        const data = rsp.data

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const declineReport = async (id: string) => {
    try {
        await http.post<void>(`/comments/report/${id}/ignore`);
    }
    catch (e) {
        throw handle(e);
    }
}

export const approveReport = async (id: string) => {
    try {
        await http.post<void>(`/comments/report/${id}/approve`);
    }
    catch (e) {
        throw handle(e);
    }
}

export const getCommentSections = async (page: number = 0, size: number = 6): Promise<{
    totalPage: number,
    data: CommentSection[]
}> => {
    try {
        const rsp = await http.get<CommentSection[]>(`/comments/sections?page=${page}&size=${size}`);
        const data = rsp.data;

        const totalPage = +rsp.headers["x-total-page"];

        return {
            totalPage: totalPage,
            data: data
        }
    }
    catch (e) {
        throw handle(e);
    }

}

export const getEpisodeViewCount = async (id: string): Promise<number> => {
    try {
        const rsp = await http.get<number>(`/episodes/${id}/views`);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const increaseEpisodeViewCount = async (id: string): Promise<number> => {
    try {
        const rsp = await http.post<number>(`/episodes/${id}/views`);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const sendOtp = async (email: string): Promise<void> => {
    try {
        await http.post(`/authentication/send-otp`, {
            "email": email
        });
    }
    catch (e) {
        throw handle(e);
    }
}

export const resetPassword = async (body: ResetPasswordField): Promise<void> => {
    try {
        await http.post<void, AxiosResponse<void, ResetPasswordField>, ResetPasswordField>(`/authentication/reset-password`, body)
    }
    catch (e) {
        throw handle(e);
    }
}

export const isFavorite = async (show: string): Promise<boolean> => {
    try {
        const rsp = await http.get<boolean>(`/shows/${show}/is-favorite`);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getFavoriteCount = async (show: string): Promise<number> => {
    try {
        const rsp = await http.get<number>(`/shows/${show}/favorite`);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const favoriteShow = async (show: string): Promise<void> => {
    try {
        await http.post<void>(`/shows/${show}/favorite`)
    }
    catch (e) {
        throw handle(e);
    }
}

export const unfavoriteShow = async (show: string): Promise<void> => {
    try {
        await http.post<void>(`/shows/${show}/unfavorite`)
    }
    catch (e) {
        throw handle(e);
    }
}
/////
export const getEpisodeActualView = async (episode: string): Promise<number> => {
    try {
        const rsp = await http.get<number>(`/episodes/${episode}/views`);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}
/////
export const getEpisodeLike = async (episode: string): Promise<number> => {
    try {
        const rsp = await http.get<number>(`/episodes/${episode}/like`);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const unlikeEpisode = async (episode: string): Promise<void> => {
    try {
        await http.post<void>(`/episodes/${episode}/unlike`)
    }
    catch (e) {
        throw handle(e);
    }
}

export const isLiked = async (like: string): Promise<boolean> => {
    try {
        const rsp = await http.get<boolean>(`/episodes/${like}/is-liked`);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const likeEpisode = async (episode: string): Promise<void> => {
    try {
        await http.post<void>(`/episodes/${episode}/like`)
    }
    catch (e) {
        throw handle(e);
    }
}

export const getLikedEpisodesByUser = async (size: number = 20): Promise<{ totalPage: number, data: Episode[] }> => {
    try {
        const rsp = await http.get<Episode[]>(`/episodes/liked?page=${size}`);
        const data = rsp.data;
        const totalPage = +rsp.headers["x-total-page"];

        return {
            totalPage: totalPage,
            data: data
        };
    }
    catch (e) {
        throw handle(e);
    };
}

export const queryShow = async (query: ShowQuery, page: number = 0, size: number = 6): Promise<{
    totalPage: number,
    data: Show[]
}> => {
    try {
        let url = `/shows/query?`;

        const keyword = query.keyword;
        const genres = query.genres;
        const from = query.from;
        const to = query.to;
        const ageRating = query.ageRating;
        const series = query.series;

        url += `page=${page}&size=${size}`;

        if (keyword !== undefined) url += `&keyword=${keyword}`;

        if (from !== undefined) url += `&from=${from}`;

        if (to !== undefined) url += `&to=${to}`;

        if (ageRating !== undefined) url += `&ageRating=${encodeURIComponent(ageRating)}`;

        if (series !== undefined) url += `&series=${series}`;

        if (genres !== undefined) {
            const genreParam = "&"

            const genreQuery = genres.map((g) => {
                return `genres=${g}`
            }).join('&');


            url += genreParam + genreQuery;
        }
        console.log(url);

        const rsp = await http.get<Show[]>(url);

        const data = rsp.data;
        const totalPage = +rsp.headers["x-total-page"];

        return {
            totalPage: totalPage,
            data: data
        };
    }
    catch (e) {
        throw handle(e);
    }
}

export const addGenre = async (name: string): Promise<Genre> => {
    try {
        interface G {
            name: string
        }
        const rsp = await http.post<Genre, AxiosResponse<Genre, G>, G>('/genres', {
            name: name
        });

        const data = rsp.data;

        return data
    }
    catch (e) {
        throw handle(e);
    }
}

export const increaseShowViewCount = async (id: string): Promise<number> => {
    try {
        const rsp = await http.post<number>(`/shows/${id}/views`);
        const data = rsp.data;

        return data;
    }
    catch (e) {
        throw handle(e);
    }
}

export const getFavorites = async (page: number = 0, size: number = 10): Promise<{
    totalPage: number,
    data: Show[]
}> => {
    try {
        const rsp = await http.get<Show[]>(`/favorites?page=${page}&size=${size}`);
        const data = rsp.data;

        const totalPage = +rsp.headers["x-total-page"];

        return {
            totalPage: totalPage,
            data: data
        };
    }
    catch (e) {
        throw handle(e);
    }
}

export const getTopFavorites = async (
    page: number = 0,
    size: number = 10
): Promise<{
    totalPage: number;
    data: Show[];
}> => {
    try {
        const rsp = await http.get<Show[]>(`/favorites/top?page=${page}&size=${size}`);
        const data = rsp.data;

        const totalPage = +rsp.headers["x-total-page"];

        return {
            totalPage: totalPage,
            data: data,
        };
    } catch (e) {
        throw handle(e);
    }
};

