import { CheckFat, Pause, Wrench } from "@phosphor-icons/react";
import { StateEnum } from "../class/State";

export function setStateIcon(state: string, small: boolean) {
    let iconComponent = null;
    switch (state) {
      case StateEnum.Working:
        iconComponent = (
          <CheckFat size={small ? 20 : 32} style={{ color: "#2ecc71" }} weight="fill" />
        );
        break;
      case StateEnum.Idle:
        iconComponent = (
          <Pause size={small ? 20 : 32} style={{ color: "#f1c40f" }} weight="fill" />
        );
        break;
      case StateEnum.Maintenance:
        iconComponent = (
          <Wrench size={small ? 20 : 32} style={{ color: "#e74c3c" }} weight="fill" />
        );
        break;
      default:
        iconComponent = null;
    }
    return iconComponent;
  }
  