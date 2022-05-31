import {
  createContext,
  useCallback,
  useContext,
  ReactNode,
  useState,
} from 'react';

import { words } from '../assets/words';
import { WordsKey } from '../components/LessonOneWrapper';

interface LessonOneContextData {
  dropzoneModifier: string | null;
  catchDropzoneModifier: (className: string) => void;
  nextAnimal: () => void;
  previousAnimal: () => void;
  animal: WordsKey;
}

interface LessonOneProviderProps {
  children: ReactNode;
}

const LessonOneContext = createContext<LessonOneContextData>(
  {} as LessonOneContextData
);

const LessonOneProvider = ({ children }: LessonOneProviderProps) => {
  const [dropzoneModifier, setDropzoneModifier] = useState<string | null>(null);
  const [animal, setAnimal] = useState<WordsKey>('Bode');
  const [index, setIndex] = useState<number>(0);

  const catchDropzoneModifier = useCallback((className: string) => {
    console.log('catchDropzoneModifier', className);
    setDropzoneModifier(className);
  }, []);

  const nextAnimal = useCallback(() => {
    const animals = Object.keys(words);
    const nextIndex = index + 1;

    if (nextIndex < animals.length) {
      let nextAnimal = animals[nextIndex];
      setAnimal(nextAnimal as WordsKey);
      setIndex(nextIndex);
    }
  }, [index]);

  const previousAnimal = useCallback(() => {
    const animals = Object.keys(words);
    const previousIndex = index - 1;
    if (previousIndex >= 0) {
      let previousAnimal = animals[previousIndex];
      setAnimal(previousAnimal as WordsKey);
      setIndex(previousIndex);
    }
  }, [index]);

  return (
    <LessonOneContext.Provider
      value={{
        dropzoneModifier,
        catchDropzoneModifier,
        nextAnimal,
        previousAnimal,
        animal,
      }}
    >
      {children}
    </LessonOneContext.Provider>
  );
};

function useLessonOne(): LessonOneContextData {
  const context = useContext(LessonOneContext);

  if (!context) {
    throw new Error('useLessonOne must be used within an LessonOneProvider');
  }

  return context;
}

export { LessonOneProvider, useLessonOne };
