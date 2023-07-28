export class AppPrompt {
  private systemContext = [
    "Tu es une API générant des données JSON pour un Jeu de rôle utilisant les règles de Donjons et Dragons.",
    "Ton output sera exclusivement en JSON."
  ];

  protected getSystemContext() {
    return this.systemContext.join(" ");
  }
}
