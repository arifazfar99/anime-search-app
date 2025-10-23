/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import jikanApi from "@/api/jikanApi";
import type { AnimeResponse } from "@/types/anime";

let cancelTokenSource: any;

const handleApiError = (error: unknown): string => {
    if (axios.isCancel(error)) {
        return "Request cancelled due to new search input."
    } else if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        if (axiosError.response) {
            return `API Error: ${axiosError.response.status} ${axiosError.response.statusText}`
        } else if (axiosError.request) {
            return "Network Error: Unable to reach the server."
        } else {
            return `Unexpected Error: ${axiosError.message}`
        }
    } else {
        return "An unknown error occurred."
    }
}

export const fetchAnimeByPopular = createAsyncThunk<
    AnimeResponse,
    { page: number; limit: number },
    { rejectValue: string }
>("anime/fetchAnimeByPopular", async ({ page, limit }, { rejectWithValue }) => {
    try {
        const response = await jikanApi.get(`/top/anime`, {
            params: { page, limit, sfw: true },
        })

        if (!response.data) {
            throw new Error("Invalid API response.")
        }

        return response.data as AnimeResponse
    } catch (error) {
        const message = handleApiError(error)
        return rejectWithValue(message)
    }
})

export const fetchAnimeBySearch = createAsyncThunk<
    AnimeResponse,
    { 
        query: string; 
        page: number; 
        limit: number; 
    },
    { rejectValue: string }
>("anime/fetchAnimeBySearch", async (params, { rejectWithValue }) => {
    const { query, page, limit } = params

    try {
        if (cancelTokenSource) {
            cancelTokenSource.cancel("Cancelled due to new request")
        }
        cancelTokenSource = axios.CancelToken.source()

        const response = await jikanApi.get(`/anime`, {
            params: { 
                q: query || "",
                page,
                limit,
                sfw: true,
            },
            cancelToken: cancelTokenSource.token,
        })

        if (!response.data) {
            throw new Error("Invalid API response.")
        }

        return response.data as AnimeResponse
    } catch (error) {
        const message = handleApiError(error)
        return rejectWithValue(message)
    }
})

export const fetchAnimeDetails = createAsyncThunk<
    any,
    string,
    { rejectValue: string }
>("anime/fetchAnimeDetails", async (id, { rejectWithValue }) => {
    try {
        const response = await jikanApi.get(`/anime/${id}`)

        if (!response.data?.data) {
            throw new Error("Invalid anime data received.")
        }

        return response.data.data
    } catch (error) {
        const message = handleApiError(error)
        return rejectWithValue(message)
    }
})
