import target1200 from "../public/json/target1200.json";
import target1900 from "../public/json/target1900.json";

export interface Word {
  id: number;
  eng: string;
  jpn: string;
}

export interface WordBook {
  words: Word[];
  title: string;
}

function jsonToWords(json: any): Word[] {
  return json.map((word: any) => {
    return {
      id: word.id,
      eng: word.english,
      jpn: word.japanese,
    };
  });
}

export const wordBooks: WordBook[] = [
  {
    title: "ターゲット1200",
    words: jsonToWords(target1200),
  },
  {
    title: "ターゲット1900",
    words: jsonToWords(target1900),
  },
];