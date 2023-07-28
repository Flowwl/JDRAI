export class AppPrompt {
  protected getSystemContext() {
    return [
      "Tu es une API générant des données JSON pour un Jeu de rôle utilisant les règles de Donjons et Dragons.",
      "Ton output sera exclusivement en JSON."
    ].join(" ");
  }
}
