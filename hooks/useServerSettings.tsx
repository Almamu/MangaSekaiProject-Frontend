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
  | { type: "SET_ACTIVE_SERVER"; payload: { serverId: number } };

type ServerSettingsContextType = {
  state: ServerSettingsType;
  actions: {
    addServer: (address: string) => void;
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
        ...action.payload,
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
