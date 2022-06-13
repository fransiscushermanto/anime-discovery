import { AnimeMediaModel } from "api-hooks/anime";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Collection {
  name: string;
  animes?: AnimeMediaModel[];
}

interface AnimeCollectionContextProps {
  collections: Collection[];
  addCollection: (args: { name: string; animes?: AnimeMediaModel[] }) => void;
  deleteCollection: (name: string) => void;
  addAnimeToCollection: (
    collectionName: string,
    anime: AnimeMediaModel,
  ) => void;
  getAnimeCollections: (animeId: number) => { name: string }[];
  deleteAnimeFromCollection: (collectionName: string, animeId: number) => void;
}

interface AnimeCollectionProviderProps {
  children: React.ReactNode;
}

const AnimeCollectionContext = createContext<AnimeCollectionContextProps>({
  collections: [],
  addCollection: () => {},
  deleteCollection: () => {},
  addAnimeToCollection: () => {},
  getAnimeCollections: () => [],
  deleteAnimeFromCollection: () => {},
});

function AnimeCollectionProvider({ children }: AnimeCollectionProviderProps) {
  const [collections, setCollections] = useState<Collection[]>([]);

  const addCollection = useCallback(
    ({ name, animes = [] }: { name: string; animes?: AnimeMediaModel[] }) => {
      const _collections = [...collections];
      _collections.push({ name, animes });
      setCollections(_collections);
      window.localStorage.setItem("collections", JSON.stringify(_collections));
    },
    [collections],
  );

  const deleteCollection = useCallback(
    (name: string) => {
      const _collections = [...collections];
      _collections.splice(
        _collections.findIndex((collection) => collection.name === name),
        1,
      );
      setCollections(_collections);
      window.localStorage.setItem("collections", JSON.stringify(_collections));
    },
    [collections],
  );

  const addAnimeToCollection = useCallback(
    (collectionName: string, anime: AnimeMediaModel) => {
      const _collections = [...collections];
      _collections
        .find((collection) => collection.name === collectionName)!
        .animes!.push(anime);
      setCollections(_collections);
      window.localStorage.setItem("collections", JSON.stringify(_collections));
    },
    [collections],
  );

  const deleteAnimeFromCollection = useCallback(
    (collectionName: string, animeId: number) => {
      const _collections = [...collections];
      const index = _collections.findIndex(
        (collection) => collection.name === collectionName,
      );
      const filtered = _collections
        .find((collection) => collection.name === collectionName)
        .animes.filter((anime) => anime.id !== animeId);

      _collections[index].animes = filtered;
      setCollections(_collections);
      window.localStorage.setItem("collections", JSON.stringify(_collections));
    },
    [collections],
  );

  const getAnimeCollections = useCallback(
    (animeId: number) => {
      const _collections = [...collections];
      return _collections
        .filter((collection) =>
          collection.animes.some((anime) => anime.id === animeId),
        )
        .map((collection) => ({ name: collection.name }));
    },
    [collections],
  );

  useEffect(() => {
    const savedCollections = window.localStorage.getItem("collections");
    if (savedCollections) {
      setCollections(JSON.parse(savedCollections));
    }
  }, []);

  return (
    <AnimeCollectionContext.Provider
      value={{
        collections,
        addCollection,
        deleteCollection,
        addAnimeToCollection,
        getAnimeCollections,
        deleteAnimeFromCollection,
      }}
    >
      {children}
    </AnimeCollectionContext.Provider>
  );
}

function useAnimeCollections() {
  return useContext(AnimeCollectionContext);
}

export { AnimeCollectionProvider, useAnimeCollections };
