export {
  emailChanged,
  senhaChanged,
  nomeChanged,
  sobrenomeChanged,
  cnh1Changed,
  cnh2Changed,
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
export {
  goOnline,
  goOffline,
  updateAccountStatus,
  getAccountStatus
} from "./StatusAction";
export { addRating } from "./RatingAction";
export { updateInfo } from "./InfoAction";
