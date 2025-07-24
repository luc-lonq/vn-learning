import axios from "axios";
import config from "../../config.json";

const apiUrl = config.apiUrl
const apiToken = config.apiToken

export interface Word {
    id: number;
    vn: string;
    translation: string;
    success: number;
    fail: number;
    added_at: string;
}

const api = axios.create({
    baseURL: `${apiUrl}words`,
    timeout: 5000,
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${apiToken}`;

    return config;
}, (error) => {
    return Promise.reject(error);
});

export async function getAllWords(): Promise<Word[]> {
    const response = await api.get<Word[]>("/");
    return response.data;
}

export async function createWord(word: Omit<Word, "id" | "success" | "fail" | "added_at">): Promise<Word> {
    const response = await api.post<Word>("/", word);
    return response.data;
}

export async function addSuccess(word: Word): Promise<Word> {
    word.success += 1;
    const response = await api.put<Word>(`/${word.id}`, word);
    return response.data;
}

export async function addFail(word: Word): Promise<Word> {
    word.fail += 1;
    const response = await api.put<Word>(`/${word.id}`, word);
    return response.data;
}

export async function deleteWord(id: number): Promise<void> {
    await api.delete(`/${id}`);
}
