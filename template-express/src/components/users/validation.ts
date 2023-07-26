export const passwordRegexp = new RegExp(
  "^(?=.*[0-9])"        // au moins un chiffre
  + "(?=.*[a-z])"               // au moins une minuscule
  + "(?=.*[A-Z])"               // au moins une majuscule
  //+ "(?=.*[@#$%^&+=])"          // au moins un caractère spécial
  + "(?=\\S+$)"                 // pas de caractères blancs
  + ".{8,}$"                   // au moins 8 caractères
)
// ^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$
