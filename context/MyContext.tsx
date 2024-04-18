import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

interface DetailsState {
  on: boolean;
  data: list | null;
  
}

interface list {
  id: number;
  name: string;
  surname: string;
  phone: number;
  address: string;
  email: string;
}

interface MyContextValue {
  details: DetailsState;
  setDetails: Dispatch<SetStateAction<DetailsState>>;
  edit: DetailsState;
  setEdit: Dispatch<SetStateAction<DetailsState>>;
  list: list[];
  setList: Dispatch<SetStateAction<list[]>>;
}

const MyContext = createContext<MyContextValue | undefined>(undefined);

interface MyProviderProps {
  children: ReactNode;
  initialState?: {
    details?: DetailsState;
    edit?: DetailsState;
    list?: list[];
  };
}

export function MyProvider({ children, initialState }: MyProviderProps) {
  // Utiliza initialState o valores predeterminados si no se proporciona initialState
  const [details, setDetails] = useState<DetailsState>(
    initialState?.details || {
      on: false,
      data: null,
     
    }
  );
  
  const [edit, setEdit] = useState<DetailsState>(
    initialState?.edit || {
      on: false,
      data: null,
    
    }
  );
  
  const [list, setList] = useState<list[]>(
    initialState?.list || []
  );

  return (
    <MyContext.Provider value={{ details, setDetails, list, setList, edit, setEdit }}>
      {children}
    </MyContext.Provider>
  );
}

export const useMyContext = (): MyContextValue => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};
