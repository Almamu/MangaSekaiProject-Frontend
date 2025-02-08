import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

const STATE_KEY = "@Server:settings";
const DEFAULT_STATE: ServerSettingsType = {
  servers: [],
};

type ServerSettingsType = {
  servers: {
    guid: string;
    address: string;
    token?: string;
    friendlyName?: string;
  }[];
  activeServerGuid?: string;
};
type ServerSettingsActions =
  | {
      type: "ADD_SERVER";
      payload: { guid: string; address: string };
    }
  | { type: "SET_USER_TOKEN"; payload: { guid: string; token: string } }
  | { type: "SET_STATE"; payload: ServerSettingsType }
  | { type: "SET_ACTIVE_SERVER"; payload: { guid: string } }
  | { type: "REMOVE_SERVER"; payload: { guid: string } };

type ServerSettingsContextType = {
  state: ServerSettingsType;
  actions: {
    addServer: (address: string) => string;
    removeServer: (guid: string) => void;
    setToken: (guid: string, token: string) => void;
    setActiveServer: (guid: string) => void;
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
    case "SET_USER_TOKEN": {
      const index = state.servers.findIndex(
        (x) => x.guid === action.payload.guid
      );

      return {
        ...state,
        servers: [
          ...state.servers.slice(0, index),
          {
            ...state.servers[index],
            token: action.payload.token,
          },
          ...state.servers.slice(index + 1),
        ],
      };
    }
    case "SET_STATE":
      return {
        ...state,
        ...action.payload,
      };
    case "SET_ACTIVE_SERVER":
      return {
        ...state,
        activeServerGuid: action.payload.guid,
      };
    case "REMOVE_SERVER":
      return {
        ...state,
        servers: state.servers.filter(
          (server) => server.guid !== action.payload.guid
        ),
        activeServerGuid:
          state.activeServerGuid === action.payload.guid &&
          state.servers.length > 1
            ? state.servers[0].guid
            : undefined,
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
        const guid = uuidv4();

        dispatch({ type: "ADD_SERVER", payload: { address, guid } });

        return guid;
      },
      removeServer: (guid: string) => {
        dispatch({ type: "REMOVE_SERVER", payload: { guid } });
      },
      setToken: (guid: string, token: string) => {
        dispatch({ type: "SET_USER_TOKEN", payload: { guid, token } });
      },
      setActiveServer: (guid: string) => {
        dispatch({
          type: "SET_ACTIVE_SERVER",
          payload: { guid },
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
