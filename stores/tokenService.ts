import {create} from 'zustand';

interface Props {
    token: string;
    setToken: (val: string) => void
}

export const createTokenSlice = create<Props>(set => ({
  token: '',
  setToken: (token: string,) =>
    set(state => ({...state, token: token}))
}));
