import apisauce from 'apisauce';
import { AxiosResponse } from 'axios';
import Toast from 'react-native-simple-toast';
import * as types from '../Constants/types';

const create = (baseURL = 'http://api.ohmynote.com/') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      // 'Content-Type': 'application/json',
    },
    timeout: 5 * 60 * 1000,
  });

  const authenticate = ({ email, password }: any) => api.post('/rest-auth/login/', { email, password });

  const authenticateWithFB = (token: string) =>
    api.get(`/authenticate-by-token/facebook?access_token=${token}`);

  const authenticateWithGoogle = (token: string) =>
    api.get(`/authenticate-by-token/google-oauth2?access_token=${token}`);

  const authenticateWithApple = (token: string) =>
    api.get(`/authenticate-by-token/apple?access_token=${token}`);

  const getUser = (token: string) => {
    return api.get(
      '/clients/client/',
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
  };

  const getUserByIdAndToken = (id: string, token: string) =>
    api.get(
      `/clients/client/${id}`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
  //   https://react.ohmynote.com/clients/feed-search/?q=hamza
  const searchUsers = async (token: any, q: any) => {
    console.log(q, token);
    const res = await api.get(
      `/clients/feed-search/?q=${q}`, // /clients/client/
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    console.log(res);
    return res;
  };

  const updateUser = (token: any, id: string, user: object) =>
    api.patch(
      `/clients/client/${id}/`, // /authentication/profile/${id}
      user,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );

  const register = ({ email, firstName, lastName, password, language }: types.RegistrationPayload) =>
    api.post('/rest-auth/registration/', {
      email,
      first_name: firstName,
      last_name: lastName,
      password,
      language,
    });

  const signOff = ({ token }: any) => {
    return api
      .post(
        '/rest-auth/logout/',
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
            Referer: 'https://react.ohmynote.com/',
          },
        },
      )
      .then((res) => {
        return res.data;
      })
      .catch((e) => console.log('auth', e));
  };

  const requestResetPassword = ({ email }: any) => api.post('/rest-auth/password/reset/', { email });

  const confirmResetPassword = ({ password, passwordConfirm, uid, token }: any) => {
    return api
      .post('/rest-auth/password/reset/confirm/', {
        new_password1: password,
        new_password2: passwordConfirm,
        uid,
        token,
      })
      .then((res) => res.data)
      .catch((e) => console.log('auth', e));
  };

  const uploadStory = (story: any, token: string) =>
    api.post('/api/uploading/story/', story, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

  const uploadUserPhoto = (photo: any, token: any) =>
    api.post('/clients/photo/', photo, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

  const feedBack = (feed: any, token: any) =>
    api
      .post('/clients/app-rate/', feed, {
        headers: {
          Authorization: `Token ${token}`,
          //   'Content-Type': 'multipart/form-data'
        },
      })
      .then((res) => {
        return res;
      });

  const notesSelection = ({
    selected_notes,
    added_notes,
    id,
    token,
    latitude,
    longitude,
    mode,
    saved_recipe,
    recipe_name,
  }: {
    selected_notes: number[];
    added_notes: number[];
    id: number;
    token: string;
    latitude: number;
    longitude: number;
    mode: string[];
    saved_recipe: boolean;
    recipe_name: string;
  }) =>
    api.patch(
      `/api/uploading/suggestion/${id}/`,
      {
        selected_notes,
        added_notes,
        latitude,
        longitude,
        mode,
        saved_recipe,
        recipe_name,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );

  const getPerfumesByType = async (
    notes: types.Note[],
    id: number,
    token: string,
    latitude: number,
    longitude: number,
    mode: string[],
  ) => {
    const selectedNoteIds = notes.map((n) => n.pk);
    return await api.patch(
      `/api/uploading/suggestion/${id}/`,
      {
        notes: selectedNoteIds,
        latitude,
        longitude,
        mode,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
  };

  const updateCollection = (mode: any, id: number, token: any) =>
    api.post(
      '/clients/update-collection/',
      {
        mode,
        parfum_id: id,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );

  const setFollow = (mode: any, id: string, token: any) =>
    api.post(
      '/clients/update-followings/',
      {
        mode,
        client_id: id,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
  const setUserCollection = (mode: any, id: string, token: any) =>
    api.post(
      '/clients/update-myparfums/',
      {
        mode,
        parfum_id: id,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );

  const searchNote = (text: string, token: string) => {
    return api
      .get(
        `/api/ada/note/?search=${text}`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      )
      .then((res) => res.data);
  };

  const searchPerfume = (text: string, token: any) =>
    api
      .get(
        `/api/ada/?search=${text}`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      )
      .then((res) => {
        return res.data;
      })
      .catch((e) => console.log('search notes', e));

  const collection = ({ token }: any) =>
    api.get(
      '', // get collection URL
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );

  const getAllNotes = (token: string) => {
    return api
      .get(
        `/api/ada/note/?limit=1000`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      )
      .then((res) => res.data);
  };

  const getRecipes = ({ token }: any) =>
    api.get(
      '/clients/recipe/',
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );

  const getPerfume = async (perfumeId: number, token: string): Promise<types.Perfume> => {
    
    const response: AxiosResponse<types.Perfume> = (await api.get(
      `/api/perfumer/perfumer/${perfumeId}`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    )) as any;
    console.log(response);
    return response.data as types.Perfume;
  };

  return {
    authenticate,
    authenticateWithGoogle,
    authenticateWithApple,
    getPerfumesByType,
    searchPerfume,
    setUserCollection,
    setFollow,
    getUserByIdAndToken,
    searchUsers,
    updateCollection,
    uploadUserPhoto,
    feedBack,
    searchNote,
    updateUser,
    getUser,
    register,
    signOff,
    requestResetPassword,
    confirmResetPassword,
    uploadStory,
    notesSelection,
    authenticateWithFB,
    collection,
    getAllNotes,
    getRecipes,
    getPerfume,
  };
};
export default {
  create,
};
