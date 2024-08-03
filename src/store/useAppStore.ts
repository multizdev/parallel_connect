import { create } from "zustand";

export type CurrentUser = {
  id: number;
  name: string;
  email: string;
  echelon_id: string;
  wallet_address: string;
};

export type NFTMetadata = {
  name: string;
  description: string;
};

export type NFTToken = {
  metadata: NFTMetadata;
  token_id: string;
  token_uri: string;
};

export interface Attribute {
  key: string;
  trait_type: string;
  value: string;
}

export interface NFT {
  name: string;
  description: string;
  external_url: string;
  token_id: number;
  attributes: Attribute[];
  image: string;
}

type State = {
  metaMaskAccount: string | null;
  currentUser: CurrentUser | null;
  userNFTList: NFT[];
  revealCards: boolean;
};

type Actions = {
  setMetaMaskAccount: (account: string | null) => void;
  setCurrentUser: (currentUser: CurrentUser | null) => void;
  setUserNFTList: (list: NFT[]) => void;
  setRevealCards: (state: boolean) => void;
};

const defaultState: State = {
  metaMaskAccount: null,
  currentUser: null,
  userNFTList: [],
  revealCards: false,
};

const useAppStore = create<State & Actions>()((set) => ({
  ...defaultState,
  setMetaMaskAccount: (account: string | null) =>
    set(() => ({ metaMaskAccount: account })),
  setCurrentUser: (currentUser: CurrentUser | null) =>
    set(() => ({ currentUser })),
  setUserNFTList: (list: NFT[]) => set(() => ({ userNFTList: list })),
  setRevealCards: (state: boolean) => set(() => ({ revealCards: state })),
}));

export default useAppStore;
