import { Farmbot } from "farmbot";
import { bail } from "./util";
import { set } from "lodash";
import { AuthState } from "./auth/interfaces";

let device: Farmbot;

const secure = location.protocol === "https:"; // :(

export const getDevice = (): Farmbot => (device || bail("NO DEVICE SET"));

export function fetchNewDevice(auth: AuthState): Promise<Farmbot> {
  device = new Farmbot({ token: auth.token.encoded, secure });
  set(window, "current_bot", device);

  return device
    .connect()
    .then(() => device, () => bail("NO CONNECT"));
}
