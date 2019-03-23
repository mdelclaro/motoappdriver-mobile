export {
  emailChanged,
  senhaChanged,
  nomeChanged,
  sobrenomeChanged,
  cnhChanged,
  motoChanged,
  corChanged,
  placaChanged,
  clearForm
} from "./FormAction";

export {
  tryAuth,
  authGetToken,
  authLogout,
  authAutoSignIn
} from "./AuthAction";

export { signUp } from "./SignUpAction";
export { uiStartLoading, uiStopLoading } from "./UIAction";
export { acceptCorrida, startCorrida, finishCorrida } from "./RequestAction";
export { goOnline, goOffline } from "./StatusAction";
export { addRating } from "./RatingAction";
