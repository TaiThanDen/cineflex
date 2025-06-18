import * as request from '@/lib/request';
import { type LoginCredentials } from '@/lib/types/LoginCredentials';
import { type RegisterCredential } from './types/RegisterCredential';
import type { Account } from './types/Account';
import type { Show } from './types/Show';
import type { Season } from './types/Season';
import type { Episode } from './types/Episode';


export const login = async (credentials: LoginCredentials) : Promise<string> => {
    const auth = await request.post<LoginCredentials, string>('authentication/login', credentials);

    return auth;
}

export const register = async (credentials: RegisterCredential) : Promise<string> => {
    const account = await request.post<RegisterCredential, Account>('authentication/register', credentials);

    return account.email;
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