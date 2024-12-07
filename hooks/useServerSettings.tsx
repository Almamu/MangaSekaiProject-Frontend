import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STATE_KEY = "@Server:settings";
const DEFAULT_STATE: ServerSettingsType = {
  servers: [],
};

type ServerSettingsType = {
  servers: {
    address: string;
    token?: string;
    friendlyName?: string;
  }[];
  activeServerId?: number;
};
type ServerSettingsActions =
  | {
      type: "ADD_SERVER";
      payload: { address: string };
    }
  | { type: "SET_USER_TOKEN"; payload: { serverId: number; token: string } }
  | { type: "SET_STATE"; payload: ServerSettingsType }
  | { type: "SET_ACTIVE_SERVER"; payload: { serverId: number } }
  | { type: "REMOVE_SERVER"; payload: { serverId: number } };

type ServerSettingsContextType = {
  state: ServerSettingsType;
  actions: {
    addServer: (address: string) => void;
    removeServer: (serverId: number) => void;
    setToken: (serverId: number, token: string) => void;
    setActiveServer: (activeServerId: number) => void;
  };
};

export const ServerSettingsContext = createContext<ServerSettingsContextType>(
  {} as ServerSettingsContextType
);

function serverSettingsReducer(
  state: ServerSettingsType,
  action: ServerSettingsActions
): ServerSettingsType {
  switch (action.type) {
    case "ADD_SERVER":
      return {
        ...state,
        servers: [...state.servers, { ...action.payload }],
      };
    case "SET_USER_TOKEN":
      return {
        ...state,
        servers: [
          ...state.servers.slice(0, action.payload.serverId),
          {
            ...state.servers[action.payload.serverId],
            token: action.payload.token,
          },
          ...state.servers.slice(action.payload.serverId + 1),
        ],
      };
    case "SET_STATE":
      return {
        ...state,
        ...action.payload,
      };
    case "SET_ACTIVE_SERVER":
      return {
        ...state,
        activeServerId: action.payload.serverId,
      };
    case "REMOVE_SERVER":
      return {
        ...state,
        servers: state.servers.filter(
          (_, index) => index !== action.payload.serverId
        ),
        activeServerId:
          state.activeServerId && state.activeServerId > action.payload.serverId
            ? state.activeServerId - 1
            : state.activeServerId,
      };
    default:
      throw new Error("Unknown action type");
  }
}

export function ServerSettingsContextProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(serverSettingsReducer, DEFAULT_STATE);
  const actions = useMemo(
    () => ({
      addServer: (address: string) => {
        dispatch({ type: "ADD_SERVER", payload: { address } });
      },
      removeServer: (serverId: number) => {
        dispatch({ type: "REMOVE_SERVER", payload: { serverId } });
      },
      setToken: (serverId: number, token: string) => {
        dispatch({ type: "SET_USER_TOKEN", payload: { serverId, token } });
      },
      setActiveServer: (serverId: number) => {
        dispatch({
          type: "SET_ACTIVE_SERVER",
          payload: { serverId },
        });
      },
    }),
    []
  );
  const value = useMemo(() => ({ state, actions }), [state, actions]);

  useEffect(() => {
    const getState = async () => {
      const state = await AsyncStorage.getItem(STATE_KEY);

      if (!state) {
        return;
      }

      dispatch({ type: "SET_STATE", payload: JSON.parse(state) });
    };

    getState();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STATE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <ServerSettingsContext.Provider value={value}>
      {children}
    </ServerSettingsContext.Provider>
  );
}

export const useServerSettings = () => useContext(ServerSettingsContext);
