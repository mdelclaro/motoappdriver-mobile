export { signUp } from "./SignUpAction";
export { uiStartLoading, uiStopLoading } from "./UIAction";
export { acceptCorrida, startCorrida, finishCorrida } from "./RequestAction";
export { addRating } from "./RatingAction";
export { updateInfo, updateAccountInfo, getDetails } from "./InfoAction";
export { updateLocation } from "./LocationAction";
export { getChats, sendMessage, setChats } from "./ChatAction";
export { getRides } from "./RidesAction";
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
export {
  goOnline,
  goOffline,
  updateAccountStatus,
  getAccountStatus
} from "./StatusAction";
