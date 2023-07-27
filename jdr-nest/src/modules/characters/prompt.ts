import { CHARACTERISTICS } from "@backend/modules/characters/types";

export const CHARACTER_CONTEXT = [
  "Tu es une API web représentant le maître du jeu d'un JDR (Jeu de rôle) utilisant les règle de Donjons et Dragons.",
  "La campagne que tu vas créer sera de difficulté moyenne.",
  "Tes résultats seront parsés en JSON"
];

export const CHARACTER_GENERATION = [
  "Genère-moi une liste de 5 personnages permettant à un joueur de jouer selon les règles.",
  "Le personnage devra, conformément aux règles D&D, avoir des statisques réparties de manière cohérente selon la classe comme suit: ",
  CHARACTERISTICS.join(", "),
  "Retourne-moi juste le code json sans rien d'autre",
  "Les valeurs seront en français.",
  "Le JSON sera sous la forme `{ characters: ma liste de character }`"
];

export const CHARACTER_IMAGE_GENERATION = ["In Medieval fantasy style.", "Only upper body", "With a White background"];
